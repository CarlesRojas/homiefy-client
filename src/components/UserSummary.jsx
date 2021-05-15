import React from "react";
import "./UserSummary.scss";

export default function UserSummary(props) {
    const username = props.username;
    const ammount = props.ammount;

    const width = Math.max((Math.abs(ammount) * 75) / props.maxAmmount, 10);

    const right =
        ammount >= 0 ? (
            <React.Fragment>
                <div className="line" style={{ width: width + "%" }} />
                <div className="iconDiv">
                    <div className="icon" onClick={() => props.callback(username)} />
                </div>
            </React.Fragment>
        ) : (
            <div className="value">{ammount} €</div>
        );

    const left =
        ammount < 0 ? (
            <React.Fragment>
                <div className="iconDiv">
                    <div className="icon" onClick={() => props.callback(username)}></div>
                </div>
                <div className="line" style={{ width: width + "%" }} />
            </React.Fragment>
        ) : (
            <div className="value">{ammount} €</div>
        );

    return (
        <div className="userSummary">
            <div className="inner left">{left}</div>
            <div className="inner right">{right}</div>
            <div className="separator" />
        </div>
    );
}
