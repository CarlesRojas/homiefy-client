import React, { createContext } from "react";
import moment from "moment";

// API Context
export const API = createContext();

const APIProvider = ({ children }) => {
    const apiURL = "http://192.168.1.146:8000";

    const USER = "Carles";

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

    const apiGetAllPostIt = async () => {
        var createdDate1 = moment(new Date()).add(5, "s").toDate();
        var createdDate2 = moment(new Date()).add(10, "s").toDate();
        var createdDate3 = moment(new Date()).add(15, "s").toDate();
        return [
            { id: 0, username: "Santi", photo: "santi_photo.jpg", message: "message 1", createdDate: createdDate1 },
            { id: 1, username: "Carles", photo: "carles_photo.jpg", message: "message 2", createdDate: createdDate2 },
            { id: 2, username: "Jaume", photo: "jaume_photo.jpg", message: "message 3", createdDate: createdDate3 },
        ];
    };

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
            console.log(`ERROR ${error}`);
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

        console.log(postData);

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

    // Return the context
    return (
        <API.Provider
            value={{
                apiURL,
                apiGetAllPostIt,
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
