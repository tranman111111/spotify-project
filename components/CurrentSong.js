import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const CurrentSong = ({ visible, onClose }) => {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

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

  return (
    <BottomModal
      visible={visible}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
    >
      <LinearGradient
        colors={["#B55239", "#000000"]} // Màu gradient từ #B55239 đến màu đen
        style={{ height: "100%", width: "100%" }}
      >
        <ModalContent
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <ScrollView
            style={{ height: "100%", width: "100%", marginTop: 40 }}
            showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
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

              <View
                style={{
                  alignItems: "center", 
                  justifyContent: "center", 
                }}
              >
                <Text style={{ fontSize: 12, color: "white" }}>
                  PLAYING FROM ARTIST
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  HIEUTHUHAI
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
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    ngủ một mình (tình rất tình)
                  </Text>
                  <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                    HIEUTHUHAI, Negav, Kewtiie
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
                  <Text
                    style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                  >
                    2:18
                  </Text>

                  <Text
                    style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                  >
                    4:20
                  </Text>
                </View>
              </View>
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
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Pressable
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="controller-play" size={26} color="black" />
                  </Pressable>
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Entypo name="loop" size={24} color="white" />
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
                      color: "white", // Màu chữ trắng
                      textAlign: "left", // Căn trái cho lyrics
                      marginBottom: 10,
                    }}
                  >
                    Lyrics preview
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white", // Màu chữ trắng
                      textAlign: "left", // Căn trái cho lyrics
                    }}
                  >
                    {lyrics}
                  </Text>
                </View>

                <Pressable
                  onPress={() => setShowFullLyrics(!showFullLyrics)} // Đổi trạng thái show/hide
                  style={{
                    marginTop: 10, // Khoảng cách giữa lyrics và nút
                    padding: 10,
                    backgroundColor: "white", // Màu nền nút
                    borderRadius: 20, // Bo góc nút
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {showFullLyrics ? "Hide lyrics" : "Show lyrics"}
                  </Text>
                </Pressable>
              </View>
            </Pressable>
            {/* Kết thúc phần lyrics */}

            <Pressable style={styles.container}>
              {/* Thay đổi ảnh để bao toàn bộ chiều rộng */}
              <View style={styles.imageContainer}>
                <Image
                  style={styles.artistImage}
                  source={require("../assets/Hieuthuhai.jpg")} // Hình ảnh của nghệ sĩ
                />
                {/* Tiêu đề "About the artist" ở góc trên cùng bên trái của ảnh */}
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
    padding: 0, // Bỏ padding để ảnh có thể bao trọn container
    backgroundColor: "#282828", // Màu nền tối
    borderRadius: 15, // Viền tròn
    margin: 10,
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Hiệu ứng bóng cho Android
  },
  imageContainer: {
    width: "100%",
    position: "relative", // Để cho Text có thể được định vị tương đối
  },
  artistImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15, // Giữ viền tròn cho góc trên
    borderTopRightRadius: 15, // Giữ viền tròn cho góc trên
  },
  aboutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute", // Định vị tuyệt đối
    top: 10, // Khoảng cách từ trên xuống
    left: 16, // Khoảng cách từ trái vào
  },
  artistInfoContainer: {
    width: "100%", // Để đảm bảo nó chiếm toàn bộ chiều rộng
    paddingHorizontal: 16, // Đảm bảo khoảng cách bên
    marginTop: 25,
  },
  artistRow: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Đảm bảo khoảng cách hợp lý
    alignItems: "center", // Đặt các thành phần ở giữa
    marginBottom: 16,
  },
  artistDetails: {
    flexDirection: "column", // Đặt tên và người nghe theo cột
  },
  artistName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4, // Khoảng cách nhỏ giữa tên nghệ sĩ và số người nghe
  },
  listenersText: {
    fontSize: 16,
    color: "white",
  },
  followButton: {
    backgroundColor: "transparent", // Nền trong suốt
    borderRadius: 20, // Bo góc nhẹ
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1, // Độ dày của viền
    borderColor: "white", // Màu viền trắng
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  artistDescription: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
    textAlign: "left", // Căn giữa mô tả
    paddingHorizontal: 16, // Đảm bảo khoảng cách bên
  },
});
