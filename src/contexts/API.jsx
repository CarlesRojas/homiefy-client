import React, { createContext } from "react";

// API Context
export const API = createContext();

const APIProvider = ({ children }) => {
    const apiURL = "http://192.168.1.146:8000";

    const USER = "Carles";

    const getUtilities = async () => {
        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/utilities`, {
                method: "get",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return [];
        }
    };

    const addUtility = async (billType, price, people, period) => {
        if (typeof billType !== "string" || typeof price !== "number" || typeof people !== "object" || typeof period !== "number") return { error: "Error" };

        const today = new Date();

        // Post data
        var postData = {
            username: USER,
            name: billType,
            price: -price,
            people,
            period,
            lastPayment: today.toString(),
            picture: billType + ".png",
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/utilities/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error: "Error" };
        }
    };

    const apiAddPostIt = async (username, message, priorityType, people, period) => {
        if (typeof username !== "string" || typeof priorityType !== "number" || typeof message !== "string" || typeof people !== "object" || typeof period !== "number") {
            console.log("apiAddPostIt Error");
            return { error: "Error" };
        }

        const today = new Date();

        // var day = today.getDate();
        // var month = today.getMonth() + 1;
        // var year = today.getFullYear();
        // var createdDate = "";

        // if(month < 10) {
        //     createdDate = `${day}-0${month}-${year}`;
        // } else {
        //     createdDate = `${day}-${month}-${year}`;
        // }

        // Post data
        var postData = {
            username: USER,
            priorityType: priorityType,
            people: people,
            period: period,
            message: message,
            createdDate: today.toString(),
        };

        console.log(postData);

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/postits/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error: "Error" };
        }
    };

    const apiGetAllPostIt = async () => {
        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/postits/`, {
                method: "get",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });

            // Get data from response
            const response = await rawResponse.json();
            return response;
        } catch (error) {
            console.log(`ERROR ${error}`);
            return [];
        }
    };

    const deleteUtility = async (billType) => {
        // Post data
        var postData = {
            username: USER,
            name: billType,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/utilities/`, {
                method: "delete",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error: "Error" };
        }
    };

    const apiDeletePostIt = async (username, uuid) => {
        // Post data
        var postData = {
            username: username,
            uuid: uuid,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/postits/`, {
                method: "delete",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error: "Error" };
        }
    };

    const getMoneySummary = async (username) => {
        // post data
        var postData = {
            username,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/balance/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            if ("error" in response) return response;

            return response;
        } catch (error) {
            return { error: error };
        }
    };

    const postBalance = async (username, people, price, name) => {
        var postData = {
            username,
            people,
            price,
            name,
        };

        try {
            var rawResponse = await fetch(`${apiURL}/balance/add/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const response = await rawResponse.json();

            if ("error" in response) return response;

            return response;
        } catch (error) {
            return { error: error };
        }
    };

    const getCheckList = async () => {
        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/list`, {
                method: "get",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });

            // Get data from response
            const response = await rawResponse.json();

            if ("error" in response) return response;

            return response;
        } catch (error) {
            return { error: error };
        }
    };

    const postCheckList = async (name, people, price) => {
        var postData = {
            name,
            people,
            price,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/list/`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            if ("error" in response) return response;

            return response;
        } catch (error) {
            return { error: error };
        }
    };

    const deleteListElement = async (uuid) => {
        // Post data
        var postData = {
            uuid,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/list/`, {
                method: "delete",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error: "Error" };
        }
    };

    // Return the context
    return (
        <API.Provider
            value={{
                apiURL,
                apiGetAllPostIt,
                apiAddPostIt,
                getUtilities,
                addUtility,
                deleteUtility,
                apiDeletePostIt,
                getMoneySummary,
                postBalance,
                getCheckList,
                postCheckList,
                deleteListElement,
                USER,
            }}
        >
            {children}
        </API.Provider>
    );
};

export default APIProvider;
