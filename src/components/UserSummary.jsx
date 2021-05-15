import React, { useContext } from "react";
import "./UserSummary.scss";

import { Data } from "contexts/Data";

export default function UserSummary(props) {
    const { profilePictures } = useContext(Data);

    const { username, ammount, maxAmmount, callback } = props;

    const width = Math.max((Math.abs(ammount) * 75) / maxAmmount, 10);

    const right =
        ammount >= 0 ? (
            <React.Fragment>
                <div className="line" style={{ width: width + "%" }} />
                <div className="iconDiv">
                    <img src={profilePictures.current[username]} alt="" className="icon" onClick={() => callback(username)} />
                </div>
            </React.Fragment>
        ) : (
            <div className="value">{ammount.toFixed(2)} €</div>
        );

    const left =
        ammount < 0 ? (
            <React.Fragment>
                <div className="iconDiv">
                    <img src={profilePictures.current[username]} alt="" className="icon" onClick={() => callback(username)} />
                </div>
                <div className="line" style={{ width: width + "%" }} />
            </React.Fragment>
        ) : (
            <div className="value">{ammount.toFixed(2)} €</div>
        );

    return (
        <div className="userSummary">
            <div className="inner left">{left}</div>
            <div className="inner right">{right}</div>
            <div className="separator" />
        </div>
    );
}
