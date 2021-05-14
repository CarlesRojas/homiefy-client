import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import EventsPubSub from "EventsPubSub";
import App from "./App";

// Contexts
import UtilsProvider from "contexts/Utils";
import DataProvider from "contexts/Data";
import APIProvider from "contexts/API";

// CSS
import "index.scss";

// Register the PubSub
window.PubSub = new EventsPubSub();

ReactDOM.render(
    <UtilsProvider>
        <DataProvider>
            <APIProvider>
                <App />
            </APIProvider>
        </DataProvider>
    </UtilsProvider>,

    document.getElementById("root")
);

serviceWorkerRegistration.register();
