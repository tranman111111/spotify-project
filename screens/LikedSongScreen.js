import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../helper/constants";
import { Player } from "../PlayerContext";

const LikedSongScreen = () => {
  const navigation = useNavigation();
  const [likedSongs, setLikedSongs] = useState([]); // State để lưu bài hát đã thích
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading

  const { currentTrack, setCurrentTrack, playlist, setPlaylist } = useContext(Player);

  useEffect(() => {
    // Hàm gọi API lấy danh sách bài hát đã thích
    const fetchLikedSongs = async () => {
      try {
        // Gọi API (thay <userId> bằng ID của người dùng hoặc lấy từ context)
        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.get(
          `${constants.url}/song/likedSongs?userId=${userId}`
        );
        setLikedSongs(response.data.content); // Cập nhật danh sách bài hát đã thích
        setLoading(false); // Tắt loading sau khi lấy dữ liệu
      } catch (error) {
        console.error("Error fetching liked songs:", error);
        setLoading(false); // Tắt loading nếu có lỗi
      }
    };

    fetchLikedSongs();
  }, []);

  if (loading) {
    // Hiển thị khi dữ liệu đang được tải
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  const handlePlaySong = (selectedSong) => {
    setCurrentTrack(selectedSong); 
    setPlaylist(likedSongs); 
  };

  return (
    <>
      <LinearGradient
        colors={["#614385", "#282828"]}
        locations={[0, 1]} 
        style={{ flex: 1 }}
      >
        <ScrollView style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row", padding: 12 }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ padding: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 12,
                }}
              >
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    backgroundColor: "#42275a",
                    padding: 9,
                    flex: 1, // Giúp chiếm hết chiều ngang có thể
                    borderRadius: 3,
                    height: 38,
                  }}
                >
                  <AntDesign name="search1" size={20} color="white" />
                  <TextInput
                    value=""
                    placeholder="Find in Liked songs"
                    placeholderTextColor={"white"}
                    style={{ fontWeight: "500", color: "white", flex: 1 }} // Thêm flex: 1 để chiếm khoảng trống còn lại
                  />
                </Pressable>

                <Pressable
                  style={{
                    marginLeft: 10, // Dùng marginLeft thay cho marginHorizontal để tránh ảnh hưởng tổng View
                    backgroundColor: "#42275a",
                    padding: 10,
                    borderRadius: 3,
                    height: 38,
                    justifyContent: "center", // Căn giữa chữ "Sort" theo chiều dọc
                  }}
                >
                  <Text style={{ color: "white" }}>Sort</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 10,
              gap: 7,
            }}
          >
            <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 10,
              gap: 7,
            }}
          >
            <Text style={{ color: "white" }}>{likedSongs.length} songs</Text>
          </View>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <Pressable
              onPress={() => {
                // Hành động khi nhấn vào đây
              }}
              style={{
                backgroundColor: "transparent", 
                width: 28, 
                height: 28,
                borderRadius: 20,
                justifyContent: "center", 
                alignItems: "center", 
                borderWidth: 2,
                borderColor: "white", 
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Entypo
                name="shuffle"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Pressable
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1DB954",
                }}
                onPress={() => handlePlaySong(likedSongs[0])}
              >
                <Entypo name="controller-play" size={24} color="black" />
              </Pressable>
            </View>
          </Pressable>

          <View>
            <View style={{ marginTop: 10, marginHorizontal: 12 }}>
              {likedSongs.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                onPress={() => handlePlaySong(item)}

                >
                  {/* Ảnh bài hát */}
                  <Image
                    source={{uri: item.image}}
                    style={{ width: 50, height: 50, borderRadius: 5 }}
                  />

                  {/* Thông tin bài hát và nghệ sĩ */}
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#989898",
                        marginTop: 5,
                      }}
                    >
                      {item.artistId.name}
                    </Text>
                  </View>

                  {/* Icon dấu ba chấm */}
                  <Entypo name="dots-three-vertical" size={24} color="white" />
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ height: 150 }}/>
        </ScrollView>

      </LinearGradient>
    </>
  );
};

export default LikedSongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0, 
    backgroundColor: "#282828", 
    borderRadius: 15, 
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  imageContainer: {
    width: "100%",
    position: "relative", 
  },
  artistImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15, 
  },
  aboutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute", 
    top: 10, 
    left: 16, 
  },
  artistInfoContainer: {
    width: "100%",
    paddingHorizontal: 16, 
    marginTop: 25,
  },
  artistRow: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 16,
  },
  artistDetails: {
    flexDirection: "column", 
  },
  artistName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4, 
  },
  listenersText: {
    fontSize: 16,
    color: "white",
  },
  followButton: {
    backgroundColor: "transparent", 
    borderRadius: 20, 
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "white", 
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  artistDescription: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
    textAlign: "left", 
    paddingHorizontal: 16, 
  },
});
