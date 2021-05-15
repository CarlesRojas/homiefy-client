import React, { createContext } from "react";

// Pictures
import Electricity from "resources/pictures/Electricity.png";
import Water from "resources/pictures/Water.png";
import Rent from "resources/pictures/Rent.png";

// API Context
export const API = createContext();

const APIProvider = ({ children }) => {
    const apiURL = "http://192.168.1.146:8000";

    const USER = "Carles";

    // Example API
    const login = async (email, password) => {
        // Post data
        var postData = {
            email,
            password,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/userData/utilities`, {
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

    // const today = new Date();

    // const utilitiesHardcodedResponse = {
    //     Electricity: {
    //         username: "Carles",
    //         price: -43,
    //         picture: Electricity,
    //         period: 30,
    //         peoplePaying: ["Carles"],
    //         lastPayment: today.getDate() - 10,
    //         // color: "#edde4d",
    //     },
    //     Water: {
    //         username: "Carles",
    //         price: -32,
    //         picture: Water,
    //         period: 60,
    //         peoplePaying: ["Santi", "Jaume", "Jia"],
    //         lastPayment: today.getDate() - 27,
    //         // color: "#4a9eed",
    //     },
    //     Rent: {
    //         username: "Carles",
    //         price: -650,
    //         picture: Rent,
    //         period: 30,
    //         peoplePaying: ["Santi", "Carles"],
    //         lastPayment: today.getDate() - 22,
    //         // color: "#71c24e",
    //     },
    // };

    const getUtilities = async () => {
        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/userData/utilities`, {
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

    const addUtility = async (billType, price, people, period) => {
        const today = new Date();

        // Post data
        var postData = {
            username: USER,
            name: billType,
            price,
            people,
            period,
            lastPayment: today.toString(),
            picture: billType + ".png",
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/userData/utilities`, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    body: JSON.stringify(postData),
                },
            });

            // Get data from response
            const response = await rawResponse.json();

            return response;
        } catch (error) {
            return { error: "Error" };
        }
    };

    const deleteUtility = async (billType) => {
        const today = new Date();

        // Post data
        var postData = {
            username: USER,
            name: billType,
        };

        try {
            // Fetch
            var rawResponse = await fetch(`${apiURL}/userData/utilities`, {
                method: "delete",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    body: JSON.stringify(postData),
                },
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
                login,
                getUtilities,
                addUtility,
                deleteUtility,
            }}
        >
            {children}
        </API.Provider>
    );
};

export default APIProvider;
