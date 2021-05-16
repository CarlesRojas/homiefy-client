import React, { useContext, useEffect } from "react";
import classnames from "classnames";
import SVG from "react-inlinesvg";
import "./Navbar.scss";

// Icons
import MoneySummaryIcon from "resources/icons/MoneySummary.svg";
import UtilitiesIcon from "resources/icons/Utilities.svg";

// Contexts
import { Data } from "contexts/Data";

export default function Navbar() {
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
            <SVG src={MoneySummaryIcon} className={classnames("icon", { selected: currPath === "/" })} onClick={() => changeRoute("/")} />
            <SVG src={UtilitiesIcon} className={classnames("icon", { selected: currPath === "/utilities" })} onClick={() => changeRoute("/utilities")} />
            <SVG src={UtilitiesIcon} className={classnames("icon", { selected: currPath === "/postIt" })} onClick={() => changeRoute("/postIt")} />
            <SVG src={UtilitiesIcon} className={classnames("icon", { selected: currPath === "/checkList" })} onClick={() => changeRoute("/checkList")} />
        </div>
    );
}
