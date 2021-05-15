import React, { useEffect } from "react";
import classnames from "classnames";
import { useSpring, animated } from "react-spring";
import "./Popup.scss";

export default function Popup({ children, show, setShow }) {
    // Page position spring
    const [popupPosition, setPopupPosition] = useSpring(() => ({
        y: window.innerHeight,
    }));

    const closePopup = () => {
        setShow(false);
        setPopupPosition({ y: window.innerHeight });
    };

    useEffect(() => {
        if (show) setPopupPosition({ y: 0 });
        else setPopupPosition({ y: window.innerHeight });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    return (
        <div className={classnames("popup", { show })}>
            <div className={classnames("background", { show })} onClick={closePopup}></div>
            <animated.div className="container" style={{ y: popupPosition.y }}>
                <div className="content">{children}</div>
                <p className="backButton" onClick={closePopup}>
                    BACK
                </p>
            </animated.div>
        </div>
    );
}
