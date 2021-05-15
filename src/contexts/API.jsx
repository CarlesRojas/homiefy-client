import React, { createContext } from "react";

// Pictures
import Electrical from "resources/pictures/Electrical.png";
import Water from "resources/pictures/Water.png";
import Rent from "resources/pictures/Rent.png";

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

    const today = new Date();

    const utilitiesHardcodedResponse = {
        "Electric Bill": {
            price: 43,
            picture: Electrical,
            periodInDays: 30,
            peoplePaying: ["Carles"],
            lastPayment: today.getDate() - 10,
            color: "#edde4d",
        },
        "Water Bill": {
            price: 23,
            picture: Water,
            periodInDays: 30,
            peoplePaying: ["Jaume", "Jia"],
            lastPayment: today.getDate() - 14,
            color: "#4a9eed",
        },
        Rent: {
            price: 650,
            picture: Rent,
            periodInDays: 30,
            peoplePaying: ["Santi"],
            lastPayment: today.getDate() - 26,
            color: "#71c24e",
        },
    };

    const getUtilities = () => {
        try {
            // Fetch
            // var rawResponse = await fetch(`${apiURL}${apiVersion}/getUtilities`, {
            //     method: "post",
            //     headers: {
            //         Accept: "application/json, text/plain, */*",
            //         "Content-Type": "application/json",
            //         "Access-Control-Allow-Origin": "*",
            //     },
            // });

            // Get data from response
            //const response = await rawResponse.json();
            // return response;

            // Return response
            return utilitiesHardcodedResponse;
        } catch (error) {
            return { error: "Login Error" };
        }
    };

    const addUtility = (name, price, picture, periodInDays, peoplePaying) => {};

    // Return the context
    return (
        <API.Provider
            value={{
                apiURL,
                login,
                getUtilities,
                addUtility,
            }}
        >
            {children}
        </API.Provider>
    );
};

export default APIProvider;
