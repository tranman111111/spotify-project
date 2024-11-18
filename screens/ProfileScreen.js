import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Import axios
import { constants } from "../helper/constants";
import * as ImagePicker from "expo-image-picker"; // Sử dụng expo-image-picker

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [accessToken1, setAccessToken1] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [image, setImage] = useState(null); // State cho ảnh đại diện
  const [currentPhone, setCurrentPhone] = useState(""); // State cho số điện thoại hiện tại
  const [currentUsername, setCurrentUsername] = useState(""); // State cho tên người dùng hiện tại
  const [currentPassword, setCurrentPassword] = useState(""); // State cho mật khẩu hiện tại

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Lấy userId, accessToken từ AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };

    const fetchAccessToken = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      setAccessToken1(accessToken);
    };

    fetchUserId();
    fetchAccessToken();
  }, []);

  // Lấy thông tin người dùng từ API
  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${constants.url}/user/${userId}`);
        setUserData({
          username: response.data.content.username,
          email: response.data.content.email,
          phone: response.data.content.phone,
          password: response.data.content.password,
        });
        setCurrentPhone(response.data.content.phone); // Lưu số điện thoại hiện tại
        setCurrentUsername(response.data.content.username); // Lưu tên người dùng hiện tại
        setCurrentPassword(response.data.content.password); // Lưu mật khẩu hiện tại
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Hàm xử lý khi nhấn nút Cập nhật
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);

      // Kiểm tra tên người dùng mới, nếu không có thì dùng tên người dùng hiện tại
      const usernameToUpdate = userData.username || currentUsername; 
      formData.append("username", usernameToUpdate);

      // Kiểm tra số điện thoại mới, nếu không có thì dùng số điện thoại hiện tại
      const phoneToUpdate = userData.phone || currentPhone; 
      formData.append("phone", phoneToUpdate);

      // Kiểm tra mật khẩu mới, nếu không có thì dùng mật khẩu hiện tại
      const passwordToUpdate = userData.password || currentPassword; 
      formData.append("password", passwordToUpdate);

      // Nếu có ảnh, thêm nó vào formData
      if (image) {
        formData.append("image", {
          uri: image.uri,
          type: "image/jpeg", // Hoặc "image/png", tùy vào định dạng ảnh
          name: "avatar.jpg", // Tên ảnh
        });
      }

      await axios.put(`${constants.url}/user/update-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken1}`,
        },
      });

      Alert.alert("Cập nhật thành công!", "Thông tin đã được cập nhật.");
      navigation.navigate("Main"); // Điều hướng đến trang Main
    } catch (error) {
      console.error(error);
      Alert.alert("Cập nhật thất bại", "Vui lòng thử lại sau.");
    }
  };

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // Lưu ảnh đã chọn vào state
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backButton}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Profile</Text>
      </View>

      {/* Email - Không thay đổi */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={userData.email}
        editable={false}
        selectTextOnFocus={false}
      />

      {/* Username */}
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={userData.username}
        onChangeText={(text) => setUserData({ ...userData, username: text })}
        placeholderTextColor="#888"
      />

      {/* Phone */}
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={userData.phone}
        onChangeText={(text) => setUserData({ ...userData, phone: text })}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#888"
      />

      {/* Password */}
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true} // Ẩn mật khẩu khi nhập
        onChangeText={(text) => setUserData({ ...userData, password: text })}
        placeholder="Nhập mật khẩu mới"
        placeholderTextColor="#888"
      />

      {/* Hiển thị ảnh đại diện */}
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}

      {/* Nút chọn ảnh */}
      <Button title="Chọn ảnh" onPress={pickImage} color="#1e90ff" />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdateProfile}
      >
        <Text style={{ color: "#ffffff", textAlign: "center", padding: 10 }}>
          Cập nhật
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: "#1e90ff",
    marginRight: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#ffffff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: "#ffffff",
    backgroundColor: "#222",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  updateButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
