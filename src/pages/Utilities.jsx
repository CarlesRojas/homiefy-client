import React, { useContext, useEffect, useState } from "react";
import "./Utilities.scss";

import Tab from "components/Tab";
import Utility from "components/Utility";
import Popup from "components/Popup";

// Pictures
import Electricity from "resources/pictures/Electricity.png";
import Water from "resources/pictures/Water.png";
import Rent from "resources/pictures/Rent.png";

// Icons
import AddIcon from "resources/icons/add.svg";

// Contexts
import { Data } from "contexts/Data";
import { API } from "contexts/API";

export default function Utilities() {
    // Contexts
    const { utilities, setUtilities, profilePictures } = useContext(Data);
    const { getUtilities, addUtility } = useContext(API);

    // State
    const [showAddPopup, setShowAddPopup] = useState(false);

    const loadUtilities = async () => {
        const loadedUtilites = await getUtilities();
        setUtilities(loadedUtilites);
    };

    useEffect(() => {
        loadUtilities();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    var content = [];
    for (const [key, value] of Object.entries(utilities)) {
        content.push(<Utility key={key} name={key} data={value} />);
    }

    const types = [
        { name: "Electricity", picture: Electricity },
        { name: "Water", picture: Water },
        { name: "Rent", picture: Rent },
    ];

    // Form states
    const [addForm, setAddForm] = useState({ billType: "Electricity", price: "", people: [], period: "" });

    // When the signup form changes
    const onAddFormChange = (event) => {
        const { name, value } = event.target;

        setAddForm((prevState) => {
            if (name === "price") {
                if (value.length <= 0) var newValue = 0;
                else newValue = parseFloat(value);
            } else if (name === "people") {
                newValue = [...prevState.people];
                var index = newValue.indexOf(value);
                if (index !== -1) newValue.splice(index, 1);
                else newValue.push(value);
            } else if (name === "period") {
                if (value.length <= 0) newValue = 30;
                else newValue = parseInt(value);
            } else newValue = value;

            return { ...prevState, [name]: newValue };
        });
    };

    // When the users tries to sign up
    const onAddForm = async (event) => {
        event.preventDefault();

        const response = await addUtility(addForm.billType, addForm.price, addForm.people, addForm.period);

        setShowAddPopup(false);
        setAddForm({ billType: "Electricity", price: "", people: [], period: "" });

        if (!("error" in response)) loadUtilities();
    };

    return (
        <Tab>
            <div className="utilities">
                <Popup show={showAddPopup} setShow={setShowAddPopup}>
                    <p className="title">{addForm.billType}</p>
                    <form autoComplete="off" noValidate spellCheck="false" onSubmit={onAddForm}>
                        <div className="typeContainer" onChange={onAddFormChange}>
                            {types.map(({ name, picture }, i) => {
                                return (
                                    <React.Fragment key={name}>
                                        <input id={`billType_${name}`} type="radio" name="billType" value={name} defaultChecked={i === 0 ? "checked" : ""} />
                                        <label htmlFor={`billType_${name}`}>
                                            <img src={picture} alt="" className="typeImage" />
                                        </label>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className="inputContainer">
                            <p className="left">-</p>
                            <input
                                className="input"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="price"
                                name="price"
                                value={addForm.price}
                                onChange={onAddFormChange}
                                autoComplete="new-password"
                            ></input>
                            <p className="right">€</p>
                        </div>

                        <div className="peopleContainer" onChange={onAddFormChange}>
                            {Object.keys(profilePictures.current).map((name, i) => {
                                var currPicture = profilePictures.current[name];
                                return (
                                    <React.Fragment key={name}>
                                        <input id={`people_${name}`} type="checkbox" name="people" value={name} />
                                        <label htmlFor={`people_${name}`}>
                                            <img src={currPicture} alt="" className="profileImage" />
                                        </label>
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <div className="inputContainer">
                            <input
                                className="input"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="period"
                                name="period"
                                value={addForm.period}
                                onChange={onAddFormChange}
                                autoComplete="new-password"
                            ></input>
                            <p className="right">days</p>
                        </div>

                        <button type="submit" className="submitButton">
                            Add Utility
                        </button>
                    </form>
                </Popup>

                <p className="mainTitle">Utilities</p>
                <div className="container">{content}</div>
                <div className="add" onClick={() => setShowAddPopup(true)}>
                    <img src={AddIcon} alt="" className="addIcon" />
                </div>
            </div>
        </Tab>
    );
}
