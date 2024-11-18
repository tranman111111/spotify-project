import React, {  useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { constants } from "../helper/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "../PlayerContext";

const MiniPlayer = ({ onPress, dataSong }) => {
  const [likeSong, setLikeSong] = useState(false);
  const { lyricsBackgroundColor} = useContext(Player);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        if (!dataSong || !dataSong._id) {
          // console.error("Invalid current track ID");
          setLikeSong(false);
          return;
        }

        const likeSongResponse = await axios.get(
          `${constants.url}/user/likeSong/${dataSong._id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setLikeSong(likeSongResponse.data.content?.is_liked ?? false);
      } catch (error) {
        setLikeSong(false);
      }
    };

    fetchArtistData();
  }, []);

  

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: lyricsBackgroundColor,
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
          source={{ uri: dataSong.image }}
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
            {dataSong.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              width: 220,
              color: "#ffffff",
            }}
          >
            {dataSong.artistId.name}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <AntDesign
          name={likeSong ? "checkcircle" : "pluscircleo"}
          size={26}
          color={likeSong ? "#1DB954" : "white"}
        />
        <Pressable>
          <Entypo
            name="controller-play"
            size={26}
            color="white"
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default MiniPlayer;
