import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';  // Import axios
import { useNavigation } from "@react-navigation/native";
import {constants} from "../helper/constants";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState(""); 
  const [phoneError, setPhoneError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const handleSignUp = async () => {
    setEmailError("");
    setUsernameError(""); 
    setPhoneError(""); 
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    }

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    }

    if (!phone) {
      setPhoneError("Phone number is required.");
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      try {
        // Gửi dữ liệu đến API register với body raw JSON
        const response = await axios.post(`${constants.url}/user/register`, 
          {
            email: email,
            username: username,
            password: password,
            phone: phone
          }, 
          {
            headers: {
              'Content-Type': 'application/json' // Đảm bảo gửi đúng dạng JSON
            }
          }
        );
  
        // Hiển thị thông báo thành công
        Alert.alert("Success", "Sign Up successful!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("LoginDetail"),
          },
        ]);
      } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message);
        Alert.alert("Error", "Failed to sign up. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingBottom: 50 }}
      >
        {/* Icon lùi lại */}
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        {/* Label Create Account */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffffff" }}>
            Create account
          </Text>
        </View>
      </View>

      {/* Username field */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

      {/* Phone field */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

      {/* Email field */}
      <Text style={styles.label}>What's your email?</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password field */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {/* Confirm Password field */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 25,
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
    marginBottom: 8,
  },
  passwordContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 8,
    marginBottom: 20,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 14,
  },
});
