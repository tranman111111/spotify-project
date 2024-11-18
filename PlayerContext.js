import { createContext, useState } from "react";

// Tạo Player context
const Player = createContext();

const PlayerContext = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thay đổi giá trị khởi tạo để dễ quản lý
  const [playlist, setPlaylist] = useState([]);

  const [gradientColors, setGradientColors] = useState(["#B55239", "#000000"]);
  const [lyricsBackgroundColor, setLyricsBackgroundColor] = useState("#B55239");

  const [isCheckOut, setIsCheckout] = useState(false);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Hàm để thay đổi màu sắc ngẫu nhiên cho gradient và lyrics
  const changeColors = () => {
    color = getRandomColor();
    setGradientColors([color, "#000000"]); // Giữ màu đen cho phần gradient thứ hai
    setLyricsBackgroundColor(color);
  };

  // Gọi hàm changeColors mỗi khi bài hát thay đổi
  const updateTrack = (track) => {
    setCurrentTrack(track);
    changeColors(); // Thay đổi màu sắc mỗi khi cập nhật track
  };

  return (
    <Player.Provider
      value={{
        currentTrack,
        setCurrentTrack: updateTrack,
        isLoggedIn,
        setIsLoggedIn,
        playlist,
        setPlaylist,
        gradientColors,
        lyricsBackgroundColor,
        setIsCheckout,
        isCheckOut
      }}
    >
      {children}
    </Player.Provider>
  );
};

export { PlayerContext, Player };
