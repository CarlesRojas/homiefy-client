import React, { createContext } from "react";
import moment from 'moment';

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
        var createdDate1 = moment(new Date()).add(5, 's').toDate();
        var createdDate2 = moment(new Date()).add(10, 's').toDate();
        var createdDate3 = moment(new Date()).add(15, 's').toDate();
        return [{"id": 0, "username": "Santi", "photo": "santi_photo.jpg", "message": "message 1", "createdDate": createdDate1}, {"id": 1, "username": "Carles", "photo": "carles_photo.jpg", "message": "message 2", "createdDate": createdDate2}, {"id": 2, "username": "Jaume", "photo": "jaume_photo.jpg", "message": "message 3", "createdDate": createdDate3}]
    };

    // Return the context
    return (
        <API.Provider
            value={{
                apiURL,
                login,
                apiGetAllPostIt
            }}
        >
            {children}
        </API.Provider>
    );
};

export default APIProvider;
