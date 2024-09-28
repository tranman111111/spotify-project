import React, { useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Player } from "../PlayerContext"; // Import PlayerContext
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

const MiniPlayer = ({ onPress }) => {
  //   const { currentTrack } = useContext(Player); // Lấy thông tin bài hát hiện tại từ context

  //   if (!currentTrack) {
  //     return null; // Nếu không có bài hát nào đang phát, không hiển thị MiniPlayer
  //   }

  const defaultTrack = {
    artwork: require("../assets/ngu-mot-minh.jpg"), // Đường dẫn đến hình ảnh mặc định
    title: "Ngủ một mình",
    artist: "HIEUTHUHAI",
  };

  return (
    <Pressable
      onPress={onPress}
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
          source={defaultTrack.artwork}
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
            {defaultTrack.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              width: 220,
              color: "#ffffff",
            }}
          >
            {defaultTrack.artist}
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
  );
};

export default MiniPlayer;