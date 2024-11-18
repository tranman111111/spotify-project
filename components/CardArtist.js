import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const CardArtist = ({ item , onPress}) => {
  return (
    <Pressable onPress={onPress} style={{ margin: 10 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.avarta }}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

export default CardArtist;

const styles = StyleSheet.create({});