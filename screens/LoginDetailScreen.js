import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { Player } from "../PlayerContext"; 

const LoginDetailScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState(""); 
  const [errorMessagePassword, setErrorMessagePassword] = useState(""); 

  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(Player);

  const validCredentials = {
    email: "man123@gmail.com",
    password: "Man123",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLogin = () => {
    setErrorMessageEmail("");
    setErrorMessagePassword("");

    let valid = true;

    if (!email) {
      setErrorMessageEmail("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setErrorMessageEmail("Please enter a valid email.");
      valid = false;
    }

    if (!password) {
      setErrorMessagePassword("Password is required.");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setErrorMessagePassword(
        "Password must be at least 6 characters long and contain both letters and numbers."
      );
      valid = false;
    }
    if (valid) {
      if (
        email === validCredentials.email &&
        password === validCredentials.password
      ) {
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => {
              setIsLoggedIn(true); 
              navigation.navigate("Main"); 
            },
          },
        ]);
      } else {
        setErrorMessageEmail("Invalid email or password.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút lùi lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.label}>Email or username</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {errorMessageEmail ? (
        <Text style={styles.errorText}>{errorMessageEmail}</Text>
      ) : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isPasswordVisible} 
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"} 
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
      {errorMessagePassword ? (
        <Text style={styles.errorText}>{errorMessagePassword}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => Alert.alert("Log in without password")}
      >
        <Text style={styles.linkText}>Log in without password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 25,
    paddingTop: 90,
  },
  backButton: {
    position: "absolute",
    top: 40, 
    left: 20,
    padding: 10,
    zIndex: 1, 
  },
  label: {
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#282828",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 5,
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 8,
    marginBottom: 5,
  },
  icon: {
    paddingRight: 10,
    position: "absolute",
    right: 0,
  },
  button: {
    width: "30%",
    height: 50,
    backgroundColor: "gray",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 35,
    borderColor: "#ffffff", 
    borderWidth: 1, 
    borderRadius: 25, 
    paddingVertical: 10, 
    paddingHorizontal: 20,
  },
  linkText: {
    color: "#ffffff", 
    fontSize: 14,
    textAlign: "center", 
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
