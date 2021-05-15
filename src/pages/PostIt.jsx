import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";

// Contexts
import { API } from "../contexts/API";
import "./PostIt.scss";

// Icons
import UserIcon from "resources/icons/close.svg";

// Components
import Tab from "components/Tab";
import ProgressBar from "components/ProgressBar";

const Header = () => {
    return (
        <div className="header">
            <h1>Post It</h1>
        </div>
    );
};

const CardView = ({ postIt, deleteAction }) => {
    const [completed, setCompleted] = useState(0);

    var createdDate = new Date(postIt.createdDate);
    var newDateObj = moment(createdDate).add(30, "s").toDate();

    var dif = newDateObj.getTime() - createdDate.getTime();
    dif = dif / 1000;
    var secBtwCreatedAndEndDate = Math.abs(dif);
    var chunkSize = 100 / secBtwCreatedAndEndDate;
    console.log(`[ID ${postIt.id}] - Total: ${secBtwCreatedAndEndDate}`);

    var currentDate = new Date();
    var dif2 = currentDate.getTime() - createdDate.getTime();
    dif2 = dif2 / 1000;
    var currentStep = Math.abs(dif2);
    console.log(`[ID ${postIt.id}] - Current step: ${currentStep}`);

    const count = useRef(chunkSize * currentStep);
    const timer = useRef(null);
    useEffect(() => {
        timer.current = setInterval(() => {
            count.current = count.current + chunkSize;
            console.log(`[ID ${postIt.id}] - Iterator (%): ${count.current}`);
            if (count.current >= 100) {
                // Delete the post it
                count.current = 0;
                setCompleted(count.current);
                clearInterval(timer.current);
                console.log(`[ID ${postIt.id}] - Completed!`);
                deleteAction(postIt.id);
            } else {
                setCompleted(count.current);
            }
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <ProgressBar bgcolor={"#6a1b9a"} completed={completed} />
            </div>
        </div>
    );
};

const ScrollView = ({ postItList, parentDeleteItem }) => {
    return (
        <div className="scrollView">
            <div className="content">
                {postItList.map((item) => {
                    return <CardView key={item.id} postIt={item} deleteAction={parentDeleteItem}></CardView>;
                })}
            </div>
        </div>
    );
};

export default function PostIt() {
    // context
    const { apiGetAllPostIt } = useContext(API);

    const [postItList, setPostItList] = useState([]);

    const getAllPostIt = async () => {
        var data = await apiGetAllPostIt();
        setPostItList(data);
    };

    useEffect(() => {
        getAllPostIt();
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteHandler = (id) => {
        let newItems = postItList.filter((item) => item.id !== id);
        setPostItList(newItems);
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
