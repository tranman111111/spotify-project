import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  FlatList,
  Alert,
  Image
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { constants } from "../helper/constants";
import Card1 from "../components/Card1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "../PlayerContext";
import CardArtist from "../components/CardArtist";

const HomeScreen = () => {
  const { setCurrentTrack, setPlaylist, setIsLoggedIn } = useContext(Player);

  const [modalVisible, setModalVisible] = useState(false);
  const translateX = useSharedValue(-300);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(modalVisible ? 0 : -300, { duration: 500 }) },
      ],
    };
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (!modalVisible) {
      translateX.value = 0;
    } else {
      translateX.value = -300;
    }
  };

  const navigation = useNavigation();

  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  const [songBySonTung, setSongBySonTung] = useState([]);
  const [songByKarik, setSongByKarik] = useState([]);
  const [songByHuynhCongHieu, setSongByHuynhCongHieu] = useState([]);
  const [user, setUser] = useState(null);

  const handlePressSonTung = (item) => {
    setCurrentTrack(item);
    setPlaylist(songBySonTung); // Đặt playlist với danh sách bài hát
  };

  const handlePressKarik = (item) => {
    setCurrentTrack(item);
    setPlaylist(songByKarik); // Đặt playlist với danh sách bài hát
  };

  const handlePressHuynhCongHieu = (item) => {
    setCurrentTrack(item);
    setPlaylist(songByHuynhCongHieu); // Đặt playlist với danh sách bài hát
  };

  const logoutUser = async () => {
    try {
      // Xóa accessToken và userId
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("userId");

      // Chuyển hướng về trang đăng nhập
      setIsLoggedIn(false);
      navigation.navigate("LoginDetail");

      Alert.alert("Logged out", "You have been logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${constants.url}/genre`);
        setGenres(response.data.cotent);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchArtist = async () => {
      try {
        const response = await axios.get(`${constants.url}/artist`);
        setArtists(response.data.content);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    const fetchSongBySonTung = async () => {
      try {
        const response = await axios.get(
          `${constants.url}/song/getByArtist/?id=66eff0ba997da7cdef2d63b0`
        );
        setSongBySonTung(response.data.content);
      } catch (error) {
        console.error("Error fetching song Sơn Tùng:", error);
      }
    };

    const fetchSongByKarik = async () => {
      try {
        const response = await axios.get(
          `${constants.url}/song/getByArtist/?id=66eff177997da7cdef2d63b9`
        );
        setSongByKarik(response.data.content);
      } catch (error) {
        console.error("Error fetching song Karik:", error);
      }
    };

    const fetchSongByHuynhCongHieu = async () => {
      try {
        const response = await axios.get(
          `${constants.url}/song/getByArtist/?id=66efeff7997da7cdef2d63ac`
        );
        setSongByHuynhCongHieu(response.data.content);
      } catch (error) {
        console.error("Error fetching song Hieu:", error);
      }
    };

    const fetchUserById = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`${constants.url}/user/${userId}`);

          // Đảm bảo response.data.content không phải là null hoặc undefined
          const userData = response.data.content;
          if (userData) {
            setUser(userData);
            console.log('user.image', user && user.image);
          } else {
            console.error("User data is null.");
          }
        } else {
          console.error("No user ID found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchGenres();
    fetchArtist();
    fetchSongBySonTung();
    fetchSongByKarik();
    fetchSongByHuynhCongHieu();
    fetchUserById();
  }, []);

  const handleGenrePress = (genre) => {
    navigation.navigate("PlaylistGenres", { genreSlug: genre.slug });
  };

  const renderItemGenre = ({ item }) => (
    <Pressable onPress={() => handleGenrePress(item)} style={styles.pressable}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View>
        <Text style={styles.text1}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 30 }}>
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <Pressable onPress={() => setModalVisible(true)}>
                <Image
                  style={styles.avatar}
                  source={
                    user && user.image // Check if user exists and has an image
                      ? { uri: user.image } // Use the user's image if available
                      : require("../assets/ava_default.jpg") // Default image if user doesn't have one
                  }
                />
              </Pressable>

              <View style={styles.tabContainer}>
                <Pressable style={styles.activeButton}>
                  <Text style={styles.textActive}>All</Text>
                </Pressable>
                <Pressable style={styles.inactiveButton}>
                  <Text style={styles.text}>Music</Text>
                </Pressable>
                <Pressable style={styles.inactiveButton}>
                  <Text style={styles.text}>Podcasts</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={styles.section}>
              <Pressable
                onPress={() => navigation.navigate("LikedSong")}
                style={styles.pressable}
              >
                <LinearGradient
                  colors={["#33006F", "#FFFFFF"]}
                  style={styles.image}
                >
                  <View style={styles.iconContainer}>
                    <AntDesign name="heart" size={24} color="white" />
                  </View>
                </LinearGradient>
                <View>
                  <Text style={styles.text1}>Liked Songs</Text>
                </View>
              </Pressable>

              <Pressable style={styles.pressable}>
                <Image
                  style={styles.image}
                  source={require("../assets/nhac-jazz.jpg")}
                />
                <View>
                  <Text style={styles.text1}>Nhạc Jazz</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <FlatList
            data={genres}
            renderItem={renderItemGenre}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />

          <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "bold",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              Your Top Artists
            </Text>

            <FlatList
              data={artists}
              renderItem={({ item, index }) => (
                <CardArtist
                  onPress={() =>
                    navigation.navigate("ArtistDetail", { artistId: item._id })
                  }
                  item={item}
                  key={index}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "bold",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              Sơn Tùng M-TP
            </Text>

            <FlatList
              data={songBySonTung}
              renderItem={({ item, index }) => (
                <Card1
                  item={item}
                  key={index}
                  onPress={() => handlePressSonTung(item)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "bold",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              Karik
            </Text>
            <FlatList
              data={songByKarik}
              renderItem={({ item, index }) => (
                <Card1
                  item={item}
                  key={index}
                  onPress={() => handlePressKarik(item)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "bold",
                marginHorizontal: 10,
                marginTop: 10,
              }}
            >
              Huỳnh Công Hiếu
            </Text>

            <FlatList
              data={songByHuynhCongHieu}
              renderItem={({ item, index }) => (
                <Card1
                  item={item}
                  key={index}
                  onPress={() => handlePressHuynhCongHieu(item)}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={{ height: 200 }} />
        </ScrollView>
      </LinearGradient>

      {modalVisible && (
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View
            style={[
              styles.modalTitle,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={
                user && user.image 
                  ? { uri: user.image }
                  : require("../assets/ava_default.jpg")
              }
            />
            <View style={{ marginHorizontal: 12, marginVertical: 5, gap: 2 }}>
              <Text style={{ color: "white" }}>{user.username}</Text>
              <Text style={{ color: "#b3b3b3", fontSize: 12 }}>
                {user.subscriptionType === "free"
                  ? "Free Account"
                  : "Fee Account"}
              </Text>
            </View>
          </View>
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Icon
              name="user"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.modalButtonText}>View Profile</Text>
          </Pressable>
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              /* Navigate to Settings */
            }}
          >
            <Icon
              name="cog"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.modalButtonText}>Settings</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={logoutUser}>
            <Icon
              name="sign-out"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.modalButtonText}>Logout</Text>
          </Pressable>

          <Pressable style={styles.closeButton} onPress={toggleModal}>
            <Icon
              name="times"
              size={20}
              color="red"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
    backgroundColor: "#040306",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  tabContainer: {
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  textActive: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
  activeButton: {
    backgroundColor: "#1ED760",
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  inactiveButton: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  likedSongs: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    borderRadius: 4,
    marginHorizontal: 10,
    padding: 10,
  },
  textBold: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  randomArtist: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
    borderRadius: 4,
    marginHorizontal: 10,
    padding: 10,
  },
  randomArtistImage: {
    width: 55,
    height: 55,
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#282828",
    padding: 20,
    justifyContent: "flex-start",
    height: "100%",
    width: "80%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  modalTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalTextContainer: {
    marginLeft: 12,
  },
  modalUserName: {
    color: "white",
  },
  modalAccountType: {
    color: "#b3b3b3",
    fontSize: 12,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    marginLeft: 10,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  closeButtonText: {
    color: "red",
    marginLeft: 10,
  },
  iconContainer: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    width: "48%", // Chiều rộng của mỗi item trong FlatList hoặc phần section
    flexDirection: "row",
    backgroundColor: "#202020",
    borderRadius: 4,
    marginVertical: 5,
    alignItems: "center",
  },
  image: {
    width: 55,
    height: 55,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: "center", // Điều chỉnh hình ảnh hoặc gradient ở giữa
    alignItems: "center",
  },
  text1: {
    color: "white",
    padding: 10,
  },
});
