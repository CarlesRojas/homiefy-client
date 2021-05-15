import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import moment from 'moment';

// Contexts
import { API } from "../contexts/API";
import "./PostIt.scss";

// Icons
import UserIcon from "resources/icons/close.svg";

// Components
import Tab from "components/Tab";

const Header = () => {
    return (
        <div className="header"><h1>Post It</h1></div>
    )
}

const CardView = ({postIt, deleteAction, postItList}) => {
    var secondsToDissappear = 20
    var createdDate = new Date(postIt.createdDate)
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
                    <img src={UserIcon} className="userPhoto"></img>
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
    )
}

const ScrollView = ({postItList, parentDeleteItem}) => {

    return (
        <div className="scrollView">
            <div className="content">
                {postItList.map((item) => {
                    console.log()
                    return (
                        <CardView
                            key={item.id}
                            postIt={item}
                            deleteAction={parentDeleteItem}
                            postItList={postItList}
                        ></CardView>
                    );
                })}
            </div>
        </div>
    );
}

export default function PostIt() {

    // context
    const {apiGetAllPostIt} = useContext(API)

    const [postItList, setPostItList] = useState([])

    const getAllPostIt = async () => {
        var data = await apiGetAllPostIt();
        setPostItList(data);
    }

    useEffect(() => { 
        getAllPostIt()
    }, [])

    const deleteHandler = (id) => {
        setPostItList((oldState) => {
            let newItems = oldState.filter((item) => item.id !== id);
            return newItems
        });
    };

    return (
        <Tab>
            <div className="postIt">
                <Header></Header>
                <ScrollView postItList={postItList} parentDeleteItem={deleteHandler}></ScrollView>
            </div>
        </Tab>
    );
}
