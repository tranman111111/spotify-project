import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import Navigation from "./StackNavigator";
import { PlayerContext, Player } from "./PlayerContext"; // Import PlayerContext và Player
import { ModalPortal } from "react-native-modals";
import MiniPlayer from "./components/MiniPlayer";
import CurrentSong from "./components/CurrentSong";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51LkOKmL1WZJejUHaCqWaCd7fJvgwjBb3EtwMbIqv5FNr7zTuffVNFsyHjMw29OxfMDFYEyElQzJIshR6nsYb57Yz00dhOaT8R6">
      <PlayerContext>
        <Navigation />
        <ModalPortal />
        <MainComponent />
      </PlayerContext>
    </StripeProvider>
  );
}

const MainComponent = () => {
  const { isLoggedIn, currentTrack , isCheckOut} = useContext(Player); // Lấy thông tin từ PlayerContext
  const [visible, setVisible] = useState(false);

  const handleMiniPlayerPress = () => {
    setVisible(true);
  };

  return (
    <>
      {currentTrack && isLoggedIn && !visible && !isCheckOut && (
        <MiniPlayer dataSong={currentTrack} onPress={handleMiniPlayerPress} />
      )}
      {/* Hiển thị MiniPlayer nếu đã đăng nhập */}

      {currentTrack && isLoggedIn && !isCheckOut && (
        <CurrentSong
          dataSong={currentTrack}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
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
