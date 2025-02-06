require("dotenv/config"); // configure reading from .env
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const user = { contact_name: "Milan" }

const fs = require("fs")
const https = require("https")
const app = express();

const routes = require("./routes/index");
const port = process.env.PORT || 8080;
const sql = require("./controller/mysqlController");


// For HTTPS Setup

const key = fs.readFileSync("./certificate/private.key");
const cert = fs.readFileSync("./certificate/certificate.crt");

const credentials = {
    key: key,
    cert: cert
}

const httpsServer = https.createServer(credentials, app);


global.allowConsoleLog = true; // set to false to disable console.log

sql.connect().then(connection => {
    console.log("SQL Connected")
    global.sqlConnection = connection;
}).catch(err => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send({ "df": "dfs" })
})

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    //everytime amplify rebuild then we need to update amplify url website until we assign amplify to a domain
    // also update recpatch allowed domains
    origin: ["http://localhost:3000", "http://www.localhost:3000/#/", "http://www.localhost:3000", "https://main.dn5s0tbye754g.amplifyapp.com"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
}))
routes(app);


app.listen(port, () => {
    console.log(`http://localhost:${port}`)

}).on("close", () => {
    console.log("closing the app");
    sqlConnection.end();
})

// Uncomment this line if you have uncommented the HTTPS setup code
httpsServer.listen(8443);