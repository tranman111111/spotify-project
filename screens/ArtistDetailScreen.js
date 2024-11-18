import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { constants } from "../helper/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Player } from "../PlayerContext";

const { width } = Dimensions.get("window");

const ArtistDetailScreen = ({ navigation, route }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { artistId } = route.params;
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [likes, setLikes] = useState([]);

  const { currentTrack, setCurrentTrack, playlist, setPlaylist } = useContext(Player);

 
  useEffect(() => {
    const fetchArtistData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${constants.url}/artist/getById?id=${artistId}`
        );
        setArtistData(response.data.content);

        const songsResponse = await axios.get(
          `${constants.url}/song/getByArtist/?id=${artistId}`
        );
        const fetchedSongs = songsResponse.data.content;

        if (fetchedSongs.length === 0) {
          setSongs([]);
        } else {
          setSongs(fetchedSongs);
          const likeStatuses = [];

          for (let i = 0; i < fetchedSongs.length; i++) {
            const songId = fetchedSongs[i]._id;
            try {
              const likeSongResponse = await axios.get(
                `${constants.url}/user/likeSong/${songId}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              likeStatuses.push(likeSongResponse.data.content.is_liked);
            } catch (likeSongError) {
              likeStatuses.push(false);
            }
          }

          setLikes(likeStatuses);
        }

        const followingResponse = await axios.get(
          `${constants.url}/user/follow/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setIsFollowing(followingResponse.data.content.follow_status);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [artistId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleFollowToggle = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");

      await axios.put(
        `${constants.url}/user/follow`,
        {
          artistId: artistId,
          follow_status: !isFollowing,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  const handleLikeSongToggle = async (songId, index) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await axios.put(
        `${constants.url}/user/likeSong`,
        {
          songId: songId,
          is_liked: !likes[index], 
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        const newLikes = [...likes];
        newLikes[index] =
          response.data.content.is_liked !== undefined
            ? response.data.content.is_liked
            : false;
        setLikes(newLikes);
      } else {
        console.error("Failed to update like status", response.data);
      }
    } catch (error) {
      console.error("Error updating like song status:", error);
    }
  };

  const handlePlaySong = (selectedSong) => {
    setCurrentTrack(selectedSong); // Cập nhật bài hát hiện tại
    setPlaylist(songs); // Cập nhật danh sách phát
  };

  return (
    <LinearGradient colors={["#282828", "#1c1c1c"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 30 }}>
        {/* Ảnh nghệ sĩ */}
        <View style={{ marginHorizontal: 0 }}>
          <Image
            source={{ uri: artistData.avarta }}
            style={styles.artistImage}
          />
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.artistName}>{artistData.name}</Text>
        </View>

        <View
          style={{
            marginHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 10,
            gap: 7,
          }}
        >
          <Text style={{ color: "#989898" }}>
            {Intl.NumberFormat("en", {
              notation: "compact",
              compactDisplay: "short",
            }).format(artistData.monthly_views)}{" "}
            monthly listeners
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
            style={[
              styles.followButton,
              !isFollowing && styles.followButtonOutline,
            ]}
            onPress={handleFollowToggle}
          >
            <Text
              style={[
                styles.followButtonText,
                !isFollowing && styles.followButtonTextWhite,
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo
              name="shuffle"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
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
              onPress={() => handlePlaySong(songs[0])}
            >
              <Entypo name="controller-play" size={24} color="black" />
            </Pressable>
          </View>
        </Pressable>

        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              marginLeft: 10,
              marginTop: 15,
            }}
          >
            Popular
          </Text>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 12 }}>
          {songs.length === 0 ? (
            <Text style={{ color: "#989898", fontSize: 16 }}>
              Chưa có bài hát
            </Text>
          ) : (
            songs.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => handlePlaySong(item)}
              >
                <Text style={styles.songOrder}>{index + 1}</Text>

                <Image
                  source={{ uri: item.image }}
                  style={{ width: 50, height: 50, borderRadius: 5 }}
                />

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "white" }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#989898" }}>
                    {Intl.NumberFormat().format(item.playCount)} listens
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
                  <Pressable
                    onPress={() => handleLikeSongToggle(item._id, index)}
                  >
                    <AntDesign
                      name={likes[index] ? "checkcircle" : "pluscircleo"}
                      size={26}
                      color={likes[index] ? "#1DB954" : "white"}
                    />
                  </Pressable>
                  <Entypo
                    name="dots-three-vertical"
                    size={24}
                    color="#C0C0C0"
                  />
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ArtistDetailScreen;

const styles = StyleSheet.create({
  artistImage: {
    width: width,
    height: 300,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 50,
    padding: 10,
  },
  artistName: {
    position: "absolute",
    bottom: 10,
    left: 16,
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  followButton: {
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1DB954",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  followButtonOutline: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  followButtonText: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  followButtonTextWhite: {
    color: 'white',
  },
  songOrder: {
    color: "#989898",
    fontSize: 16,
  },
});
