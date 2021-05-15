import React from "react";
import "./MoneySummary.scss";

import Tab from "components/Tab";
import { useContext } from "react";
import { API } from "contexts/API";
import UserSummary from "components/UserSummary";

export default function MoneySummary() {

    const {
        getMoneySummary,
    } = useContext(API)

    //const userSummary = getMoneySummary("Santi");
    const userSummary = {
        "Jaume": 100,
        "Jia": 200,
        "Carles": -300,
        "asdf": 1,
        "a": 2,
        "c": -1,
    };

    

    
    var maxAmmount = Math.abs(userSummary[Object.keys(userSummary).reduce((a, b) => Math.abs(userSummary[a]) > Math.abs(userSummary[b]) ? a : b)])
    const usersBalance = []
    for (const [username, ammount] of Object.entries(userSummary)) {
        usersBalance.push(<UserSummary username={username} ammount={ammount} key={username} maxAmmount={maxAmmount}/>)
    }

    return (
        <Tab>
            <div className="moneySummary">
                <div className="scrollView">
                    {usersBalance}
                </div>
            </div>
        </Tab>
    );
}
