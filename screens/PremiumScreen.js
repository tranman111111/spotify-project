import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PremiumScreen = () => {
  const features = [
    { title: 'Ad-free listening', description: 'Enjoy your favorite music without interruptions.', image: require('../assets/adfree.png') },
    { title: 'Offline listening', description: 'Download your favorite songs and listen offline.', image: require('../assets/offline.png') },
    { title: 'Unlimited skips', description: 'Skip as many songs as you want.', image: require('../assets/skips.png') },
    { title: 'High-quality audio', description: 'Stream music in high quality.', image: require('../assets/highquality.png') },
  ];

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 30 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Spotify Premium</Text>
          <Text style={styles.subtitle}>Upgrade to enjoy these features:</Text>

          {features.map((feature, index) => (
            <View key={index} style={styles.featureBox}>
              <Image source={feature.image} style={styles.featureImage} />
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  featureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
  },
  featureImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  featureDescription: {
    fontSize: 14,
    color: '#ccc',
  },
  subscribeButton: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PremiumScreen;
