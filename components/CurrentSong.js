import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import Modal, { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { Player } from "../PlayerContext";
import { constants } from "../helper/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Linking from "expo-linking";

const CurrentSong = ({ visible, onClose }) => {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại
  const [duration, setDuration] = useState(0); // Tổng thời gian bài hát
  const [modalVisible, setModalVisible] = useState(false);
  const [audioQualityModalVisible, setAudioQualityModalVisible] =
    useState(false);
  const [selectedQuality, setSelectedQuality] = useState("128kbps");

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [sound, setSound] = useState(null);
  const { currentTrack, playlist, setCurrentTrack , gradientColors, lyricsBackgroundColor} = useContext(Player);
  const soundRef = useRef(null);
  const [likeSong, setLikeSong] = useState(false);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: currentTrack.audio }, // URL bài hát
        { shouldPlay: isPlaying }
      );
      soundRef.current = sound;
      setSound(sound);
    };

    if (currentTrack) {
      loadSound();

      return () => {
        soundRef.current?.unloadAsync(); // Giải phóng âm thanh khi component unmount
      };
    }
  }, [currentTrack]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const userId = await AsyncStorage.getItem("userId");
        if (
          !currentTrack ||
          !currentTrack.artistId ||
          !currentTrack.artistId._id
        ) {
          // console.error("Invalid current track or artist ID");
          setIsFollowing(false);
          return;
        }

        const followingResponse = await axios.get(
          `${constants.url}/user/follow/${currentTrack.artistId._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setIsFollowing(followingResponse.data.content?.follow_status ?? false);

        if (!currentTrack || !currentTrack._id) {
          // console.error("Invalid current track ID");
          setLikeSong(false);
          return;
        }

        const likeSongResponse = await axios.get(
          `${constants.url}/user/likeSong/${currentTrack._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setLikeSong(likeSongResponse.data.content?.is_liked ?? false);

        const userResponse = await axios.get(`${constants.url}/user/${userId}`);

        setUser(userResponse.data.content);
      } catch (error) {
        // console.error("Error fetching follow status:", error);
        setIsFollowing(false);
        setLikeSong(false);
      }
    };

    if (currentTrack?.artistId?._id) {
      fetchArtistData();
    }
  }, [currentTrack]);

  const handleFollowToggle = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      await axios.put(
        `${constants.url}/user/follow`,
        {
          artistId: currentTrack.artistId._id,
          follow_status: !isFollowing,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  const handleLikeSongToggle = async (songId) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        `${constants.url}/user/likeSong`,
        {
          songId: songId,
          is_liked: !likeSong,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setLikeSong(!likeSong);
    } catch (error) {
      console.error("Error updating like song status:", error);
    }
  };

  const playPauseTrack = async () => {
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = async () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentTrack(playlist[nextIndex]); // Cập nhật bài hát hiện tại
    await soundRef.current.unloadAsync(); // Giải phóng âm thanh hiện tại
  };

  const handlePreviousTrack = async () => {
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrack(playlist[prevIndex]); // Cập nhật bài hát hiện tại
    await soundRef.current.unloadAsync(); // Giải phóng âm thanh hiện tại
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  useEffect(() => {
    if (isLooping) {
      sound?.setIsLoopingAsync(true); // Bật chế độ lặp
    } else {
      sound?.setIsLoopingAsync(false); // Tắt chế độ lặp
    }
  }, [isLooping, sound]);

  useEffect(() => {
    const updateCurrentTime = async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          setCurrentTime(status.positionMillis / 1000); // Convert to seconds
          setDuration(status.durationMillis / 1000); // Convert to seconds
        }
      }
    };

    const interval = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, [sound, isPlaying]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = (currentTime / duration) * 100 || 0;

  const shareViaEmail = async () => {
    const songUrl = currentTrack.audio; // Đường dẫn bài hát
    const songName = currentTrack.name;
    const artistName = currentTrack.artistId.name;

    // Tạo URL mailto với nội dung và tiêu đề email
    const emailSubject = `Check out this song: ${songName}`;
    const emailBody = `Hey, I found this song and thought you'd like it: "${songName}" by ${artistName}. You can listen to it here: ${songUrl}`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Mở liên kết mailto để chia sẻ qua email
    try {
      await Linking.openURL(mailtoUrl);
    } catch (error) {
      console.error("Failed to share via email:", error);
    }
  };

  return (
    <>
      <BottomModal
        visible={visible}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <LinearGradient
          colors={gradientColors}
          style={{ height: "100%", width: "100%" }}
        >
          <ModalContent style={{ height: "100%", width: "100%" }}>
            <ScrollView
              style={{ height: "100%", width: "100%", marginTop: 40 }}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Pressable onPress={onClose}>
                  <AntDesign name="down" size={24} color="white" />
                </Pressable>

                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "white" }}>
                    PLAYING FROM PLAYLIST
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                  >
                    {currentTrack.artistId.name}
                  </Text>
                </View>

                <Pressable onPress={() => setModalVisible(true)}>
                  <Entypo name="dots-three-vertical" size={24} color="white" />
                </Pressable>

                <Modal
                  visible={modalVisible}
                  onBackdropPress={() => setModalVisible(false)}
                  style={styles.modal}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={300}
                  animationOutTiming={300}
                >
                  <View style={styles.modalContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={{ uri: currentTrack.image }}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 13,
                            width: 220,
                            color: "#ffffff",
                            fontWeight: "bold",
                          }}
                        >
                          {currentTrack.name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 11,
                            width: 220,
                            color: "#ffffff",
                          }}
                        >
                          {currentTrack.artistId.name}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.line} />
                    <Pressable
                      onPress={() => {
                        /* remove from this playlist*/
                      }}
                      style={styles.pressableContainer}
                    >
                      <AntDesign name="minuscircleo" size={24} color="gray" />
                      <Text style={styles.modalOption}>
                        Remove from this playlist
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        // dfdsfdf
                      }}
                      style={styles.pressableContainer}
                    >
                      <Entypo name="user" size={24} color="gray" />
                      <Text style={styles.modalOption}>View Artists</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setModalVisible(false);
                        setAudioQualityModalVisible(true);
                      }}
                      style={styles.pressableContainer}
                    >
                      <MaterialIcons
                        name="multitrack-audio"
                        size={24}
                        color="gray"
                      />
                      <Text style={styles.modalOption}>Audio Quality</Text>
                    </Pressable>
                    <Pressable
                      onPress={shareViaEmail}
                      style={styles.pressableContainer}
                    >
                      <AntDesign name="sharealt" size={24} color="gray" />
                      <Text style={styles.modalOption}>Share</Text>
                    </Pressable>

                    <Pressable
                      style={styles.pressableContainer}
                      onPress={() => setModalVisible(false)}
                    >
                      <AntDesign name="closecircleo" size={24} color="red" />
                      <Text style={styles.modalClose}>Close</Text>
                    </Pressable>
                  </View>
                </Modal>

                {/* Modal Audio Quality */}
                <Modal
                  visible={audioQualityModalVisible}
                  onBackdropPress={() => setAudioQualityModalVisible(false)}
                  style={styles.modal}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={300}
                  animationOutTiming={300}
                >
                  <View style={styles.modalContainer}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#ffffff",
                        fontWeight: "bold",
                        marginBottom: 10,
                        textAlign: "center",
                      }}
                    >
                      Audio Quality
                    </Text>

                    <View style={styles.line} />

                    {/* Thêm nội dung cho modal Audio Quality ở đây */}
                    <Pressable
                      onPress={() => {
                        setSelectedQuality("128kbps");
                      }}
                      style={styles.pressableContainer}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Text style={styles.modalOption}>128kbps</Text>
                        {selectedQuality === "128kbps" && (
                          <AntDesign name="check" size={24} color="green" />
                        )}
                      </View>
                    </Pressable>
                    {/* fee subcription */}

                    {user && user.subscriptionType === "fee" && (
                      <Pressable
                        onPress={() => {
                          setSelectedQuality("320kbps");
                        }}
                        style={styles.pressableContainer}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Text style={styles.modalOption}>320kbps</Text>
                          {selectedQuality === "320kbps" && (
                            <AntDesign name="check" size={24} color="green" />
                          )}
                        </View>
                      </Pressable>
                    )}

                    <Pressable
                      onPress={() => setAudioQualityModalVisible(false)}
                      style={styles.pressableContainer}
                    >
                      <Text style={styles.modalClose}>Close</Text>
                    </Pressable>
                  </View>
                </Modal>
              </View>

              <View style={{ height: 70 }} />

              <View style={{ padding: 10 }}>
                <Image
                  style={{ width: "100%", height: 330, borderRadius: 4 }}
                  source={{ uri: currentTrack.image }}
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
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {currentTrack.name}
                    </Text>
                    <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                      {currentTrack.artistId.name}
                    </Text>
                  </View>
                  {/* dfdsfdf */}
                  <Pressable
                    onPress={() => handleLikeSongToggle(currentTrack._id)}
                  >
                    <AntDesign
                      name={likeSong ? "checkcircle" : "pluscircleo"}
                      size={26}
                      color={likeSong ? "#1DB954" : "white"}
                    />
                  </Pressable>
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
                    <Animated.View
                      style={{
                        width: `${progressPercentage}%`,
                        height: "100%",
                        backgroundColor: "white",
                        borderRadius: 5,
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
                    <Text style={{ color: "#D3D3D3", fontSize: 15 }}>
                      {formatTime(currentTime)}
                    </Text>
                    <Text style={{ color: "#D3D3D3", fontSize: 15 }}>
                      {formatTime(duration)}
                    </Text>
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
                  <Pressable onPress={handleShuffle}>
                    <Entypo
                      name="shuffle"
                      size={24}
                      color={isShuffling ? "#1DB954" : "white"}
                    />
                  </Pressable>

                  <Pressable onPress={handlePreviousTrack}>
                    <Ionicons name="play-skip-back" size={30} color="white" />
                  </Pressable>

                  <Pressable
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={playPauseTrack}
                  >
                    <Entypo
                      name={isPlaying ? "controller-paus" : "controller-play"}
                      size={26}
                      color="black"
                    />
                  </Pressable>

                  <Pressable onPress={handleNextTrack}>
                    <Ionicons
                      name="play-skip-forward"
                      size={30}
                      color="white"
                    />
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
                    backgroundColor: lyricsBackgroundColor,
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
                      {currentTrack.lyrics}
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
                    source={{ uri: currentTrack.artistId.avarta }}
                  />
                  <Text style={styles.aboutText}>About the artist</Text>
                </View>

                {/* Thông tin nghệ sĩ */}
                <View style={styles.artistInfoContainer}>
                  <View style={styles.artistRow}>
                    {/* Tên nghệ sĩ và số người nghe */}
                    <View style={styles.artistDetails}>
                      <Text style={styles.artistName}>
                        {currentTrack.artistId.name}
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
                  {currentTrack.artistId.bio}
                </Text>
              </Pressable>
            </ScrollView>
          </ModalContent>
        </LinearGradient>
      </BottomModal>
    </>
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

  modal: {
    justifyContent: "flex-end", // Đặt modal ở cuối trang
    margin: 0, // Không có khoảng cách
  },
  modalContainer: {
    padding: 20,
    backgroundColor: "#282828",
    borderRadius: 10,
    alignItems: "left",
    width: 415,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  pressableContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  modalOption: {
    marginLeft: 15,
    color: "white",
    fontSize: 16,
  },
  modalClose: {
    fontSize: 16,
    color: "#FF0000",
    marginLeft: 15,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#808080",
    width: "100%",
    marginVertical: 10,
  },
});
