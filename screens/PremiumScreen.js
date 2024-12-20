import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const PremiumScreen = ({ navigation }) => {
  const handleUpgrade = () => {
    Alert.alert(
      "Nâng cấp Premium",
      "Bạn đã chọn gói Premium Individual.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Proceed to Checkout",
          onPress: () => navigation.navigate("Checkout"),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#1DB954", "#121212"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
          <Text style={styles.title}>
            Get 2 months of Premium for 29,500₫ with Spotify
          </Text>
        </View>
      </LinearGradient>

      <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
        <Text style={styles.upgradeText}>Get Premium Individual</Text>
      </TouchableOpacity>

      <Text style={styles.promoText}>
        29,500₫ for 2 months, then 59,000₫ per month after. Offer only available
        if you haven't tried Premium before.
        <Text style={styles.linkText}> Terms apply.</Text>
      </Text>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why join Premium?</Text>
        <View style={styles.divider} />
        <FeatureItem icon="close" text="Ad-free music listening" />
        <FeatureItem icon="file-download" text="Download to listen offline" />
        <FeatureItem icon="play-arrow" text="Play songs in any order" />
        <FeatureItem icon="audiotrack" text="High audio quality" />
        <FeatureItem icon="group" text="Listen with friends in real time" />
      </View>
    </ScrollView>
  );
};

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={24} color="#1DB954" style={styles.icon} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    height: 320,
    position: "relative",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  headerContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  premiumText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "left",
    lineHeight: 24,
  },
  upgradeButton: {
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  upgradeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  promoText: {
    color: "#b3b3b3",
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  linkText: {
    color: "#1DB954",
    fontWeight: "bold",
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#b3b3b3",
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#1f1f1f", // Màu nền cho các mục tính năng
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  featureText: {
    color: "#b3b3b3",
    fontSize: 16,
  },
});

export default PremiumScreen;
