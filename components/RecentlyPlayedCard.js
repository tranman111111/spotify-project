import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecentlyPlayedCard = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{ margin: 10 }}
    >
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: "https://i.pravatar.cc/55" }}
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        dfgdsfdsfdf
      </Text>
    </Pressable>
  );
};

export default RecentlyPlayedCard;

const styles = StyleSheet.create({});