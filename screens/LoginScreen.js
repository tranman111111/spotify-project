import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#383C48", "#2A2E39", "#131624", "#040306"]}
      locations={[0, 0.3, 0.6, 1]} 
      style={{ flex: 1 ,}}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView>
        <View style={{ height: 80, marginTop:150 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text style={styles.titleText}>Millions of songs.</Text>
        <Text style={styles.titleText}>Free on Spotify.</Text>
        <View style={{ height: 80 }} />
        <Pressable
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("SignUpDetail")}
        >
          <Text style={styles.buttonText1}>Sign up free</Text>
        </Pressable>

        <Pressable style={styles.buttonSecondary}>
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={styles.buttonText}>Continue with phone number</Text>
        </Pressable>

        <Pressable style={styles.buttonSecondary}>
          <AntDesign name="google" size={24} color="red" />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.buttonSecondary}>
          <Entypo name="facebook" size={24} color="blue" />
          <Text style={styles.buttonText}>Sign In with Facebook</Text>
        </Pressable>

        <Pressable
          style={styles.buttonSecondary1}
          onPress={() => navigation.navigate("LoginDetail")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  titleText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonPrimary: {
    backgroundColor: "#1DB954",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonSecondary: {
    backgroundColor: "#131624",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },

  buttonSecondary1: {
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
    fontSize: 15
  },
  buttonText1: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1,
    fontSize: 15
  },
});
