 const mysql = require("mysql2"); // this is for develop
// const mysql = require("mysql"); // this is for main and production

async function connect() {
    return new Promise(async (resolve, reject) => {
        const credentials = { // Develop
            host: "localhost",
            user: "root",
            port: "3306",
            password: "local12345678!",
            database: "Bizchats",
        };

        // const credentials = { // Production
        //     host: "bizchatsdb.ca0vwkdhjtrv.us-east-1.rds.amazonaws.com",
        //     user: "admin",
        //     port: "3306",
        //     password: "local12345678!",
        //     database: "Bizchats",
        // };

        try {
            // const connect = await mysql.createConnection(credentials);
            // resolve(connect);


            const connection_pool = mysql.createPool(credentials);
            connection_pool.getConnection((err, connection) => {
                if (err)
                    throw err;
                console.log('Database connected successfully');
                connection.release();
            });
            resolve(connection_pool)
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}


module.exports = {
    connect
};