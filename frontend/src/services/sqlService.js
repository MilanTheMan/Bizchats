import axios from "axios";
import Cookies from "js-cookie";
import { userState } from "../App";
import { json } from "react-router-dom";
import serverConstants from "./serverConstants";
import { serverResponseErrActions, getUserFromCookie } from "./requestActions.js";
axios.defaults.withCredentials = true;

function getAllUsers(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            let user = getUserFromCookie();
            if (!data.user) {
                data["user"] = user;
            }
            axios
                .post(`${serverConstants.baseURL}/getAllUsers`, { "data": data })
                .then((data) => {
                    let ret = data.data;
                    resolve(ret);
                })
                .catch((err) => {
                    serverResponseErrActions(err);
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}

function login(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            let user = getUserFromCookie();
            if (!data.user) {
                data["user"] = user;
            }
            axios
                .post(`${serverConstants.baseURL}/login`, data)
                .then((response) => {
                    let ret = response.data;
                    delete ret.data.password; // Remove password from response
                    Cookies.set('user', JSON.stringify(ret.data), { expires: 7 }); // Save user info in a cookie
                    resolve(ret);
                })
                .catch((err) => {
                    serverResponseErrActions(err);
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}

function signup(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/signup`, data)
                .then((response) => {
                    let ret = response.data;
                    delete ret.data.password; // Remove password from response
                    Cookies.set('user', JSON.stringify(ret.data), { expires: 7 }); // Save user info in a cookie
                    resolve(ret);
                })
                .catch((err) => {
                    serverResponseErrActions(err);
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}

function getUserChannels(userId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getUserChannels`, { userId })
                .then((response) => {
                    let ret = response.data;
                    resolve(ret);
                })
                .catch((err) => {
                    serverResponseErrActions(err);
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}

const sqlService = {
    getAllUsers,
    login,
    signup,
    getUserChannels
};

export default sqlService;
