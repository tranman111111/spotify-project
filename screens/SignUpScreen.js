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
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation logic
    let isValid = true;

    // Kiểm tra xem các trường có được điền đầy đủ hay không
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
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
      // Nếu không có lỗi, thực hiện thao tác đăng ký
      Alert.alert("Success", "Account created successfully!");
      // Chuyển hướng đến trang Main
      navigation.navigate("Main");
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
