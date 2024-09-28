import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const LikedSongScreen = () => {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const navigation = useNavigation();
  const songData = [
    {
      song: "Ngủ một mình (tình rất tình)",
      artist: "HIEUTHUHAI, Negav, Kewtiie",
      image: require("../assets/ngu-mot-minh.jpg"),
    },
    {
      song: "Dễ đến dễ đi",
      artist: "Quang Hùng MasterD",
      image: require("../assets/de-den-de-di.jpg"),
    },
    {
      song: "BADBYE",
      artist: "WEAN",
      image: require("../assets/badbye.jpg"),
    },
    {
      song: "Mặt trời của em",
      artist: "Phương Ly",
      image: require("../assets/mat-troi-cua-em.jpg"),
    },
    {
      song: "Nơi này có anh",
      artist: "Sơn Tùng M-TP",
      image: require("../assets/noi-nay-co-anh.webp"),
    },
  ];
  return (
    <>
      <LinearGradient
        colors={["#614385", "#282828"]}
        locations={[0, 0.3, 1]} // Đặt điểm chuyển màu
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
            <Text style={{ color: "white" }}>5 songs</Text>
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
                backgroundColor: "transparent", // Màu nền là đen
                width: 28, // Độ rộng và chiều cao giống nhau để tạo hình tròn
                height: 28,
                borderRadius: 20, // Bán kính hình tròn bằng nửa chiều rộng/chiều cao
                justifyContent: "center", // Canh giữa icon theo chiều dọc
                alignItems: "center", // Canh giữa icon theo chiều ngang
                borderWidth: 2, // Độ dày của viền
                borderColor: "white", // Màu viền là trắng
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
              >
                <Entypo name="controller-play" size={24} color="black" />
              </Pressable>
            </View>
          </Pressable>

          <View>
            <View style={{ marginTop: 10, marginHorizontal: 12 }}>
              {songData.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Ảnh bài hát */}
                  <Image
                    source={item.image}
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
                      {item.song}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "#989898",
                        marginTop: 5,
                      }}
                    >
                      {item.artist}
                    </Text>
                  </View>

                  {/* Icon dấu ba chấm */}
                  <Entypo name="dots-three-vertical" size={24} color="white" />
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <Pressable
        onPress={() => setVisible(true)}
        style={{
          backgroundColor: "#B55239",
          width: "95%",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 45,
          position: "absolute",
          borderRadius: 6,
          left: 10,
          bottom: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/ngu-mot-minh.jpg")}
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
              Ngủ một mình (tình rất tình)
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 11,
                width: 220,
                color: "#ffffff",
              }}
            >
              HIEUTHUHAI
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="checkcircle" size={24} color="#1DB954" />
          <Pressable>
            <AntDesign name="caretright" size={24} color="white" />
          </Pressable>
        </View>
      </Pressable>

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
              // backgroundColor: "#B55239",
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
                <Pressable onPress={() => setVisible(false)}>
                  <AntDesign name="down" size={24} color="white" />
                </Pressable>

                <View
                  style={{
                    alignItems: "center", // Căn giữa theo chiều ngang
                    justifyContent: "center", // Căn giữa theo chiều dọc (nếu cần trong trường hợp thêm khoảng trống phía ngoài)
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
                    alignItems: "center", // Canh giữa theo chiều dọc
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
                    <Ionicons
                      name="play-skip-forward"
                      size={30}
                      color="white"
                    />
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
                    backgroundColor: "#B55239", // Màu nền cam
                    borderRadius: 10, // Bo góc khung
                    padding: 20, // Khoảng cách giữa nội dung và viền
                    width: "100%", // Chiều rộng 100%
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: showFullLyrics ? null : 100, // Giới hạn chiều cao khi chưa show full
                      overflow: "hidden", // Giấu phần nội dung vượt quá chiều cao
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
                  Trần Minh Hiếu (sinh ngày 28 tháng 9 năm 1999), thường được
                  biết đến với nghệ danh HIEUTHUHAI hay cách viết khác là
                  hieuthuhai, là một nam rapper, ca sĩ kiêm sáng tác nhạc và
                  diễn viên người Việt Nam.
                </Text>
              </Pressable>
            </ScrollView>
          </ModalContent>
        </LinearGradient>
      </BottomModal>
    </>
  );
};

export default LikedSongScreen;

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