import React, { useState } from "react";
import "./MoneySummary.scss";

import Tab from "components/Tab";
import { useContext } from "react";
import { API } from "contexts/API";
import UserSummary from "components/UserSummary";
import { useEffect } from "react";

export default function MoneySummary() {
    const { getMoneySummary, USER } = useContext(API);

    const [showBalanceWindow, setShowBalanceView] = useState(false);
    const [balanceView, setBalanceView] = useState(null);
    const [centerTxt, setCenterText] = useState(["Total", 0]);

    const [userSummary, setUserSummary] = useState({});

    const colors = {
        water: "rgb(57,70,250)",
        electricity: "rgb(66,255,255)",
        rent: "rgb(250, 157, 36)",
        debt: "rgb(241,32,32)",
    };

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

    const closeWindow = () => {
        setBalanceView(null);
        setShowBalanceView(false);
    };

    const showData = (username, key) => {
        console.log(key);
        setCenterText([key, userSummary[username][key]]);
    };

    const showTotal = (username) => {
        setCenterText(["Total", totalPerUser[username]]);
    };

    const viewBalance = (username) => {
        var offset = 0;
        var pie = [];

        showTotal(username);
        const absTotal = Object.values(userSummary[username]).reduce((accumulator, current) => Math.abs(accumulator) + Math.abs(current));
        Object.keys(userSummary[username]).forEach((key) => {
            var pct = (Math.abs(userSummary[username][key]) / absTotal) * 100;
            pie.push(
                pct <= 50 ? (
                    <div
                        className="segment"
                        style={{
                            "--offset": offset,
                            "--value": pct,
                            "--bg": colors[key],
                        }}
                        key={`${username}_${key}`}
                        onMouseEnter={() => showData(username, key)}
                        onPointerEnter={() => showData(username, key)}
                        onPointerDown={() => showData(username, key)}
                        onMouseLeave={() => showTotal(username)}
                        onPointerLeave={() => showTotal(username)}
                    />
                ) : (
                    <React.Fragment key={`${username}_${key}`}>
                        <div
                            className="segment"
                            style={{
                                "--offset": offset,
                                "--value": 50,
                                "--bg": colors[key],
                            }}
                            onMouseEnter={() => showData(username, key)}
                            onPointerEnter={() => showData(username, key)}
                            onPointerDown={() => showData(username, key)}
                            onMouseLeave={() => showTotal(username)}
                            onPointerLeave={() => showTotal(username)}
                        />
                        <div
                            className="segment"
                            style={{
                                "--offset": offset + pct - 50,
                                "--value": 50,
                                "--bg": colors[key],
                            }}
                            onMouseEnter={() => showData(username, key)}
                            onPointerEnter={() => showData(username, key)}
                            onPointerDown={() => showData(username, key)}
                            onMouseLeave={() => showTotal(username)}
                            onPointerLeave={() => showTotal(username)}
                        />
                    </React.Fragment>
                )
            );
            offset += pct;
        });

        setBalanceView(pie);
        setShowBalanceView(true);
    };

    const balanceWindow = showBalanceWindow ? (
        <div className="balance" onClick={() => closeWindow()}>
            <div className="window">
                <div className="pie">
                    {balanceView}
                    <div className="center">
                        <div className="text">{centerTxt[0]}</div>
                        <div className="text">{centerTxt[1]} €</div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

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

        console.log(response);
        setUserSummary(response);
    };

    useEffect(() => {
        callAPI();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Tab>
            <div className="moneySummary">
                <div className="userBalance">
                    <div className="title">
                        <div className="text" style={{ color: userBalance >= 0 ? "rgb(0, 170, 0)" : "red" }}>
                            {userBalance} €
                        </div>
                    </div>
                    <div className="posNegBalance">
                        <div className="negative">{negative} €</div>
                        <div className="positive">{positive} €</div>
                    </div>
                </div>
                <div className="scrollView">{usersBalance}</div>
                {balanceWindow}
            </div>
        </Tab>
    );
}
