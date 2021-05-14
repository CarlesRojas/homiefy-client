import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function Tab({ children }) {
    // Redirect state
    const [redirectTo, setRedirectTo] = useState(null);

    // On section change
    const onSectionChange = ({ path }) => {
        setRedirectTo(path);
    };

    // On component mount
    useEffect(() => {
        // Subscribe to events
        window.PubSub.sub("onSectionChange", onSectionChange);

        // Unsubscribe from events and stop loop
        return () => {
            window.PubSub.unsub("onSectionChange", onSectionChange);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Redirect to new route
    if (redirectTo) return <Redirect to={redirectTo} push={true} />;

    return <React.Fragment>{children}</React.Fragment>;
}
