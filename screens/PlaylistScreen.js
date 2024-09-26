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
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SongItem from "../components/SongItem";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";

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

      <Pressable
        style={{
          backgroundColor: "#5072A7",
          width: "90%",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
          position: "absolute",
          borderRadius: 6,
          left: 20,
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
            source={{ uri: "https://i.pravatar.cc/40" }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              width: 220,
              color: "white",
              fontWeight: "bold",
            }}
          >
            vfgfgdfg • fgfdgsdfgds
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign name="heart" size={24} color="#1DB954" />
          <Pressable>
            <AntDesign name="pausecircle" size={24} color="white" />
          </Pressable>
        </View>
      </Pressable>

      <BottomModal
        visible={false}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <ModalContent
          style={{ height: "100%", width: "100%", backgroundColor: "#5072A7" }}
        >
          <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign
                name="down"
                size={24}
                color="white"
              />

              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                dfdfdfd
              </Text>

              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>

            <View style={{ height: 70 }} />

            <View style={{ padding: 10 }}>
              <Image
                style={{ width: "100%", height: 330, borderRadius: 4 }}
                source={{ uri: "https://i.pravatar.cc/40" }}
              />
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    dfdfdf
                  </Text>
                  <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                    jgjhjhj
                  </Text>
                </View>

                <AntDesign name="heart" size={24} color="#1DB954" />
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
                    style={
                      {
                        position: "absolute",
                        top: -5,
                        width: 12,
                        height: 12,
                        borderRadius: 12 / 2,
                        backgroundColor: "white",
                      }
                    }
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
                    4:00
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
                  <FontAwesome name="arrows" size={30} color="#03C03C" />
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
                <Pressable >
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={30} color="#03C03C" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});
