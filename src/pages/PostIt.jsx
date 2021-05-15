import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";

// Contexts
import { API } from "../contexts/API";
import { Data } from "../contexts/Data";
import "./PostIt.scss";

// Pictures
import Electricity from "resources/pictures/Electricity.png";
import Water from "resources/pictures/Water.png";
import Rent from "resources/pictures/Rent.png";


// Icons
import UserIcon from "resources/icons/close.svg";
import AddIcon from "resources/icons/add.svg";

// Components
import Tab from "components/Tab";
import Popup from "components/Popup";

const Header = () => {
    return (
        <div className="header">
            <h1>Post It</h1>
        </div>
    );
};

const CardView = ({postIt, deleteAction, postItList}) => {
    var secondsToDissappear = 60
    // var createdDate = new Date(postIt.createdDate)
    var createdDate = moment(new Date()).subtract(Math.floor(Math.random() * 30) + 1, 's').toDate();
    var newDateObj = moment(createdDate).add(secondsToDissappear, 's').toDate();
    
    // Total seconds
    var dif = newDateObj.getTime() - createdDate.getTime();
    var dif = dif / 1000;
    var total = Math.abs(dif);
    // console.log(`[ID ${postIt.id}] - Total: ${total}`)

    // Seconds left
    var currentDate = new Date()
    var dif2 = newDateObj.getTime() - currentDate.getTime();
    dif2 = dif2 / 1000;
    var secondsLeft = Math.abs(dif2);
    // console.log(`[ID ${postIt.id}] - Current step: ${currentStep}`)
    // console.log(`[ID ${postIt.id}] - ${secondsLeft}`)

    // Progress bar ref
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (progressBarRef.current) {
            progressBarRef.current.style.transition = `width ${secondsLeft}s linear`;
            progressBarRef.current.style.width = "0%";
        }

        // animate again when any post it is deleted
    }, [postItList]);

    useEffect(() => {
        setTimeout(() => {
            deleteAction(postIt.id)
        }, secondsLeft * 1000);
        
    }, [])

    return (
        <div className="cardViewContent">
            <div className="firstRow">
                <div className="userPhotoContainer">
                    <img src={UserIcon} alt="" className="userPhoto"></img>
                </div>
                <div className="username">
                    <p>{postIt.username}</p>
                </div>
            </div>
            <div className="secondRow">
                <div className="textContent">
                    <p>{postIt.message}</p>
                </div>
            </div>
            <div className="thirdRow">
                <div className="progressBar">
                    {/* <p className="period">{total} seconds</p> */}
                    <div className="bar" ref={progressBarRef} style={{ width: `${(secondsLeft / total) * 100}%`}}></div>
                    {/* <p className="timeLeft">{secondsLeft} seconds left</p> */}
                </div>
            </div>
        </div>
    );
};

const ScrollView = ({ postItList, parentDeleteItem }) => {
    return (
        <div className="scrollView">
            <div className="content">
                {postItList.map((item) => {
                    return (
                        <CardView
                            key={item.uuid}
                            postIt={item}
                            deleteAction={parentDeleteItem}
                            postItList={postItList}
                        ></CardView>
                    );
                })}
            </div>
        </div>
    );
};

export default function PostIt() {
    // context
    const { apiGetAllPostIt, apiAddPostIt, deletePostIt } = useContext(API);
    const { utilities, setUtilities, profilePictures } = useContext(Data);
    
    // State
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [postItList, setPostItList] = useState([]);
    // Form states
    const [postItForm, setPostItForm] = useState({ username: "", message: "", priorityType: 0, period: "", people: []});
    const formTitle = useRef("Low Priority")

    const types = [
        { name: "Low Priority", picture: Electricity },
        { name: "Medium Priority", picture: Water },
        { name: "High Priority", picture: Rent },
    ];

    const getAllPostIt = async () => {
        var data = await apiGetAllPostIt();
        data = data.response
        console.log(data)
        setPostItList(data);
    }

    useEffect(() => { 
        getAllPostIt()
    }, [])

    const deleteHandler = (id) => {
        deletePostIt(id)
        getAllPostIt()
        // setPostItList((oldState) => {
        //     let newItems = oldState.filter((item) => item.id !== id);
        //     return newItems
        // });
    };

    // When the add form changes
    const onPostItFormChange = (event) => {
        const { name, value } = event.target;

        setPostItForm((prevState) => {
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
            } else if (name == "priorityType") {
                if (value.includes("Low")) {
                    newValue = 0
                    formTitle.current = "Low Priority"
                } else if (value.includes("Medium")) {
                    newValue = 1
                    formTitle.current = "Medium Priority"
                } else {
                    newValue = 2
                    formTitle.current = "High Priority"
                }
            } else newValue = value;

            return { ...prevState, [name]: newValue };
        });
    };

    // When the users tries to add post it
    const onPostItForm = async (event) => {
        event.preventDefault();

        const response = await apiAddPostIt(postItForm.username, postItForm.message, postItForm.priorityType, postItForm.people, postItForm.period);

        setShowAddPopup(false);
        setPostItForm({ username: "", avatar: "", message: "", priorityType: "Low Priority", period: "", people: []});

        if (!("error" in response)) getAllPostIt();
    };

    return (
        <Tab>
            <div className="postIt">
                <Header></Header>
                <ScrollView postItList={postItList} parentDeleteItem={deleteHandler}></ScrollView>
                <Popup show={showAddPopup} setShow={setShowAddPopup}>
                    <p className="title">{formTitle.current}</p>
                    <form autoComplete="off" noValidate spellCheck="false" onSubmit={onPostItForm}>
                        <div className="priorityContainer" onChange={onPostItFormChange}>
                            {types.map(({ name, picture }, i) => {
                                return (
                                    <React.Fragment key={name}>
                                        <input id={`priorityType_${name}`} type="radio" name="priorityType" value={name} defaultChecked={i === 0 ? "checked" : ""} />
                                        <label htmlFor={`priorityType_${name}`}>
                                            <img src={picture} alt="" className="typeImage" />
                                        </label>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        <div className="inputContainer" style={{borderRadius: "5vw"}}>
                            <textarea
                                className="input"
                                placeholder="type some message"
                                name="message"
                                value={postItForm.message}
                                onChange={onPostItFormChange}
                            ></textarea>
                        </div>

                        <div className="peopleContainer" onChange={onPostItFormChange}>
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
                                value={postItForm.period}
                                onChange={onPostItFormChange}
                                autoComplete="new-password"
                            ></input>
                            <p className="right">days</p>
                        </div>

                        <button type="submit" className="submitButton">
                            Add Post-It
                        </button>
                    </form>
                </Popup>
                <div className="add" onClick={() => setShowAddPopup(true)}>
                    <img src={AddIcon} alt="" className="addIcon" />
                </div>
            </div>
        </Tab>
    );
}
