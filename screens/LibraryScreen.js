import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constants } from "../helper/constants";

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchLikedArtists = async () => {
      const userId = await AsyncStorage.getItem("userId");
      try {
        const responseArtist = await axios.get(
          `${constants.url}/artist/likedArtists?userId=${userId}`
        );
        setArtists(responseArtist.data.content);

        const responseSong = await axios.get(
          `${constants.url}/song/likedSongs?userId=${userId}`
        );
        setSongs(responseSong.data.content);

        const responseUser = await axios.get(`${constants.url}/user/${userId}`);
        setUser(responseUser.data.content);
      } catch (error) {
        console.error("Error fetching liked artists:", error);
      }
    };
    fetchLikedArtists();
  }, [artists]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item} 
      onPress={() =>
        navigation.navigate("ArtistDetail", { artistId: item._id })
      }
    >
      <Image source={{ uri: item.avarta }} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>Artist</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
        <View style={styles.header}>
          <Image
            source={
              user && user.image
                ? { uri: user.image }
                : require("../assets/ava_default.jpg")
            }
            style={styles.logo}
          />
          <Text style={styles.headerText}>Your Library</Text>
        </View>
        {/* <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Favorite Song</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Favorite Artists</Text>
          </TouchableOpacity>
        </View> */}
        {/* <Text style={styles.subHeader}>Favorite Artists</Text> */}

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("LikedSong")}
        >
          <LinearGradient
            colors={["#33006F", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 55,
              height: 55,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              marginRight: 15,
            }}
          >
            <AntDesign name="heart" size={24} color="white" />
          </LinearGradient>

          {/* Phần thông tin */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}> Liked Songs</Text>
            <Text style={styles.subtitle}>
              <AntDesign name="pushpin" size={20} color="#1ED760" /> Playlist .{" "}
              {songs.length} songs
            </Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={artists}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          style={styles.list}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subHeader: {
    fontSize: 20,
    color: "#FFFFFF",
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tab: {
    padding: 10,
  },
  tabText: {
    color: "#B3B3B3",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemLikeSong: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "red",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  subtitle: {
    color: "#B3B3B3",
    fontSize: 14,
  },
  list: {
    marginTop: 10,
  },
});

export default LibraryScreen;
