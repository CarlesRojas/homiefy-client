import React, { createContext, useState } from "react";

// Data Context
export const Data = createContext();

const DataProvider = ({ children }) => {
    const [currPath, setCurrPath] = useState("/");

    // #################################################
    //   PROVIDE DATA
    // #################################################

    return (
        <Data.Provider
            value={{
                currPath,
                setCurrPath,
            }}
        >
            {children}
        </Data.Provider>
    );
};

export default DataProvider;
