import React, { useContext, useEffect } from "react";
import "./Utilities.scss";

import Tab from "components/Tab";
import Utility from "components/Utility";

// Icons
import AddIcon from "resources/icons/add.svg";

// Contexts
import { Data } from "contexts/Data";
import { API } from "contexts/API";

export default function Utilities() {
    // Contexts
    const { utilities, setUtilities } = useContext(Data);
    const { getUtilities /*, addUtility*/ } = useContext(API);

    useEffect(() => {
        const loadUtilities = async () => {
            const loadedUtilites = await getUtilities();
            setUtilities(loadedUtilites);
        };

        loadUtilities();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var content = [];
    for (const [key, value] of Object.entries(utilities)) {
        content.push(<Utility key={key} name={key} data={value} />);
    }

    return (
        <Tab>
            <div className="utilities">
                <div className="container">{content}</div>
                <div className="add">
                    <img src={AddIcon} alt="" className="addIcon" />
                </div>
            </div>
        </Tab>
    );
}
