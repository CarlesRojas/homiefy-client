import React, { useContext, useEffect, useState } from "react";
import "./Utilities.scss";

import Tab from "components/Tab";
import Utility from "components/Utility";
import Popup from "components/Popup";

// Icons
import AddIcon from "resources/icons/add.svg";

// Contexts
import { Data } from "contexts/Data";
import { API } from "contexts/API";

export default function Utilities() {
    // Contexts
    const { utilities, setUtilities } = useContext(Data);
    const { getUtilities /*, addUtility*/ } = useContext(API);

    // State
    const [showAddPopup, setShowAddPopup] = useState(false);

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
                <Popup show={showAddPopup} setShow={setShowAddPopup}>
                    <div className="contents"></div>
                </Popup>
                <div className="container">{content}</div>
                <div className="add" onClick={() => setShowAddPopup(true)}>
                    <img src={AddIcon} alt="" className="addIcon" />
                </div>
            </div>
        </Tab>
    );
}
