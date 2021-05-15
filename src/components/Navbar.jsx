import React, { useContext, useEffect } from "react";
import classnames from "classnames";
import "./Navbar.scss";

// Icons
import MoneySummaryIcon from "resources/icons/MoneySummary.svg";
import UtilitiesIcon from "resources/icons/Utilities.svg";

// Contexts
import { Data } from "contexts/Data";

export default function Navbar(props) {
    // Contexts
    const { currPath, setCurrPath } = useContext(Data);

    const changeRoute = (route) => {
        window.PubSub.emit("onSectionChange", { path: route });
        setCurrPath(route);
    };

    useEffect(() => {
        setCurrPath(window.location.pathname);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="navbar">
            <img src={MoneySummaryIcon} alt="" className={classnames("icon", { selected: currPath === "/" })} onClick={() => changeRoute("/")} />
            <img src={UtilitiesIcon} alt="" className={classnames("icon", { selected: currPath === "/utilities" })} onClick={() => changeRoute("/utilities")} />
            <img src={UtilitiesIcon} alt="" className={classnames("icon", { selected: currPath === "/postIt" })} onClick={() => changeRoute("/postIt")} />
        </div>
    );
}
