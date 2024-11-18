import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { constants } from "../helper/constants";

const SongItem = ({ song, onPress, like, likes, setLikes, index }) => {
  const handleLikeSongToggle = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        `${constants.url}/user/likeSong`,
        {
          songId: song._id,
          is_liked: !like,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Nếu cần cập nhật mảng likes
        if (Array.isArray(likes)) {
          const newLikes = [...likes];
          if (index !== undefined && index >= 0 && index < newLikes.length) {
            newLikes[index] =
              response.data.content.is_liked !== undefined
                ? response.data.content.is_liked
                : false;
            setLikes(newLikes);
          }
        }
      } else {
        console.error("Failed to update like status", response.data);
      }
    } catch (error) {
      console.error("Error updating like song status:", error);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
    >
      <Image
        style={{ width: 50, height: 50, marginRight: 10 }}
        source={{ uri: song.image }}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#3FFF00",
          }}
        >
          {song.name}
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>
          {song.artistId.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 10,
        }}
      >
        <Pressable onPress={handleLikeSongToggle}>
          <AntDesign
            name={like ? "checkcircle" : "pluscircleo"}
            size={26}
            color={like ? "#1DB954" : "white"}
          />
        </Pressable>
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

export default SongItem;

const styles = StyleSheet.create({});
