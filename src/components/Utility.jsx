import React, { useContext, useRef, useEffect } from "react";
import "./Utility.scss";

// Pictures
import Electricity from "resources/pictures/Electricity.png";
import Water from "resources/pictures/Water.png";
import Rent from "resources/pictures/Rent.png";

// Contexts
import { Data } from "contexts/Data";

export default function Utility({ name, data }) {
    // Contexts
    const { profilePictures } = useContext(Data);
    const { price, period, people, lastPayment } = data;

    // Get bar percentage
    const today = new Date();
    const lastPaymentDate = new Date(lastPayment);
    const daysLeft = period - Math.abs(today.getDate() - lastPaymentDate.getDate());

    // Get color
    var color = "";
    var picture = null;
    switch (name) {
        case "Electricity":
            color = "#edde4d";
            picture = Electricity;
            break;

        case "Water":
            color = "#4a9eed";
            picture = Water;
            break;

        case "Rent":
            color = "#71c24e";
            picture = Rent;
            break;

        default:
            color = "#4a9eed";
            picture = Water;
            break;
    }

    // Progress bar ref
    const progressBarRef = useRef(null);

    useEffect(() => {
        if (progressBarRef.current) {
            var secondsLeft = daysLeft * 24 * 60 * 60;
            progressBarRef.current.style.transition = `width ${secondsLeft}s linear`;
            progressBarRef.current.style.width = "100%";
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
                        {people.map((name, i) => (
                            <img key={i} src={profilePictures.current[name]} alt="" className="profilePicture" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="progress">
                <p className="period">{period} days</p>
                <div className="bar" ref={progressBarRef} style={{ width: `${((period - daysLeft) / period) * 100}%`, background: color }}></div>
                <p className="timeLeft">{daysLeft} days left</p>
            </div>
        </div>
    );
}
