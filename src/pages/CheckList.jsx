import React, { useContext, useState, useEffect } from 'react'
import "./CheckList.scss"

import Tab from 'components/Tab'
import Popup from 'components/Popup';

// Icons
import AddIcon from "resources/icons/add.svg";


import { API } from "contexts/API";
import { Data } from 'contexts/Data';

export default function CheckList() {


    const { getCheckList, postCheckList } = useContext(API);
    const { profilePictures } = useContext(Data);

    const [checkList, setCheckList] = useState([])
    const [showAddPopup, setShowAddPopup] = useState(false);

    const [addForm, setAddForm] = useState({
        name: "",
        people: [],
        price: "",
    })

    
    const callAPI = async () => {
        const response = await getCheckList();
        setCheckList(response["response"]);
    };
    
    useEffect(() => {
        callAPI();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAddFormChange = (event) => {
        const { name, value } = event.target;
        console.log( name, value )

        setAddForm((prevState) => {
            if (name === "price") {
                if (value.length <= 0) var newValue = 0;
                else newValue = parseFloat(value);
            } else if (name === "people") {
                newValue = [...prevState.people];
                var index = newValue.indexOf(value);
                if (index !== -1) newValue.splice(index, 1);
                else newValue.push(value);
            } else newValue = value;

            return { ...prevState, [name]: newValue };
        });
       
    };

    const onAddForm = async (event) => {
        event.preventDefault();

        const response = await postCheckList(addForm.name, addForm.people, addForm.price);

        setShowAddPopup(false);
        setAddForm({ 
            name: "",
            people: [],
            price: "",
        })
        
        if (!("error" in response)) callAPI();
    }

    const products = <React.Fragment>
        {checkList.map((product, i) => (
            <div className={ i === 0 ? "product first" : "product"}  key={product["uuid"]}>
                <div className="content">
                    <div className="check">
                    </div>
                    <div className="description">
                        <div className="nameContainer">
                            <div className="name">{product["name"]}</div>
                            <div className="price">{product["price"]} €</div>
                        </div>
                        <div className="people">
                            {product["people"].map((person, i) => (
                                <img key={i} src={profilePictures.current[person]} alt="" className="profilePicture" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </React.Fragment>

    const addProducts = <React.Fragment>
        <Popup show={showAddPopup} setShow={setShowAddPopup}>
            <p className="title">Add new product</p>
            <form autoComplete="off" noValidate spellCheck="false" onSubmit={onAddForm}>
                <div className="inputContainer">
                    <input
                        className="input"
                        type="text"
                        placeholder="name"
                        name="name"
                        value={addForm.name}
                        onChange={onAddFormChange}
                        autoComplete="new-password"
                    ></input>
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
                <button type="submit" className="submitButton">
                    Add Product
                </button>
            </form>

        </Popup>
    </React.Fragment>

    return (
        <Tab>
            <div className="checkList">
                {products}
                <div className="add" onClick={() => setShowAddPopup(true)}>
                    <img src={AddIcon} alt="" className="addIcon" />
                </div>
                {addProducts}
            </div>
        </Tab>
    )
}