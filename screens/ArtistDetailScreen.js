import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ArtistDetailScreen = ({ navigation }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const songData = [
    {
      song: "Ngủ một mình (tình rất tình)",
      image: require("../assets/ngu-mot-minh.jpg"),
      listens: "1.2M", // Thêm số lượt nghe
    },
    {
      song: "Dễ đến dễ đi",
      image: require("../assets/de-den-de-di.jpg"),
      listens: "900K",
    },
    {
      song: "BADBYE",
      image: require("../assets/badbye.jpg"),
      listens: "3.5M",
    },
    {
      song: "Mặt trời của em",
      image: require("../assets/mat-troi-cua-em.jpg"),
      listens: "500K",
    },
    {
      song: "Nơi này có anh",
      image: require("../assets/noi-nay-co-anh.webp"),
      listens: "2.1M",
    },
    {
      song: "Nơi này có anh",
      image: require("../assets/noi-nay-co-anh.webp"),
      listens: "2.1M",
    },
    {
      song: "Nơi này có anh",
      image: require("../assets/noi-nay-co-anh.webp"),
      listens: "2.1M",
    },
    {
      song: "Nơi này có anh",
      image: require("../assets/noi-nay-co-anh.webp"),
      listens: "2.1M",
    },
  ];

  return (
    <LinearGradient colors={["#282828", "#1c1c1c"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 30 }}>
        {/* Ảnh nghệ sĩ */}
        <View style={{ marginHorizontal: 0 }}>
          <Image
            source={require("../assets/Hieuthuhai.jpg")}
            style={styles.artistImage}
          />
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.artistName}>HIEUTHUHAI</Text>
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
          <Text style={{ color: "#989898" }}>1.6M monthly listeners</Text>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Pressable style={styles.followButton} onPress={handleFollowToggle}>
            <Text style={styles.followButtonText}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              marginLeft: 10,
              marginTop: 15,
            }}
          >
            Popular
          </Text>
        </View>

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
              {/* Thứ tự bài hát */}
              <Text style={styles.songOrder}>{index + 1}</Text>

              {/* Ảnh bài hát */}
              <Image
                source={item.image}
                style={{ width: 50, height: 50, borderRadius: 5 }}
              />

              {/* Thông tin bài hát */}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "white" }}
                >
                  {item.song}
                </Text>
                <Text style={{ fontSize: 14, color: "#989898" }}>
                  {item.listens} listens
                </Text>
              </View>

              {/* Icon dấu ba chấm */}
              <Entypo name="dots-three-vertical" size={24} color="#989898" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ArtistDetailScreen;

const styles = StyleSheet.create({
  artistImage: {
    width: width,
    height: 300,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 25,
    padding: 10,
  },
  artistName: {
    position: "absolute",
    bottom: 10,
    left: 16,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  songOrder: {
    fontSize: 16,
    color: "white",
    marginRight: 20,
    marginLeft: 10,
  },
  followButton: {
    backgroundColor: "transparent",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "white",
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
