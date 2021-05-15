import React, { useContext, useRef, useEffect } from "react";
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
    const daysLeft = Math.abs(today.getDate() - lastPayment);
    const total = Math.abs(today.getDate() - today.getDate() - periodInDays);

    // Progress bar ref
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (progressBarRef.current) {
            var secondsLeft = daysLeft * 24 * 60 * 60;
            progressBarRef.current.style.transition = `width ${secondsLeft}s linear`;
            progressBarRef.current.style.width = "0%";
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="utility">
            <div className="content">
                <img src={picture} alt="" className="image" />

                <div className="description">
                    <div className="titleContainer">
                        <p className="name">{name}</p>
                        <p className="price">{price} €</p>
                    </div>

                    <div className="people">
                        {peoplePaying.map((name, i) => (
                            <img key={i} src={profilePictures.current[name]} alt="" className="profilePicture" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="progress">
                <p className="period">{total} days</p>
                <div className="bar" ref={progressBarRef} style={{ width: `${(daysLeft / total) * 100}%`, background: color }}></div>
                <p className="timeLeft">{daysLeft} days left</p>
            </div>
        </div>
    );
}
