import React, { createContext } from "react";
import moment from 'moment';

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
            var rawResponse = await fetch(`${apiURL}${apiVersion}/username/login`, {
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

    const apiGetAllPostIt = async () => {
        var createdDate1 = moment(new Date()).subtract(5, 's').toDate();
        var createdDate2 = moment(new Date()).subtract(7, 's').toDate();
        var createdDate3 = moment(new Date()).subtract(10, 's').toDate();
        var createdDate4 = moment(new Date()).subtract(12, 's').toDate();
        return [{"id": 0, "username": "Santi", "photo": "santi_photo.jpg", "message": "message 1", "createdDate": createdDate1}, {"id": 1, "username": "Carles", "photo": "carles_photo.jpg", "message": "message 2", "createdDate": createdDate2}, {"id": 2, "username": "Jaume", "photo": "jaume_photo.jpg", "message": "message 3", "createdDate": createdDate3}, {"id": 3, "username": "Jiaxiang", "photo": "jia_photo.jpg", "message": "message 4", "createdDate": createdDate1}, createdDate4]
    };

    const today = new Date();

    const utilitiesHardcodedResponse = {
        "Electric Bill": {
            price: -43,
            picture: Electrical,
            periodInDays: 30,
            peoplePaying: ["Carles"],
            lastPayment: today.getDate() - 10,
            color: "#edde4d",
        },
        "Water Bill": {
            price: -32,
            picture: Water,
            periodInDays: 60,
            peoplePaying: ["Santi", "Jaume", "Jia"],
            lastPayment: today.getDate() - 27,
            color: "#4a9eed",
        },
        Rent: {
            price: -650,
            picture: Rent,
            periodInDays: 30,
            peoplePaying: ["Santi", "Carles"],
            lastPayment: today.getDate() - 23,
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
                apiGetAllPostIt,
                getUtilities,
                addUtility,
            }}
        >
            {children}
        </API.Provider>
    );
};

export default APIProvider;
