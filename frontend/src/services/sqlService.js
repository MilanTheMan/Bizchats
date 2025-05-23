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

function createChannel(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            let user = getUserFromCookie();
            if (!data.userId) {
                data["userId"] = user.id;
            }
            if (!data.profile_picture) {
                const randomNumber = Math.floor(Math.random() * 30) + 1;
                data.profile_picture = `https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(${randomNumber}).jpg`;
            }
            axios
                .post(`${serverConstants.baseURL}/createChannel`, data)
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

function joinChannel(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/joinChannel`, data)
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

function getChannelById(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelById`, { channelId })
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

function getChannelAnnouncements(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelAnnouncements`, { channelId })
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

function getChannelAssignments(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelAssignments`, { channelId })
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

function getChannelMarks(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelMarks`, { channelId })
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

function createAnnouncement(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/createAnnouncement`, data)
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

function createAssignment(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/createAssignment`, data)
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

function getChannelMembers(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelMembers`, { channelId })
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

function updateUserRole(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateUserRole`, data)
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

function removeMember(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/removeMember`, data)
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

function createChat(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/createChat`, data)
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

function getChats(userId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChats`, { userId })
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

function addFriend(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/addFriend`, data)
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

function getFriends(user_id) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getFriends`, { user_id })
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

function deleteFriend(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/deleteFriend`, data)
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

function getUserById(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getUserById`, data)
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

function updateUserEmail(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateUserEmail`, data)
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

function resetUserPassword(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/resetUserPassword`, data)
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

function updateProfilePicture(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateProfilePicture`, data)
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

function getChannelMessages(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelMessages`, { channelId })
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

function createChannelMessage(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            console.log("Creating channel message with data:", data);
            axios
                .post(`${serverConstants.baseURL}/createChannelMessage`, data)
                .then((response) => {
                    console.log("Create message response:", response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    console.error("Error creating message:", err);
                    reject(err);
                });
        } catch (err) {
            console.error("Unexpected error in createChannelMessage:", err);
            reject(err);
        }
    });
}

function deleteAnnouncement(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/deleteAnnouncement`, data)
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

function updateAnnouncement(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateAnnouncement`, data)
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

function deleteAssignment(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/deleteAssignment`, data)
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

function updateAssignment(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateAssignment`, data)
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

function uploadAttachment(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            console.log("Uploading attachment:", data);
            axios
                .post(`${serverConstants.baseURL}/uploadAttachment`, data)
                .then((response) => {
                    console.log("Upload response:", response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    console.log("Upload error:", err);
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}

function addComment(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/addComment`, data)
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

function getSubmissionDetails(userId, assignmentId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getSubmissionDetails`, { userId, assignmentId })
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

function submitMark(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/submitMark`, data)
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

function getSubmissions(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getSubmissions`, { channelId })
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

function submitResults(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/submitResults`, data)
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

function updateChannel(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateChannel`, data)
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

function updateChannelName(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateChannelName`, data)
                .then((response) => {
                    resolve(response.data);
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

function updateChannelPicture(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateChannelPicture`, data)
                .then((response) => {
                    resolve(response.data);
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

function sendMessage({ userId, channelId, content, file, folder }) {
    return new Promise((resolve, reject) => {
        try {
            const fileData = file
                ? {
                    base64: file.base64,
                    fileType: file.type.split('/')[1],
                    folder
                }
                : null;

            axios
                .post(`${serverConstants.baseURL}/createChannelMessage`, {
                    userId,
                    channelId,
                    content,
                    file: fileData
                })
                .then((response) => resolve(response.data.data))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
}

function getDocumentCategories(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getDocumentCategories`, { channelId })
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

function getChannelDocuments(channelId, categoryId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelDocuments`, { channelId, categoryId })
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

function createDocumentCategory(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/createDocumentCategory`, data)
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

function uploadChannelDocument(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/uploadChannelDocument`, data)
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

function deleteChannelDocument(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/deleteChannelDocument`, data)
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

function getChannelEvents(channelId) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/getChannelEvents`, { channelId })
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

function createChannelEvent(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/createChannelEvent`, data)
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

function deleteChannelEvent(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/deleteChannelEvent`, data)
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

function updateChannelRole(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/updateChannelRole`, data)
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

function removeChannelMember(data = {}) {
    return new Promise((resolve, reject) => {
        try {
            axios
                .post(`${serverConstants.baseURL}/removeChannelMember`, data)
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
    getUserChannels,
    createChannel,
    joinChannel,
    getChannelById,
    getChannelAnnouncements,
    getChannelAssignments,
    getChannelMarks,
    createAnnouncement,
    createAssignment,
    getChannelMembers,
    updateUserRole,
    removeMember,
    createChat,
    getChats,
    addFriend,
    getFriends,
    deleteFriend,
    getUserById,
    updateUserEmail,
    resetUserPassword,
    updateProfilePicture,
    getChannelMessages,
    createChannelMessage,
    deleteAnnouncement,
    updateAnnouncement,
    deleteAssignment,
    updateAssignment,
    uploadAttachment,
    addComment,
    getSubmissionDetails,
    submitMark,
    getSubmissions,
    submitResults,
    updateChannel,
    updateChannelName,
    updateChannelPicture,
    sendMessage,
    getDocumentCategories,
    getChannelDocuments,
    createDocumentCategory,
    uploadChannelDocument,
    deleteChannelDocument,
    getChannelEvents,
    createChannelEvent,
    deleteChannelEvent,
    updateChannelRole,
    removeChannelMember,
};

export default sqlService;
