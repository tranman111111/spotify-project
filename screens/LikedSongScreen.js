import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import MiniPlayer from "../components/MiniPlayer";

const LikedSongScreen = () => {
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
