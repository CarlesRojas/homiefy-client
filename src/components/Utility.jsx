import React, { useContext } from "react";
import "./Utility.scss";

//import Border from "components/Border";

// Contexts
import { Data } from "contexts/Data";

export default function Utility({ name, data }) {
    // Contexts
    const { profilePictures } = useContext(Data);
    const { price, picture, periodInDays, peoplePaying, lastPayment, color } = data;

    // Get bar percentage
    const today = new Date();
    const progressMade = Math.abs(today.getDate() - lastPayment);
    const total = Math.abs(today.getDate() - today.getDate() - periodInDays);

    return (
        <div className="utility">
            <div className="content">
                <img src={picture} alt="" className="image" />

                <div className="description">
                    <p className="name">{name}</p>
                    <p className="price">{price} €</p>
                    <div className="people">
                        {peoplePaying.map((name, i) => (
                            <img key={i} src={profilePictures[name]} alt="" className="profilePicture" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="progress">
                <div className="bar" style={{ width: `${(progressMade / total) * 100}%`, background: color }}></div>
            </div>
        </div>
    );
}
