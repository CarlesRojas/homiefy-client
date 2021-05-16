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
import JiaImage from "resources/pictures/JiaImage.png";

// Icons
import AddIcon from "resources/icons/add.svg";

// Components
import Tab from "components/Tab";
import Popup from "components/Popup";

const CardView = ({ postIt, deleteAction, postItList }) => {
    const { profilePictures } = useContext(Data);

    var secondsToDissappear = 60 * 60 * 24 * postIt.period;
    var createdDate = new Date(postIt.createdDate);
    var newDateObj = moment(createdDate).add(secondsToDissappear, "s").toDate();

    // Total seconds
    var dif = newDateObj.getTime() - createdDate.getTime();
    dif = dif / 1000;
    var total = Math.abs(dif);
    // console.log(`[ID ${postIt.uuid}] - Total: ${total}`)

    // Seconds left
    var currentDate = new Date();
    var dif2 = newDateObj.getTime() - currentDate.getTime();
    dif2 = dif2 / 1000;
    var secondsLeft = Math.abs(dif2);

    var daysCompleted = 1 - secondsLeft / total;
    // console.log(`[ID ${postIt.uuid}] - Current step: ${currentStep}`)
    // console.log(`[ID ${postIt.uuid}] - ${secondsLeft}`)

    // Progress bar ref
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (progressBarRef.current) {
            // progressBarRef.current.style.transition = `width ${secondsLeft}s linear`;
            // progressBarRef.current.style.width = "0%";
        }

        // animate again when any post it is deleted
    }, [postItList]);

    useEffect(() => {
        setTimeout(() => {
            deleteAction(postIt.username, postIt.uuid);
        }, secondsLeft * 1000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //var priorityString = "";
    var priorityImage = null;
    if (postIt.priorityType === 0) {
        //priorityString = "Low Priority";
        priorityImage = Electricity;
    } else if (postIt.priorityType === 1) {
        //priorityString = "Medium Priority";
        priorityImage = Water;
    } else {
        //priorityString = "High Priority";
        priorityImage = Rent;
    }

    return (
        <div className="cardViewContent">
            <div className="firstRow">
                <div className="leftContainer">
                    <img src={priorityImage} alt="" className="priorityImg"></img>
                </div>
                <div className="middleContainer">
                    <div className="userPhotoContainer">
                        <img src={JiaImage} alt="" className="userPhoto"></img>
                    </div>
                    <div className="username">
                        <p>{postIt.username}</p>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="people">
                        {postIt.people.map((name, i) => (
                            <img key={i} src={profilePictures.current[name]} alt="" className="profilePicture" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="secondRow">
                <div className="textContent">
                    <p>{postIt.message}</p>
                </div>
            </div>
            <div className="thirdRow">
                <div className="progressBar">
                    <p className="period">{(total / 24 / 60 / 60).toFixed(0)} days</p>
                    <div className="bar" ref={progressBarRef} style={{ width: `${daysCompleted}%` }}></div>
                    <p className="timeLeft">{(secondsLeft / 24 / 60 / 60).toFixed(0)} days left</p>
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
                    return <CardView key={item.uuid} postIt={item} deleteAction={parentDeleteItem} postItList={postItList}></CardView>;
                })}
            </div>
        </div>
    );
};

export default function PostIt() {
    // context
    const { apiGetAllPostIt, apiAddPostIt, apiDeletePostIt } = useContext(API);
    const { profilePictures } = useContext(Data);

    // State
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [postItList, setPostItList] = useState([]);
    // Form states
    const [postItForm, setPostItForm] = useState({ username: "", message: "", priorityType: 0, period: "", people: [] });
    const formTitle = useRef("Low Priority");

    const types = [
        { name: "Low Priority", picture: Electricity },
        { name: "Medium Priority", picture: Water },
        { name: "High Priority", picture: Rent },
    ];

    const getAllPostIt = async () => {
        var data = await apiGetAllPostIt();
        data = data.response;
        console.log(data);
        setPostItList(data);
    };

    useEffect(() => {
        getAllPostIt();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteHandler = async (username, id) => {
        console.log("Deleting " + id);
        var response = await apiDeletePostIt(username, id);
        console.log(response);
        getAllPostIt();
        // setPostItList((oldState) => {
        //     let newItems = oldState.filter((item) => item.uuid !== id);
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
            } else if (name === "priorityType") {
                if (value.includes("Low")) {
                    newValue = 0;
                    formTitle.current = "Low Priority";
                } else if (value.includes("Medium")) {
                    newValue = 1;
                    formTitle.current = "Medium Priority";
                } else {
                    newValue = 2;
                    formTitle.current = "High Priority";
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
        setPostItForm({ username: "", avatar: "", message: "", priorityType: "Low Priority", period: "", people: [] });

        if (!("error" in response)) getAllPostIt();
    };

    return (
        <Tab>
            <div className="postIt">
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

                        <div className="inputContainer" style={{ borderRadius: "5vw" }}>
                            <textarea className="input" placeholder="type some message" name="message" value={postItForm.message} onChange={onPostItFormChange}></textarea>
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
