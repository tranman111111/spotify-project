import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const genres = [
    { name: "Pop", color: "#1DB954", image: require("../assets/pop.png") },
    {
      name: "Hip Hop",
      color: "#E13300",
      image: require("../assets/hiphop.jpg"),
    },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
    { name: "Rock", color: "#A9A9A9", image: require("../assets/rock.jpg") },
    { name: "Jazz", color: "#FFD700", image: require("../assets/jazz.jpg") },
  ];

  const suggestions = [
    "Pop Songs",
    "Hip Hop Beats",
    "Rock Classics",
    "Jazz Standards",
    "Sơn Tùng M-TP",
    "HIEUTHUHAI",
    "Nơi này có",
  ];

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../assets/ava.jpg")} style={styles.logo} />
          <Text style={styles.headerText}>Search</Text>
        </View>

        <Pressable
          style={styles.fixedSearchBar}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="search" size={24} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#4F4F4F"
          />
        </Pressable>

        <ScrollView style={{ marginTop: 50 }}>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.genresContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.genreBox, { backgroundColor: genre.color }]}
              >
                <Text style={styles.genreText}>{genre.name}</Text>
                <Image source={genre.image} style={styles.genreImage} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </Pressable>
              <TextInput
                style={styles.modalInput}
                placeholder="What do you want to listen to?"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <ScrollView>
              {searchQuery.length > 0 ? (
                suggestions
                  .filter((item) =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((suggestion, index) => (
                    <TouchableOpacity key={index} style={styles.suggestionItem}>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))
              ) : (
                <View style={styles.noSuggestionsContainer}>
                  <Text style={styles.noSuggestionsTitle}>
                    Play what you love
                  </Text>
                  <Text style={styles.noSuggestionsSubtitle}>
                    Search for artists, songs, podcasts, and more.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  fixedSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  genreBox: {
    width: "48%",
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    justifyContent: "space-between",
  },
  genreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  genreImage: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 0,
    justifyContent: "flex-start",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    width: "100%",
    paddingHorizontal: 16,
  },
  modalInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#282828",
    color: "#fff",
    marginHorizontal: 10,
    fontSize:18
  },
  suggestionItem: {
    padding: 15,
  },
  suggestionText: {
    color: "#fff",
    fontSize: 16,
  },
  noSuggestionsContainer: {
    justifyContent: "center", 
    alignItems: "center",
    paddingHorizontal: 20, 
    flex: 1, 
    marginTop:350
  },

  noSuggestionsTitle: {
    color: "#fff",
    fontSize: 22, 
    fontWeight: "bold",
    textAlign: "center",
  },
  noSuggestionsSubtitle: {
    color: "gray",
    fontSize: 13, 
    textAlign: "center",
  },
});

export default SearchScreen;
