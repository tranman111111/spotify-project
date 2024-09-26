import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const genres = [
    { name: 'Pop', color: '#1DB954', image: require('../assets/pop.png') },
    { name: 'Hip Hop', color: '#E13300', image: require('../assets/hiphop.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },
    { name: 'Rock', color: '#A9A9A9', image: require('../assets/rock.jpg') },
    { name: 'Jazz', color: '#FFD700', image: require('../assets/jazz.jpg') },

    // Thêm các thể loại khác
  ];

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/ava.jpg')} style={styles.logo} />
          <Text style={styles.headerText}>Search</Text>
        </View>

        {/* Search Bar Container được đưa ra ngoài ScrollView và có vị trí cố định */}
        <View style={styles.fixedSearchBar}>
          <Ionicons name="search" size={24} color="#000" />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#4F4F4F"
          />
        </View>

        <ScrollView style={{ marginTop: 50 }}>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.genresContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity key={index} style={[styles.genreBox, { backgroundColor: genre.color }]}>
                <Text style={styles.genreText}>{genre.name}</Text>
                <Image source={genre.image} style={styles.genreImage} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#fff',
  },
  fixedSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    position: 'absolute', // Đặt vị trí cố định
    top: 70, // Khoảng cách từ trên cùng
    left: 16,
    right: 16,
    zIndex: 1, // Đảm bảo phần này luôn nằm trên
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  genreBox: {
    width: '48%',
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    justifyContent: 'space-between',
  },
  genreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  genreImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default SearchScreen;
