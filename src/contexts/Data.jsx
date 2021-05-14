import React, { createContext, useState } from "react";

// Data Context
export const Data = createContext();

const DataProvider = ({ children }) => {
    // #################################################
    //   EXAMPLE
    // #################################################

    const [testState, setTestState] = useState(false);

    // #################################################
    //   PROVIDE DATA
    // #################################################

    return (
        <Data.Provider
            value={{
                // EXAMPLE
                testState,
                setTestState,
            }}
        >
            {children}
        </Data.Provider>
    );
};

export default DataProvider;
