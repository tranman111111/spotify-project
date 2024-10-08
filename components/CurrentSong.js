import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Audio } from "expo-av";

const CurrentSong = ({ visible, onClose }) => {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  // Danh sách các bài hát
  const playlist = [
    {
      title: "Ngủ Một Mình",
      artist: "HIEUTHUHAI",
      source: require("../assets/NguMotMinh.mp3"),
    },
    {
      title: "Dễ đến dễ đi",
      artist: "Quang Hùng MasterD",
      source: require("../assets/DeDenDeDi.mp3"),
    },
    {
      title: "BADBYE",
      artist: "WEAN",
      source: require("../assets/Badbye.mp3"),
    },
  ];

  const lyrics = `Hãy ở lại với anh thêm một ngày nữa thôi
Vì anh không muốn phải ngủ một mình đêm nay đâu
Bên ngoài và uống say hay là ta nằm đây cả đêm
Chỉ là anh không muốn phải ngủ một mình đêm nay
Yeah yeah
Baby nói cho anh nghe em hãy nói cho anh nghe những điều mà
Điều em muốn sau khi đêm nay trôi qua
Là một trái tim hay những món quà
Em muốn đôi tay anh đặt ở những nơi đâu
Anh đã nhắm đôi môi từ những ngày đầu
I'm needing all your love
Nhưng em sẽ chẳng thể thấy anh khi qua ngày mai
Bởi vì thiên bình đây chẳng thể nào bên ai mãi mãi
Hãy hứa không nói cho ai
Hình em gửi anh làm sao mà có thể yeah
Thay những khi mà em đằng sau nằm ôm anh`;

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      playlist[currentIndex].source,
      { shouldPlay: true, isLooping }
    );
    setSound(newSound);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    setCurrentIndex((currentIndex + 1) % playlist.length);
  };

  const handlePreviousTrack = () => {
    setCurrentIndex(
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    );
  };

  const playPauseTrack = async () => {
    if (sound === null) {
      await playTrack();
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const toggleLoop = async () => {
    setIsLooping(!isLooping);
    if (sound) {
      await sound.setIsLoopingAsync(!isLooping);
    }
  };

  useEffect(() => {
    playTrack();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [currentIndex]);
  return (
    <BottomModal
      visible={visible}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
    >
      <LinearGradient
        colors={["#B55239", "#000000"]}
        style={{ height: "100%", width: "100%" }}
      >
        <ModalContent style={{ height: "100%", width: "100%" }}>
          <ScrollView
            style={{ height: "100%", width: "100%", marginTop: 40 }}
            showsVerticalScrollIndicator={false}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={onClose}>
                <AntDesign name="down" size={24} color="white" />
              </Pressable>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 12, color: "white" }}>
                  PLAYING FROM PLAYLIST
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  {playlist[currentIndex].artist}
                </Text>
              </View>

              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>

            <View style={{ height: 70 }} />

            <View style={{ padding: 10 }}>
              <Image
                style={{ width: "100%", height: 330, borderRadius: 4 }}
                source={require("../assets/ngu-mot-minh.jpg")}
              />
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {playlist[currentIndex].title}
                  </Text>
                  <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                    {playlist[currentIndex].artist}
                  </Text>
                </View>

                <AntDesign name="checkcircle" size={26} color="#1DB954" />
              </View>

              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    height: 3,
                    backgroundColor: "gray",
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: -5,
                      width: 12,
                      height: 12,
                      borderRadius: 12 / 2,
                      backgroundColor: "white",
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#D3D3D3", fontSize: 15 }}>2:18</Text>
                  <Text style={{ color: "#D3D3D3", fontSize: 15 }}>4:20</Text>
                </View>
              </View>

              {/* Điều khiển phát nhạc */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 17,
                }}
              >
                <Pressable>
                  <Entypo name="shuffle" size={24} color="white" />
                </Pressable>

                <Pressable onPress={handlePreviousTrack}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>

                <Pressable
                  onPress={playPauseTrack}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo
                    name={isPlaying ? "controller-paus" : "controller-play"}
                    size={26}
                    color="black"
                  />
                </Pressable>

                <Pressable onPress={handleNextTrack}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>

                <Pressable onPress={toggleLoop}>
                  <Entypo
                    name="loop"
                    size={24}
                    color={isLooping ? "#1DB954" : "white"}
                  />
                </Pressable>
              </View>
            </View>

            {/* Phần lyrics */}
            <Pressable style={{ marginTop: 20, paddingHorizontal: 10 }}>
              <View
                style={{
                  backgroundColor: "#B55239",
                  borderRadius: 10,
                  padding: 20,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: showFullLyrics ? null : 100,
                    overflow: "hidden",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      textAlign: "left",
                      marginBottom: 10,
                    }}
                  >
                    Lyrics preview
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    {lyrics}
                  </Text>
                </View>

                <Pressable
                  onPress={() => setShowFullLyrics(!showFullLyrics)}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {showFullLyrics ? "Hide lyrics" : "Show lyrics"}
                  </Text>
                </Pressable>
              </View>
            </Pressable>

            <Pressable style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.artistImage}
                  source={require("../assets/Hieuthuhai.jpg")}
                />
                <Text style={styles.aboutText}>About the artist</Text>
              </View>

              {/* Thông tin nghệ sĩ */}
              <View style={styles.artistInfoContainer}>
                <View style={styles.artistRow}>
                  {/* Tên nghệ sĩ và số người nghe */}
                  <View style={styles.artistDetails}>
                    <Text style={styles.artistName}>HIEUTHUHAI</Text>
                    <Text style={styles.listenersText}>
                      1.6M monthly listeners
                    </Text>
                  </View>

                  {/* Nút Follow */}
                  <Pressable
                    style={styles.followButton}
                    onPress={handleFollowToggle}
                  >
                    <Text style={styles.followButtonText}>
                      {isFollowing ? "Following" : "Follow"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.artistDescription}>
                Trần Minh Hiếu (sinh ngày 28 tháng 9 năm 1999), thường được biết
                đến với nghệ danh HIEUTHUHAI hay cách viết khác là hieuthuhai,
                là một nam rapper, ca sĩ kiêm sáng tác nhạc và diễn viên người
                Việt Nam.
              </Text>
            </Pressable>
          </ScrollView>
        </ModalContent>
      </LinearGradient>
    </BottomModal>
  );
};

export default CurrentSong;

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
