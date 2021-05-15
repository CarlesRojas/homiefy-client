import React, { createContext } from "react";

// API Context
export const API = createContext();

// API version
const apiVersion = "api_v1";

const APIProvider = ({ children }) => {
    const apiURL = process.env.NODE_ENV === "production" ? "https://finalURL.com/" : "http://localhost:3100/";

    // Example API
    const login = async (email, password) => {
        // Post data
        var postData = {
            email,
            password,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}${apiVersion}/user/login`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            // Return with error if it is the case
            if ("error" in response) return response;

            // Return response
            return response;
        } catch (error) {
            return { error: "Login Error" };
        }
    };

    const getMoneySummary = async (username) => {
        
        // post data
        var postData = {
            username
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/balance`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(postData),
            });

            // Get data from response
            const response = await rawResponse.json();

            if ("error" in response) return response;

            return response;

        } catch (error) {
            console.log(error);
            return { error: error }
        }
    };

    // Return the context
    return (
        <API.Provider
            value={{
                apiURL,
                login,
                getMoneySummary,
            }}
        >
            {children}
        </API.Provider>
    );
};

export default APIProvider;
