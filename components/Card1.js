import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Card1 = ({ item, onPress }) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={onPress} style={{ margin: 10 }}>
      <Image
        style={{ width: 130, height: 130, borderRadius: 5 }}
        source={{ uri: item.image }}
      />
      <Text
        numberOfLines={1} 
        ellipsizeMode="tail" 
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
          width: 130, 
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

export default Card1;

const styles = StyleSheet.create({});
