import React from 'react'
import "./UserSummary.scss"

export default function UserSummary(props) {

    const username = props.username;
    const ammount = props.ammount;

    const width = Math.max(Math.abs(ammount) * 90 / props.maxAmmount, 10);

    const right = ammount >= 0 
        ? 
            <React.Fragment>
                <div className="line" style={{width: width+"%"}}/>
                <div className="icon"/>
            </React.Fragment> 
        : null;

    const left = ammount < 0 
        ? 
            <React.Fragment>
                <div className="icon"/>
                <div className="line" style={{width: width+"%"}}/>
            </React.Fragment>
        : null;

    return (
        <div className="userSummary">
            <div className="inner left">{left}</div>
            <div className="inner right">{right}</div>
            <div className="separator"/>
        </div>
    )
}
