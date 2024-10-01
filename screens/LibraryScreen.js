import React from "react";
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
import { useNavigation } from '@react-navigation/native';


const data = [
  { id: "1", name: "Sơn Tùng MTP", logo: require("../assets/son-tung.webp") },
  { id: "2", name: "HIEUTHUHAI", logo: require("../assets/Hieuthuhai.jpg") },
  { id: "3", name: "NEGAV", logo: require("../assets/Negav.jpg") },
  {
    id: "4",
    name: "Quang Hùng MasterD",
    logo: require("../assets/quang-hung.webp"),
  }
];

const LibraryScreen = () => {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ArtistDetail')}>
      <Image source={item.logo} style={styles.logo} />
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
          <Image source={require("../assets/ava.jpg")} style={styles.logo} />
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

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('LikedSong')} >
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
            <Text style={styles.subtitle}><AntDesign name="pushpin" size={20} color="#1ED760" /> Playlist . 5 songs</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
