import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import LikedSongScreen from "./screens/LikedSongScreen";
import LoginDetailScreen from "./screens/LoginDetailScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SearchScreen from "./screens/SearchScreen";
import PremiumScreen from "./screens/PremiumScreen";
import ArtistDetailScreen from "./screens/ArtistDetailScreen";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PlaylistGenresScreen from "./screens/PlaylistGenresScreen";
import CheckoutScreen from "./screens/CheckoutScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlaylistGenres" component={PlaylistGenresScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LikedSong" component={LikedSongScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlaylistGenres" component={PlaylistGenresScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
}

function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LikedSong" component={LikedSongScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}


function PremiumStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Premium" component={PremiumScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.7)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 4,
          shadowOffset: { width: 0, height: -4 },
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? <Entypo name="home" size={24} color="white" /> : <AntDesign name="home" size={24} color="white" />,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? <Ionicons name="search" size={24} color="white" /> : <Ionicons name="search-outline" size={24} color="white" />,
        }}
      />
      <Tab.Screen
        name="LibraryStack"
        component={LibraryStack}
        options={{
          tabBarLabel: "Your Library",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? <Ionicons name="person" size={24} color="white" /> : <Ionicons name="person-outline" size={24} color="white" />,
        }}
      />
      <Tab.Screen
        name="PremiumStack"
        component={PremiumStack}
        options={{
          tabBarLabel: "Premium",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? <Ionicons name="card" size={24} color="white" /> : <Ionicons name="card-outline" size={24} color="white" />,
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpDetail" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginDetail" component={LoginDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;