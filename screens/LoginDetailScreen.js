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
import axios from "axios"; // Import axios
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Player } from "../PlayerContext";
import { constants } from "../helper/constants";

const LoginDetailScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");

  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(Player);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLogin = async () => {
    // Reset lại thông báo lỗi
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

    // Kiểm tra mật khẩu
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
      try {
        // Gửi request lấy danh sách người dùng
        const usersResponse = await axios.get(`${constants.url}/user`);
        const user = usersResponse.data.content.find((u) => u.email === email);

        // Kiểm tra nếu email không tồn tại
        if (!user) {
          Alert.alert("Error", "Email không tồn tại.");
        } else {
          // Gửi request đăng nhập
          const loginResponse = await axios.post(
            `${constants.url}/user/login`,
            {
              email: email,
              password: password,
            }
          );

          // Kiểm tra trạng thái phản hồi từ API
          if (loginResponse.status === 200) {
            const { accessToken } = loginResponse.data; // Lấy accessToken từ phản hồi
            const { _id } = loginResponse.data.content; // Lấy id của user

            // Lưu accessToken và id vào AsyncStorage
            await AsyncStorage.setItem("accessToken", accessToken);
            await AsyncStorage.setItem("userId", _id); // Lưu id của user

            // Hiển thị thông báo đăng nhập thành công
            Alert.alert("Success", "Login successful!", [
              {
                text: "OK",
                onPress: () => {
                  setIsLoggedIn(true);
                  navigation.navigate("Main");
                },
              },
            ]);
          }
        }
      } catch (error) {
        // Xử lý các lỗi khác nhau dựa vào phản hồi API
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            setErrorMessagePassword("Mật khẩu không chính xác.");
            Alert.alert("Error", "Mật khẩu không chính xác.");
          } else if (status === 404) {
            Alert.alert("Error", "API endpoint không tồn tại.");
          } else {
            Alert.alert("Error", "Có lỗi xảy ra. Vui lòng thử lại.");
          }
        } else {
          // Xử lý lỗi mạng
          Alert.alert(
            "Error",
            "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn."
          );
        }
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

      <Text style={styles.label}>Email</Text>
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
