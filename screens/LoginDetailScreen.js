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

import { Player } from "../PlayerContext"; // Import Player context

const LoginDetailScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState(""); // Thông báo lỗi cho email
  const [errorMessagePassword, setErrorMessagePassword] = useState(""); // Thông báo lỗi cho password

  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(Player);

  // Object demo chứa thông tin tài khoản hợp lệ
  const validCredentials = {
    email: "man123@gmail.com",
    password: "Man123",
  };

  // Biểu thức chính quy để kiểm tra email hợp lệ
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Biểu thức chính quy để kiểm tra mật khẩu hợp lệ
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLogin = () => {
    // Reset thông báo lỗi trước khi kiểm tra
    setErrorMessageEmail("");
    setErrorMessagePassword("");

    let valid = true;

    // Kiểm tra email
    if (!email) {
      setErrorMessageEmail("Email is required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setErrorMessageEmail("Please enter a valid email.");
      valid = false;
    }

    // Kiểm tra password
    if (!password) {
      setErrorMessagePassword("Password is required.");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setErrorMessagePassword(
        "Password must be at least 6 characters long and contain both letters and numbers."
      );
      valid = false;
    }

    // Nếu tất cả hợp lệ thì kiểm tra với thông tin demo
    if (valid) {
      if (
        email === validCredentials.email &&
        password === validCredentials.password
      ) {
        // Đăng nhập thành công
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => {
              setIsLoggedIn(true); // Đặt trạng thái là đã đăng nhập
              navigation.navigate("Main"); // Chuyển hướng đến trang home
            },
          },
        ]);
      } else {
        // Thông tin đăng nhập không đúng
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
          secureTextEntry={!isPasswordVisible} // Hiển thị mật khẩu hoặc ẩn
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!isPasswordVisible)} // Thay đổi trạng thái hiển thị mật khẩu
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"} // Đổi icon khi ẩn hoặc hiện
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

      {/* Log in without password */}
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
    top: 40, // Căn chỉnh nút ở gần phía trên
    left: 20, // Căn chỉnh nút ở gần phía bên trái
    padding: 10,
    zIndex: 1, // Đảm bảo nút luôn nằm trên các phần tử khác
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
    borderColor: "#ffffff", // Màu viền xanh lá
    borderWidth: 1, // Độ dày viền
    borderRadius: 25, // Bo góc tròn
    paddingVertical: 10, // Khoảng cách trên dưới của text
    paddingHorizontal: 20, // Khoảng cách hai bên của text
  },
  linkText: {
    color: "#ffffff", // Màu xanh lá cây cho liên kết
    fontSize: 14,
    textAlign: "center", // Căn giữa
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
});
