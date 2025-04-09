const AWS = require('aws-sdk');
const fs = require('fs');
const mysql = require('mysql');

// configure the AWS environment
// AWS.config.update({
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY
// });

let s3 = new AWS.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
);

// specify the file path and bucket name
// let filePath = "<local file path>";
let bucketName = "bizchats";


async function uploadImg(imageBase64, fileType, contact_name, id, subfolder, type) {
    return new Promise(async (resolve, reject) => {
        try {
            let file = dataURLtoUnit8Array(imageBase64);
            const d = new Date();

            const time = d.toLocaleString("en-US", { timeZone: "America/New_York" }).split(" ").join("-");
            const t2 = time.split(",").join("");
            const t3 = t2.split(":").join("-");
            const t4 = t3.split("/").join("-");

            const key = type === 'blog'
                ? `blog_${t4}.${fileType}`
                : `${contact_name}_${id}_bizchats_${t4}.${fileType}`;

            // Normalize fileType to proper MIME type
            const contentTypeMap = {
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
                webp: 'image/webp',
                bmp: 'image/bmp',
                svg: 'image/svg+xml',
                tiff: 'image/tiff',
                ico: 'image/x-icon'
            };

            const normalizedType = fileType.toLowerCase();
            const mimeType = contentTypeMap[normalizedType] || 'application/octet-stream';

            const params = {
                Bucket: `${bucketName}/${subfolder}`,
                Key: key,
                Body: file,
                ContentType: mimeType,
                ContentDisposition: 'inline'
            };

            await s3.upload(params, (err, data) => {
                if (err) {
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    let link = data.Location;
                    resolve(link);
                }
            });
        }
        catch (err) {
            reject({ "err": "awsController UploadImg something went wrong" });
        }
    });
}


async function deleteImg(link, subfolder) {
    return new Promise(async (resolve, reject) => {
        try {
            //because we don't need https we only need the name of the image
            let ke = link.split("/")
            let key = ke[ke.length - 1]
            const params = {
                Bucket: `${bucketName}/${subfolder}`,
                Key: key
            };
            await s3.deleteObject(params, (err, data) => {
                if (err) {
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    let link = data.Location;
                    resolve(link)
                }
            });
        }
        catch (err) {
            reject({ "err": "awsController delete something went wrong" });
        }
    })
}


function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const f = new File([u8arr], filename, { type: mime });
    return f;
}


function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}


function dataURLtoUnit8Array(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return u8arr;
}

//Usage example:
// var file = dataURLtoFile('data:text/plain;base64,aGVsbG8=', 'hello.txt');

function dataURLtoUint8Array(dataURL) {
    if (!dataURL) {
        throw new Error("Invalid base64 string");
    }
    let base64String;
    // Check if the string is in the data URL format
    if (dataURL.indexOf(',') !== -1) {
        base64String = dataURL.split(',')[1];
    } else {
        base64String = dataURL;
    }
    // Convert base64 string to a buffer (which is a Uint8Array)
    return Buffer.from(base64String, 'base64');
}

async function uploadFile(base64, fileType, contact_name, id, channelName, assignmentName) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!base64 || !fileType || !contact_name || !id || !channelName || !assignmentName) {
                throw new Error("One or more required parameters are missing");
            }

            let file = dataURLtoUint8Array(base64);
            const d = new Date();
            const time = d.toLocaleString("en-US", { timeZone: "America/New_York" })
                .split(" ").join("-")
                .split(",").join("")
                .split(":").join("-")
                .split("/").join("-");
            const key = `${contact_name}_${id}_bizchats_${time}.${fileType}`;
            const s3Path = `channels/submissions/${channelName}/${assignmentName}/${key}`;

            const contentTypeMap = {
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
                webp: 'image/webp',
                bmp: 'image/bmp',
                svg: 'image/svg+xml',
                tiff: 'image/tiff',
                ico: 'image/x-icon',
                pdf: 'application/pdf',
                doc: 'application/msword',
                docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                xls: 'application/vnd.ms-excel',
                xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                ppt: 'application/vnd.ms-powerpoint',
                pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                txt: 'text/plain',
                csv: 'text/csv',
                mp4: 'video/mp4',
                mp3: 'audio/mpeg',
                zip: 'application/zip',
                rar: 'application/x-rar-compressed'
            };

            const normalizedType = fileType.toLowerCase();
            const mimeType = contentTypeMap[normalizedType] || 'application/octet-stream';

            const params = {
                Bucket: bucketName,
                Key: s3Path,
                Body: file,
                ContentType: mimeType,
                ContentDisposition: 'inline'
            };

            await s3.upload(params, (err, data) => {
                if (err) {
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    let link = data.Location;
                    resolve(link);
                }
            });
        } catch (err) {
            reject({ "err": "awsController uploadFile something went wrong" });
        }
    });
}

async function uploadMessageFile(base64, fileType, folder) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log ("test");
            // if (!base64 || !fileType || !folder) {
            //     throw new Error("One or more required parameters are missing");
            // }
            
            let file = dataURLtoUint8Array(base64);
            const d = new Date();
            const time = d.toISOString().replace(/[:.-]/g, "_");
            const key = `message_${time}.${fileType}`;
            const s3Path = `${folder}/${key}`;

            const contentTypeMap = {
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                gif: 'image/gif',
                pdf: 'application/pdf',
                txt: 'text/plain',
                // Add more file types as needed
            };

            const mimeType = contentTypeMap[fileType.toLowerCase()] || 'application/octet-stream';

            const params = {
                Bucket: bucketName,
                Key: s3Path,
                Body: file,
                ContentType: mimeType,
                ContentDisposition: 'inline'
            };
            await s3.upload(params, (err, data) => {
                if (err) {
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    resolve(data.Location);
                }
            });
        } catch (err) {
            reject({ "err": "awsController uploadMessageFile something went wrong" });
        }
    });
}

async function uploadAttachment(req, res) {
    try {
        const { base64, fileType, folder } = req.body;

        const file_url = await uploadMessageFile(base64, fileType, folder);
        console.log("Uploaded file URL:", file_url); // Debugging: Log the uploaded file URL
        res.status(200).json({ file_url });
    } catch (err) {
        console.error("Error in uploadAttachment:", err); // Debugging: Log any errors
        res.status(500).json({ error: "Failed to upload attachment" });
    }
}

module.exports = {
    uploadImg,
    deleteImg,
    uploadFile,
    uploadMessageFile,
    uploadAttachment
};