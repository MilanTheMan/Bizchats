import axios from "axios";
import { userState } from "../App";
import { json } from "react-router-dom";
import serverConstants from "./serverConstants";
import { serverResponseErrActions, getUserFromCookie } from "./requestActions.js";
axios.defaults.withCredentials = true;


function getAllUsers(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            let user = getUserFromCookie()
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
            let user = getUserFromCookie()
            if (!data.user) {
                data["user"] = user;
            }
            axios
                .post(`${serverConstants.baseURL}/login`, { data: data })
                .then((data) => {
                    let ret = data.data;
                    resolve(ret);
                })
                .catch((err) => {
                    serverResponseErrActions(err)
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}


const sqlService = {
    getAllUsers,
    login
};

export default sqlService;
