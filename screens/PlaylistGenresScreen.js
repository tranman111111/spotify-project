import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SongItem from "../components/SongItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { constants } from "../helper/constants";
import { Player } from "../PlayerContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const PlaylistGenresScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { genreSlug } = route.params;
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalVisible, setModalVisible] = useState(false); // Thêm state cho modal

  const { currentTrack, setCurrentTrack, playlist, setPlaylist } =
    useContext(Player);

  const getTitle = (slug) => {
    switch (slug) {
      case "nhac-ballad":
        return "Nhạc Ballad";
      case "nhac-que-huong":
        return "Nhạc Quê Hương";
      case "nhac-hip-hop":
        return "Nhạc Hip Hop";
      case "nhac-pop":
        return "Nhạc Pop";
      default:
        return "Danh Sách Nhạc";
    }
  };

  useEffect(() => {
    const fetchSongs = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      try {
        const songsResponse = await axios.get(
          `${constants.url}/song/getByGenre/${genreSlug}`
        );
        const fetchedSongs = songsResponse.data.content;

        if (fetchedSongs.length === 0) {
          setSongs([]);
          setFilteredSongs([]);
        } else {
          setSongs(fetchedSongs);
          setFilteredSongs(fetchedSongs);
          const likeStatuses = [];

          for (let i = 0; i < fetchedSongs.length; i++) {
            const songId = fetchedSongs[i]._id;
            try {
              const likeSongResponse = await axios.get(
                `${constants.url}/user/likeSong/${songId}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              likeStatuses.push(likeSongResponse.data.content.is_liked);
            } catch (likeSongError) {
              likeStatuses.push(false);
            }
          }

          setLikes(likeStatuses);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [genreSlug]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = songs.filter(
      (song) =>
        song.name && song.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  const handleSongPress = async (song) => {
    try {
      const response = await axios.get(
        `${constants.url}/song/getById?id=${song._id}`
      );
      setCurrentTrack(response.data.content);

      const responseSong = await axios.get(
        `${constants.url}/song/getByGenre/${song.genreId.slug}`
      );
      setPlaylist(responseSong.data.content);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const handleSort = (order) => {
    const sortedSongs = [...filteredSongs]; // Sắp xếp filteredSongs thay vì songs
    if (order === "asc") {
      sortedSongs.sort((a, b) => {
        const firstLetterA = a.name.charAt(0).toLowerCase(); // Lấy chữ cái đầu tiên và chuyển về chữ thường
        const firstLetterB = b.name.charAt(0).toLowerCase();
        return firstLetterA.localeCompare(firstLetterB); // So sánh chữ cái đầu tiên
      });
    } else {
      sortedSongs.sort((a, b) => {
        const firstLetterA = a.name.charAt(0).toLowerCase();
        const firstLetterB = b.name.charAt(0).toLowerCase();
        return firstLetterB.localeCompare(firstLetterA); // So sánh chữ cái đầu tiên ngược lại
      });
    }
    setFilteredSongs(sortedSongs); // Cập nhật filteredSongs với danh sách đã sắp xếp
    setSortOrder(order);
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={["#282828", "#1c1c1c"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginTop: 30 }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginHorizontal: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 9,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                padding: 9,
                flex: 1,
                borderRadius: 3,
                height: 38,
                borderWidth: 1,
                borderColor: "#1DB954",
              }}
            >
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                value={searchText}
                style={{ fontWeight: "500", color: "white" }}
                onChangeText={handleSearch}
              />
            </Pressable>

            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 38,
                borderWidth: 1,
                borderColor: "#1DB954",
              }}
              onPress={() => setModalVisible(true)} // Mở modal khi nhấn nút
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </View>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              {getTitle(genreSlug)}
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              {loading ? "Loading songs..." : `${filteredSongs.length} songs`}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#1DB954"
              style={{ marginTop: 20 }}
            />
          ) : (
            filteredSongs.map((song, index) => (
              <SongItem
                like={likes[index]}
                likes={likes}
                key={index}
                song={song}
                onPress={() => handleSongPress(song)}
                setLikes={setLikes}
                index={index}
              />
            ))
          )}

          {/* Modal cho việc sắp xếp */}
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)} // Đóng modal khi nhấn ra ngoài
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#121212", // Màu nền tối giống như Spotify
                borderRadius: 12,
                padding: 20,
                width: "85%",
                alignItems: "center",
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                borderWidth: 2, // Độ dày viền
                borderColor: "#ffffff", // Màu viền trắng
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#ffffff",
                }}
              >
                Chọn chế độ sắp xếp
              </Text>
              <Pressable
                onPress={() => handleSort("asc")}
                style={{
                  padding: 12,
                  backgroundColor: "#1DB954", // Màu xanh lá cây đặc trưng của Spotify
                  borderRadius: 6,
                  width: "100%",
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Sắp xếp tăng dần
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleSort("desc")}
                style={{
                  padding: 12,
                  backgroundColor: "#1DB954", // Màu xanh lá cây giống như Spotify
                  borderRadius: 6,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  Sắp xếp giảm dần
                </Text>
              </Pressable>
            </View>
          </Modal>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default PlaylistGenresScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});
