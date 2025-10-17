const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./utils/db");
const bc = require("./utils/bc"); // BECRYPT FOR HASHING AND CHECKING PASSWORDS
const { makeNetflixRequest, processNetflixResponse, handleApiError } = require("./utils/apiHelpers");
var cookieSession = require("cookie-session");

// Image upload configuration (currently unused)
const s3 = require("./s3");
//////////////////////////////////////////// Cookie settings

app.use(cookieParser());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

////////////////////////////////

app.use(express.static(__dirname + "/public"));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(compression());

//////////////////////////////  Bundle Server

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////////////////////////////////////   Routes

// Load API configuration
let secrets = require("./secrets");
let headers = secrets.headers;  // Netflix API headers
let headers2 = secrets.headers2;  // IMDb API headers

app.post("/new_seasons_items", async function(req, res) {
    try {
        const days2 = req.body.days2;
        const country = "DE";
        const netflixUrl = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:seasons${days2}:${country}&t=ns&st=adv&p=1`;

        // Clean database table
        await db.cleanNewSeasonsTable();

        // Get data from Netflix API
        const netflixPayload = await makeNetflixRequest(netflixUrl, headers);

        // Process and enrich with IMDb data
        const moviesPayload = await processNetflixResponse(
            netflixPayload, 
            headers2, 
            db.addNewSeasons, 
            db.getNewSeasonsInfo
        );

        res.json(moviesPayload);
    } catch (error) {
        handleApiError(error, "new_seasons_items", res);
    }
});

app.post("/new_items", async function(req, res) {
    try {
        const days1 = req.body.days1;
        const country = "DE";
        const netflixUrl = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:new${days1}:${country}&p=1&t=ns&st=adv`;

        // Clean database table
        await db.cleanNewTable();

        // Get data from Netflix API
        const netflixPayload = await makeNetflixRequest(netflixUrl, headers);

        // Process and enrich with IMDb data
        const moviesPayload = await processNetflixResponse(
            netflixPayload, 
            headers2, 
            db.addNew, 
            db.getNewInfo
        );

        res.json(moviesPayload);
    } catch (error) {
        handleApiError(error, "new_items", res);
    }
});

app.post("/leaving_items", async function(req, res) {
    try {
        const country = "DE";
        const netflixUrl = `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:exp:${country}&t=ns&st=adv&p=1`;

        // Clean database table
        await db.cleanLeavingTable();

        // Get data from Netflix API
        const netflixPayload = await makeNetflixRequest(netflixUrl, headers);

        // Process and enrich with IMDb data
        const moviesPayload = await processNetflixResponse(
            netflixPayload, 
            headers2, 
            db.addLeaving, 
            db.getLeavingInfo
        );

        res.json(moviesPayload);
    } catch (error) {
        handleApiError(error, "leaving_items", res);
    }
});

app.get("/welcome", function(req, res) {
    if (req.session.usersId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.usersId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// Start the server
app.listen(8080, function() {
    console.log("I'm listening.");
});
