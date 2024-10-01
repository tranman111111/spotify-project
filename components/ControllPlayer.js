import React from "react";
// import TrackPlayer from 'react-native-track-player';
import {
  Pressable
} from "react-native";
import {  Entypo } from "@expo/vector-icons";

function ControllPlayer() {
  return (
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
  );
}

export default ControllPlayer;
