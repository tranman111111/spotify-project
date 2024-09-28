import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons"; // Hoặc thư viện icon khác

const PremiumScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header section */}
      <LinearGradient colors={["#1DB954", "#121212"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Image
              source={require("../assets/logo.png")} // Thay đổi đường dẫn đến ảnh của bạn
              style={styles.iconImage} // Style cho ảnh
            />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
          <Text style={styles.title}>
            Get 2 months of Premium for 29,500₫ with Spotify
          </Text>
        </View>
      </LinearGradient>

      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeText}>Get Premium Individual</Text>
      </TouchableOpacity>
      <Text style={styles.promoText}>
        29,500₫ for 2 months, then 59,000₫ per month after. Offer only available
        if you haven't tried Premium before.
        <Text style={styles.linkText}> Terms apply.</Text>
      </Text>

      {/* Features section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why join Premium?</Text>
        {/* Đường line ngang */}
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
    flexDirection: "row", // Để ảnh và chữ nằm trên cùng một hàng
    alignItems: "center", // Căn giữa cho ảnh và chữ
    marginBottom: 10, // Khoảng cách giữa tiêu đề và phần thông tin dưới
  },
  iconImage: {
    width: 30, // Đặt chiều rộng cho ảnh
    height: 30, // Đặt chiều cao cho ảnh
    marginRight: 8, // Khoảng cách giữa ảnh và chữ "Premium"
  },
  premiumText: {
    color: "#fff", // Màu chữ trắng
    fontSize: 18, // Kích thước chữ "Premium"
    marginRight: 10, // Khoảng cách giữa chữ "Premium" và tiêu đề
  },
  title: {
    color: "#fff",
    fontSize: 20, // Kích thước chữ tiêu đề
    fontWeight: "400", // Độ đậm của chữ
    textAlign: "left",
    lineHeight: 24, // Khoảng cách giữa các dòng
  },
  upgradeButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    width: "90%",
    alignSelf: "center",
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
  },
  upgradeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  promoText: {
    color: "#b3b3b3",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
  linkText: {
    textDecorationLine: "underline",
    color: "#1ED760",
  },
  featuresSection: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#282828",
    borderRadius: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    marginRight: 10, // Khoảng cách giữa icon và text
  },
  divider: {
    height: 0.5,
    backgroundColor: "#b3b3b3",
    marginBottom: 15,
  },
});

export default PremiumScreen;
