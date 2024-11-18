import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Nhập axios
import { constants } from "../helper/constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "../PlayerContext";

const SearchScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]); // Khởi tạo genres
  const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const { setCurrentTrack, setPlaylist } = useContext(Player);

  // Hàm để tạo màu ngẫu nhiên
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Lấy dữ liệu genre từ API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${constants.url}/genre`);
        console.log(response.data); // Kiểm tra dữ liệu trả về
        if (response.data.cotent) {
          const genreData = response.data.cotent.map((genre) => ({
            ...genre,
            color: getRandomColor(),
          }));
          setGenres(genreData);
        } else {
          console.error("Không có dữ liệu genre"); // Thông báo lỗi nếu không có dữ liệu
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserById = async () => {
      try {
        // Lấy userId từ AsyncStorage
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`${constants.url}/user/${userId}`);
          setUser(response.data.content);
        } else {
          console.error("No user ID found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchGenres();
    fetchUserById();
  }, []);

  // Tìm kiếm item từ API
  const searchItem = async (query) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(`${constants.url}/song/searchItem`, {
          params: { q: query },
        });
        setSearchResults(response.data.content); // Cập nhật kết quả tìm kiếm
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]); // Nếu không có query, reset kết quả
    }
  };

  // Xử lý khi thay đổi giá trị tìm kiếm
  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
    searchItem(text); // Gọi hàm tìm kiếm
  };

  const handleGenrePress = (genre) => {
    navigation.navigate("PlaylistGenres", { genreSlug: genre.slug });
  };

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={
              user && user.image
                ? { uri: user.image }
                : require("../assets/ava_default.jpg")
            }
            style={styles.logo}
          />
          <Text style={styles.headerText}>Search</Text>
        </View>

        <Pressable
          style={styles.fixedSearchBar}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="search" size={24} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#4F4F4F"
            value={searchQuery}
            onChangeText={handleSearchInputChange}
          />
        </Pressable>

        <ScrollView style={{ marginTop: 50 }}>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.genresContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.genreBox, { backgroundColor: genre.color }]}
                onPress={() => handleGenrePress(genre)}
              >
                <Text style={styles.genreText}>{genre.name}</Text>
                <Image
                  source={{ uri: genre.image }}
                  style={styles.genreImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </Pressable>
              <TextInput
                style={styles.modalInput}
                placeholder="What do you want to listen to?"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={handleSearchInputChange}
              />
            </View>
            <ScrollView>
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => {
                      if (item.type === "artist") {
                        navigation.navigate("ArtistDetail", {
                          artistId: item._id,
                        });
                      } else if (item.type === "song") {
                        setCurrentTrack(item);
                        if (item.artistId && item.artistId._id) {
                          axios
                            .get(`${constants.url}/song/getByArtist/?id=${item.artistId._id}`)
                            .then((response) => {
                              setPlaylist(response.data.content);
                              navigation.navigate("Home");
                            })
                            .catch((error) => console.error("Error fetching songs:", error));
                        } else {
                          console.error("Artist ID not found in item:", item);
                        }
                        
                      }
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        style={[
                          { width: 60, height: 60 },
                          item.type === "artist"
                            ? { borderRadius: 30 }
                            : { borderRadius: 10 },
                        ]}
                        source={{ uri: item.image }}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 15,
                            width: 220,
                            color: "#ffffff",
                            fontWeight: "bold",
                            marginRight: 5,
                          }}
                        >
                          {item.name}
                          {item.type === "artist" && (
                            <View
                              style={{
                                backgroundColor: "#4F83C1",
                                borderRadius: 10,
                                padding: 2,
                                marginLeft: 5,
                                display: "inline-flex",
                              }}
                            >
                              <AntDesign
                                name="checkcircleo"
                                size={12}
                                color="white"
                              />
                            </View>
                          )}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 14, // Tăng kích thước chữ cho phụ đề
                            width: 250, // Tăng độ rộng
                            color: "#ffffff",
                          }}
                        >
                          {item.type}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.noSuggestionsContainer}>
                  <Text style={styles.noSuggestionsTitle}>
                    Play what you love
                  </Text>
                  <Text style={styles.noSuggestionsSubtitle}>
                    Search for artists, songs, podcasts, and more.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  fixedSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  genreBox: {
    width: "48%",
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    justifyContent: "space-between",
  },
  genreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  genreImage: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 0,
    justifyContent: "flex-start",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    width: "100%",
    paddingHorizontal: 16,
  },
  modalInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#282828",
    color: "#fff",
    marginHorizontal: 10,
    fontSize: 18,
  },
  suggestionItem: {
    padding: 15,
  },
  suggestionText: {
    color: "#fff",
    fontSize: 16,
  },
  noSuggestionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 350,
  },

  noSuggestionsTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  noSuggestionsSubtitle: {
    color: "gray",
    fontSize: 13,
    textAlign: "center",
  },
});

export default SearchScreen;
