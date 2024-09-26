import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1, // Đảm bảo nằm trên ScrollView
          backgroundColor: "#040306", // Đảm bảo có màu nền để phân biệt với nội dung bên dưới
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: "cover",
            }}
            source={require("../assets/ava.jpg")}
          />
          <View
            style={{
              marginHorizontal: 12,
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#1ED760",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Text style={styles.textActive}>All</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Text style={styles.text}>Music</Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#282828",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Text style={styles.text}>Podcasts</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginTop: 60, marginLeft: 10, marginRight: 10 }}>
        <View style={{ height: 10 }} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4, // Bo góc 4
              elevation: 3,

              marginHorizontal: 5, // Giảm khoảng cách ngang
              marginVertical: 5, // Giảm khoảng cách dọc
            }}
          >
            <LinearGradient
              colors={["#33006F", "#FFFFFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            >
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4, // Bo góc 4
              elevation: 3,

              marginHorizontal: 5, // Giảm khoảng cách ngang
              marginVertical: 5, // Giảm khoảng cách dọc
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }} // Không bo góc bên phải
              source={{ uri: "https://i.pravatar.cc/100" }}
            />
            <View>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Hiphop Tamhiza
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4, // Bo góc 4
              elevation: 3,
              marginHorizontal: 5, // Giảm khoảng cách ngang
              marginVertical: 2, // Giảm khoảng cách dọc
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 55,
                    height: 55,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  }} // Không bo góc bên phải
                  source={{ uri: "https://i.pravatar.cc/97" }}
                />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Nee Singam Dhan
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4, // Bo góc 4
              elevation: 3,
              marginHorizontal: 5, // Giảm khoảng cách ngang
              marginVertical: 2, // Giảm khoảng cách dọc
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }} // Không bo góc bên phải
              source={{ uri: "https://i.pravatar.cc/95" }}
            />
            <View>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Guzarish
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4, // Bo góc 4
              elevation: 3,
              marginHorizontal: 5, // Giảm khoảng cách ngang
              marginVertical: 2, // Giảm khoảng cách dọc
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 55,
                    height: 55,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  }} // Không bo góc bên phải
                  source={{ uri: "https://i.pravatar.cc/97" }}
                />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Nee Singam Dhan
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4, // Bo góc 4
              elevation: 3,
              marginHorizontal: 5, // Giảm khoảng cách ngang
              marginVertical: 2, // Giảm khoảng cách dọc
            }}
          >
            <Image
              style={{
                width: 55,
                height: 55,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }} // Không bo góc bên phải
              source={{ uri: "https://i.pravatar.cc/95" }}
            />
            <View>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Guzarish
              </Text>
            </View>
          </View>
        </View>

        {/* <FlatList   
          data={recentlyplayed}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        /> */}

        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Your Top Artists
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/49" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Pritram
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/45" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Sonunigam
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
        </ScrollView>

        <View style={{ height: 10 }} />

        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Your Top Artists
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/49" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Pritram
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/45" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Sonunigam
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
        </ScrollView>
        {/* <FlatList
          data={recentlyplayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecentlyPlayedCard item={item} key={index} />
          )}
        /> */}

        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Your Top Artists
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/49" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Pritram
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/45" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Sonunigam
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
        </ScrollView>

        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Recently Played
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/49" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Pritram
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/45" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Sonunigam
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Image
              style={{ width: 130, height: 130, borderRadius: 5 }}
              source={{ uri: "https://i.pravatar.cc/40" }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#989898",
                marginTop: 10,
              }}
            >
              Armaan malik
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textActive: {
    color: "black",
  },

  text: {
    color: "white",
  },
});
