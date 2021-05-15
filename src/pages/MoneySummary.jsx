import React, {useState} from "react";
import "./MoneySummary.scss";

import Tab from "components/Tab";
import { useContext } from "react";
import { API } from "contexts/API";
import UserSummary from "components/UserSummary";
import { useEffect } from "react";

export default function MoneySummary() {

    const {
        getMoneySummary,
    } = useContext(API)

    const [showBalanceWindow, setShowBalanceView] = useState(false);
    const [balanceView, setBalanceView] = useState(null);
    const [centerTxt, setCenterText] = useState(["Total", 0])
    

    //const userSummary = getMoneySummary("Santi");
    const userSummary = {
        "Jaume": {
            "water": 100,
            "electricity": 50,
            "rent": 300,
        },
        "Jia": {
            "water": 0,
            "electricity": 0,
            "rent": 0,
            "debt": -300,
        },
        "Carles": {
            "water": 0,
            "electricity": 150,
            "rent": -20,
        },
        "asdf": {
            "water": -20,
            "electricity": 50,
            "rent": 100,
        },
        "a": {
            "water": -200,
            "electricity": -40,
            "rent": 0,
        },
        "c": {
            "water": 0,
            "electricity": 100,
            "rent": 0,
        },
    };

    const colors = {
        "water": "rgb(57,70,250)",
        "electricity": "rgb(66,255,255)",
        "rent": "rgb(250, 157, 36)",
        "debt": "rgb(241,32,32)"
    }

    const totalPerUser = {}
    Object.keys(userSummary).forEach(key => {
        totalPerUser[key] = Object.values(userSummary[key]).reduce((accumulator, current) => accumulator + current);
    })
    
    const maxAmmount = Math.abs(totalPerUser[Object.keys(userSummary).reduce((a, b) => Math.abs(totalPerUser[a]) > Math.abs(totalPerUser[b]) ? a : b)])
    const usersBalance = []
    var userBalance = 0;
    var positive = 0;
    var negative = 0;

    const closeWindow = () => {
        setBalanceView(null);
        setShowBalanceView(false);
    }

    const showData = (username, key) => {
        setCenterText([ key, userSummary[username][key] ])
    }

    const showTotal = (username) => {
        setCenterText([ "Total", totalPerUser[username] ])
    }

    const viewBalance = (username) => {
        var offset = 0;
        var pie = [];

        showTotal(username)
        const absTotal = Object.values(userSummary[username]).reduce((accumulator, current) => Math.abs(accumulator) + Math.abs(current));
        Object.keys(userSummary[username]).forEach((key) => {
            var pct = (Math.abs(userSummary[username][key]) / absTotal) * 100 ;
            pie.push(
                <div className="segment" style={{
                    "--offset": offset, 
                    "--value": pct, 
                    "--over50": pct > 50 ? 1 : 0, 
                    "--bg": colors[key]
                }} onMouseEnter={() => showData(username, key) }
                onMouseLeave={() => showTotal(username)}/>)
            offset += pct;
        })

        setBalanceView(pie);
        setShowBalanceView(true);
    }

    const balanceWindow = showBalanceWindow 
        ?
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
        : null


    for (const [username, ammount] of Object.entries(totalPerUser)) {
        usersBalance.push(<UserSummary username={username} ammount={ammount} maxAmmount={maxAmmount} callback={viewBalance} key={username}/>)
        userBalance += ammount;
        if (ammount >= 0) positive += ammount;
        else negative += ammount;
    }


    return (
        <Tab>
            <div className="moneySummary">
                <div className="userBalance">
                    <div className="title"> 
                        <div className="text" style={{color: userBalance >= 0 ? "rgb(0, 170, 0)" : "red"}}>{userBalance} €</div>
                    </div>
                    <div className="posNegBalance">
                        <div className="negative">{negative} €</div>
                        <div className="positive">{positive} €</div>
                    </div>
                </div>
                <div className="scrollView">
                    {usersBalance}
                </div>
                {balanceWindow}
            </div>
        </Tab>
    );
}
