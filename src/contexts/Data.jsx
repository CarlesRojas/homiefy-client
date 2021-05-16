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

    const colors = useRef({
        Water: "#4a9eed",
        Electricity: "#edde4d",
        Rent: "#71c24e",
        Debt: "#fb6523",
        Restaurant: "#f261ff",
        Food: "#b8ff3c",
        Movies: "#61f3ff",
        Shopping: "#c72cee",
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
                colors,
            }}
        >
            {children}
        </Data.Provider>
    );
};

export default DataProvider;
