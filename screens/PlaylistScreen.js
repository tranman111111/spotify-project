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
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SongItem from "../components/SongItem";


const PlaylistScreen = () => {
  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginTop: 30 }}>
          <Pressable style={{ marginHorizontal: 10 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          <Pressable
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 9,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#42275a",
                padding: 9,
                flex: 1,
                borderRadius: 3,
                height: 38,
              }}
            >
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                value=""
                placeholder="Find in Liked songs"
                placeholderTextColor={"white"}
                style={{ fontWeight: "500", color: "white" }}
              />
            </Pressable>

            <Pressable
              style={{
                marginHorizontal: 10,
                backgroundColor: "#42275a",
                padding: 10,
                borderRadius: 3,
                height: 38,
              }}
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </Pressable>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Liked Songs
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              430 songs
            </Text>
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
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: "#1DB954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialCommunityIcons
                name="cross-bolnisi"
                size={24}
                color="#1DB954"
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
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          <Pressable>
            <SongItem/>
            <SongItem/>
            <SongItem/>
            <SongItem/>
            <SongItem/>
            <SongItem/>
            <SongItem/>
            <SongItem/>
          </Pressable>


        </ScrollView>
      </LinearGradient>
    </>
  )
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});
