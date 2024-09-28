import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import Navigation from "./StackNavigator";
import { PlayerContext, Player } from "./PlayerContext";
import { ModalPortal } from "react-native-modals";
import MiniPlayer from "./components/MiniPlayer";
import CurrentSong from "./components/CurrentSong";

export default function App() {
  return (
    <>
      <PlayerContext>
        <Navigation />
        <ModalPortal />
        <MainComponent />
      </PlayerContext>
    </>
  );
}

const MainComponent = () => {
  const { isLoggedIn } = useContext(Player); // Sử dụng PlayerContext ở đây
  const [visible, setVisible] = useState(false);

  const handleMiniPlayerPress = () => {
    setVisible(true); 
  };

  return (
    <>
      {isLoggedIn && !visible && <MiniPlayer onPress={handleMiniPlayerPress} />}
      {/* Hiển thị MiniPlayer nếu đã đăng nhập */}


      <CurrentSong
        visible={visible}
        onClose={() => setVisible(false)}
      />


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
