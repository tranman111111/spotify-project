import { createContext, useState } from "react";

const Player = createContext();

const PlayerContext = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    return (
        <Player.Provider value={{ currentTrack, setCurrentTrack, isLoggedIn, setIsLoggedIn }}>
            {children}
        </Player.Provider>
    );
}

export { PlayerContext, Player };
