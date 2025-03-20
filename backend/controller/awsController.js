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
            if (allowConsoleLog) console.log(t4);

            const key = type === 'blog' 
                ? `blog_${t4}.${fileType}` 
                : `${contact_name}_${id}_honeyydo_${t4}.${fileType}`;

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
                    console.log(err);
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    console.log(`Successfully uploaded data`);
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
            if (allowConsoleLog) console.log(key)
            await s3.deleteObject(params, (err, data) => {
                if (err) {
                    console.log(err)
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    console.log(`Successfully deleted data`);

                    // get the link
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
    if (allowConsoleLog) console.log("dsf", filename)
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    if (allowConsoleLog) console.log("dsfvvv")
    const f = new File([u8arr], filename, { type: mime });
    if (allowConsoleLog) console.log(f)
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
// if (allowConsoleLog) console.log(file);

async function uploadFile(imageBase64, fileType, contact_name, id, subfolder, name) {

    return new Promise(async (resolve, reject) => {
        try {
            //let file = dataURLtoFile(imageBase64, "FileNAME");
            let file = dataURLtoUnit8Array(imageBase64);

            // upload file to the bucket
            // console.log("dd", file)
            const d = new Date()

            const time = d.toLocaleString("en-US", { timeZone: "America/New_York" }).split(" ").join("-");
            //console.log(tim)
            //const time = d.toUTCString({}).split(" ").join("-")
            const t2 = time.split(",").join("")
            const t3 = t2.split(":").join("-")
            const t4 = t3.split("/").join("-")
            if (allowConsoleLog) console.log(t4)
            const key = subfolder === 'email_attachment' ? `${t4}_${name}` : `${contact_name}_${id}_honeyydo_file_${t4}.${fileType}`
            const params = {
                Bucket: `${bucketName}/${subfolder}`,
                Key: key,
                Body: file,
                // ContentType: 'pdf'
            };

            await s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err)
                    reject({ "err": `Error uploading data: ${err}` });
                } else {
                    console.log(`Successfully uploaded data`);

                    // get the link
                    let link = data.Location;
                    resolve(link)
                }
            });
        }
        catch (err) {
            console.log(err)
            reject({ "err": "awsController UploadImg something went wrong" });
        }
    })
}

module.exports = {
    uploadImg,
    deleteImg,
    uploadFile
}