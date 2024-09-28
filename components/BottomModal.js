// BottomModal.js
import React, { useState } from "react";
import { ScrollView, View, Text, Pressable, Image } from "react-native";
import { BottomModal, ModalContent } from "react-native-modals"; // Import BottomModal
import { LinearGradient } from "expo-linear-gradient"; // Nếu bạn sử dụng Expo
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

const BottomModalComponent = ({
  visible,
  setVisible,
  lyrics,
  showFullLyrics,
  setShowFullLyrics,
  handleFollowToggle,
  isFollowing,
}) => {
  return (
    <BottomModal
      visible={visible}
      swipeDirection={["up", "down"]}
      swipeThreshold={200}
      onBackdropPress={() => setVisible(false)} // Đóng modal khi nhấn ra ngoài
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
            {/* Phần tiêu đề */}
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

            {/* Phần hiển thị bài hát */}
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

              {/* Phần Lyrics */}
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
                        color: "white",
                        textAlign: "left",
                        marginBottom: 10,
                      }}
                    >
                      Lyrics preview
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        textAlign: "left",
                      }}
                    >
                      {lyrics}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setShowFullLyrics(!showFullLyrics)} // Đổi trạng thái show/hide
                    style={{
                      marginTop: 10,
                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 20,
                    }}
                  >
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      {showFullLyrics ? "Hide lyrics" : "Show lyrics"}
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
              {/* Kết thúc phần lyrics */}
            </View>

            
          </ScrollView>
        </ModalContent>
      </LinearGradient>
    </BottomModal>
  );
};


export default BottomModalComponent;

