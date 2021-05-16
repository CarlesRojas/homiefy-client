import React, { useState, useEffect, useRef, useContext } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./MoneySummary.scss";

import Tab from "components/Tab";
import { API } from "contexts/API";
import { Data } from "contexts/Data";
import UserSummary from "components/UserSummary";

import Popup from "components/Popup";

export default function MoneySummary() {
    const { getMoneySummary, USER } = useContext(API);
    const { colors } = useContext(Data);

    const [centerTxt, setCenterText] = useState(["Total", 0]);

    const [userSummary, setUserSummary] = useState({});
    const lastSelected = useRef(-1);

    const totalPerUser = {};
    Object.keys(userSummary).forEach((key) => {
        totalPerUser[key] = Object.values(userSummary[key]).reduce((accumulator, current) => accumulator + current);
    });

    const maxAmmount =
        Object.keys(userSummary).length <= 0 ? 0 : Math.abs(totalPerUser[Object.keys(userSummary).reduce((a, b) => (Math.abs(totalPerUser[a]) > Math.abs(totalPerUser[b]) ? a : b))]);
    const usersBalance = [];
    var userBalance = 0;
    var positive = 0;
    var negative = 0;

    const [pieData, setPieData] = useState([]);

    // State
    const [showAddPopup, setShowAddPopup] = useState(false);

    const viewBalance = (username) => {
        const currentSummary = userSummary[username];

        var tempArray = [];
        for (const [name, value] of Object.entries(currentSummary)) {
            tempArray.push({
                title: name,
                value: Math.abs(value),
                color: colors.current[name],
                trueValue: value,
                username: username,
            });
        }

        setCenterText(["Total", totalPerUser[username]]);
        setPieData(tempArray);
        setShowAddPopup(true);
    };

    var i = 0;
    for (const [username, ammount] of Object.entries(totalPerUser)) {
        i++;
        usersBalance.push(<UserSummary key={`${username}_${i}`} username={username} ammount={ammount} maxAmmount={maxAmmount} callback={viewBalance} />);
        userBalance += ammount;
        if (ammount >= 0) positive += ammount;
        else negative += ammount;
    }

    const callAPI = async () => {
        const response = await getMoneySummary(USER);

        setUserSummary(response);
    };

    useEffect(() => {
        callAPI();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSegment = (event, segmentIndex) => {
        var data = pieData[segmentIndex];
        if (segmentIndex === lastSelected.current) {
            lastSelected.current = -1;
            setCenterText(["Total", totalPerUser[data["username"]]]);
        } else if (segmentIndex !== -1) {
            lastSelected.current = segmentIndex;
            setCenterText([data["title"], data["trueValue"]]);
        } else {
            lastSelected.current = segmentIndex;
            setCenterText([data["title"], data["trueValue"]]);
        }
    };

    const getSegmentStyle = (segmentIndex) => {
        if (segmentIndex === lastSelected.current) {
            return { strokeWidth: "3.3rem", transition: "stroke-width 0.2s ease-in-out" };
        } else {
            return { strokeWidth: "2.75rem", transition: "stroke-width 0.2s ease-in-out" };
        }
    };

    useEffect(() => {
        lastSelected.current = -1;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showAddPopup]);

    return (
        <Tab>
            <div className="moneySummary">
                <div className="userBalance">
                    <div className="title">
                        <div className="text" style={{ color: userBalance >= 0 ? "#84ff84" : "#ff8563" }}>
                            {userBalance.toFixed(2)} €
                        </div>
                    </div>
                    <div className="posNegBalance">
                        <div className="negative">{negative.toFixed(2)} €</div>
                        <div className="positive">{positive.toFixed(2)} €</div>
                    </div>
                </div>
                <div className="scrollView">{usersBalance}</div>

                <Popup show={showAddPopup} setShow={setShowAddPopup}>
                    <div className="balanceContainer">
                        <p className="title">Balance</p>

                        <div className="pieContainer">
                            <PieChart
                                data={pieData}
                                onClick={(event, segmentIndex) => onSegment(event, segmentIndex)}
                                startAngle={-90}
                                segmentsStyle={getSegmentStyle}
                                style={{ overflow: "visible" }}
                            />
                            <div className="center">
                                <div className="centerTitle">{centerTxt[0]}</div>
                                <div className="text">{centerTxt[1]} €</div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </div>
        </Tab>
    );
}
