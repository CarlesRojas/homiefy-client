import React, { createContext, useState, useRef } from "react";

// Profile Pictures
import CarlesImage from "resources/pictures/CarlesImage.png";
import SantiImage from "resources/pictures/SantiImage.png";
import JaumeImage from "resources/pictures/JaumeImage.png";
import JiaImage from "resources/pictures/JiaImage.png";

// Data Context
export const Data = createContext();

const DataProvider = ({ children }) => {
    // Path
    const [currPath, setCurrPath] = useState("/");

    // Utilities
    const [utilities, setUtilities] = useState({});

    // Profile pictures
    const profilePictures = useRef({
        Carles: CarlesImage,
        Santi: SantiImage,
        Jaume: JaumeImage,
        Jia: JiaImage,
    });

    // #################################################
    //   PROVIDE DATA
    // #################################################

    return (
        <Data.Provider
            value={{
                currPath,
                setCurrPath,
                profilePictures,
                utilities,
                setUtilities,
            }}
        >
            {children}
        </Data.Provider>
    );
};

export default DataProvider;
