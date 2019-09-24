const express = require("express");
const app = express();
const request = require("request");
const compression = require("compression");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./utils/db");
const bc = require("./utils/bc"); // BECRYPT FOR HASHING AND CHECKING PASSWORDS
var cookieSession = require("cookie-session");

////////////////////// SETTINGS FOR SOCKET (CHAT)
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 127.0.0.1:8080/"
});
///////////////////////////

//////////////////////////////////////////// Image upload settings
// const for constructing the url address
const urlPrefx = "https://s3.amazonaws.com/andres-spiced/";
// This is the module that uploads the image to Amazon
const s3 = require("./s3");
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
// This uploads the image to the local storate
var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
// These are the parameters for the upload
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//////////////////////////////////////////// Cookie and Socket settings

app.use(cookieParser());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

// app.post("/register", function(req, res) {
//     var first = req.body.first;
//     var last = req.body.last;
//     var email = req.body.email;
//     var password = req.body.password;
//     bc.hashPassword(password)
//         .then(hash => {
//             db.addUsers(first, last, email, hash)
//                 .then(results => {
//                     req.session.usersId = results.rows[0].id;
//                     res.json({ userId: results.rows[0].id });
//                 })
//                 .catch(err => {
//                     if (err.code == 23505) {
//                         res.json({ error: 23505 });
//                     } else {
//                         res.json({ error: true });
//                     }
//                     console.log("Error at addUsers query -->", err);
//                 });
//         })
//         .catch(err => {
//             res.json({ error: true });
//             console.log("Error at hashPassword function", err);
//         });
// });

// app.post("/login", (req, res) => {
//     // console.log("req. body for login", req.body);

//     var email = req.body.email;
//     var password = req.body.password;
//     db.login(email)
//         .then(match => {
//             bc.checkPassword(password, match.rows[0].password)
//                 .then(doesMatch => {
//                     if (doesMatch) {
//                         req.session.usersId = match.rows[0].id;
//                         res.json({ userId: match.rows[0].id });
//                     } else {
//                         res.json({ error: "Password incorrect!" });
//                     }
//                 })
//                 .catch(err => {
//                     console.log("Error at checkPassword query ->", err);
//                 });
//         })
//         .catch(err => {
//             res.json({ error: "e-Mail not found!" });
//             console.log("Error at login query ->", err);
//         });
// });

//      Parameters for Netflix API
let headers = {
    "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
    "x-rapidapi-key": "8016ba11b6msh98e71216d87c4f2p12a5d5jsn9b29742620d3"
};

//      Parameters for ImdB API
let headers2 = {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": "8016ba11b6msh98e71216d87c4f2p12a5d5jsn9b29742620d3"
};

let days1;
let param;
let param2;
let country;
// var netflixId;
let movieId;
let moviesCount;
let queryCounter;
let payload;
let moviesPayload;
let leaving;

app.post("/new_items", function(req, res) {
    days1 = req.body.days1;
    country = "DE";

    //      Parameters for Netflix API
    param = {
        url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew${days1}%3A${country}&p=1&t=ns&st=adv`,
        method: "GET",
        headers: headers
    };

    db.cleanNewTable()
        .then(
            request(param, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log("!error NETFLIX && response.statusCode == 200");
                    payload = JSON.parse(body);
                    // console.log("payload from first request", payload);

                    moviesCount = 0;
                    queryCounter = 0;
                    moviesPayload = [];

                    for (var i = 0; i < payload.ITEMS.length; i++) {
                        if (payload.ITEMS[i].imdbid) {
                            moviesCount++;
                        }
                    }

                    for (i = 0; i < payload.ITEMS.length; i++) {
                        if (payload.ITEMS[i].imdbid) {
                            /////////////////////// IF I DECLARE NETFLIXID OUTSIDE IT DOESN WORK WHY???
                            let netflixId = payload.ITEMS[i].netflixid;

                            movieId = payload.ITEMS[i].imdbid;
                            //      Parameters for ImdB API
                            param2 = {
                                url: `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieId}&f=json`,
                                method: "GET",
                                headers: headers2
                            };

                            request(param2, function(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    // console.log("!error IMDB && response.statusCode == 200");

                                    let payload = JSON.parse(body);

                                    if (payload.imdbRating == "N/A") {
                                        payload.imdbRating = 0;
                                    }
                                    console.log(
                                        `I am about to add netflixId ${netflixId}`
                                    );

                                    db.addNew(
                                        netflixId,
                                        payload.imdbID,
                                        payload.Type,
                                        payload.Title,
                                        payload.Year,
                                        payload.Runtime,
                                        payload.Genre,
                                        payload.Actors,
                                        payload.Plot,
                                        payload.Language,
                                        payload.Country,
                                        payload.Poster,
                                        payload.imdbRating
                                    )
                                        .then(() => {
                                            db.getNewInfo(netflixId)
                                                .then(results => {
                                                    queryCounter++;
                                                    console.log(
                                                        "number of movies",
                                                        moviesCount
                                                    );
                                                    moviesPayload.push(
                                                        results.rows[0]
                                                    );

                                                    if (
                                                        queryCounter ==
                                                        moviesCount
                                                    ) {
                                                        console.log(
                                                            `queryCounter = moviesCount`
                                                        );
                                                        res.json(moviesPayload);
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log(
                                                        "Error at the getNewInfo Query",
                                                        err
                                                    );
                                                });
                                        })
                                        .catch(err => {
                                            console.log(
                                                "Error at creating entry at table",
                                                err
                                            );
                                        });
                                } else {
                                    console.log("error", error);
                                }
                            });
                        }
                    }
                } else {
                    console.log("error", error);
                }
            })
        )
        .catch(err => {
            console.log("Error at deleting table", err);
        });
});

app.post("/leaving", function(req, res) {
    country = "DE";

    console.log("testing the leaving address");

    //      Parameters for Netflix API
    param = {
        url: `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:exp:${country}&t=ns&st=adv&p=1`,
        method: "GET",
        headers: headers
    };

    db.cleanLeavingTable()
        .then(() => {
            console.log("just cleaned the leaving table");
            request(param, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log("!error NETFLIX && response.statusCode == 200");
                    payload = JSON.parse(body);
                    // console.log("payload from leaving request", payload);

                    moviesCount = 0;
                    queryCounter = 0;
                    moviesPayload = [];

                    for (var i = 0; i < payload.ITEMS.length; i++) {
                        if (payload.ITEMS[i].imdbid == "notfound") {
                            payload.ITEMS[i].imdbid = 0;
                        }

                        if (payload.ITEMS[i].imdbid) {
                            moviesCount++;
                        }
                    }

                    for (i = 0; i < payload.ITEMS.length; i++) {
                        for (i = 0; i < payload.ITEMS.length; i++) {
                            if (payload.ITEMS[i].imdbid) {
                                /////////////////////// IF I DECLARE NETFLIXID OUTSIDE IT DOESN WORK WHY???
                                let netflixId = payload.ITEMS[i].netflixid;
                                leaving = payload.ITEMS[i].unogsdate;
                                /////////////////////// IF I DECLARE movieId OUTSIDE IT DOESN WORK WHY???
                                let movieId = payload.ITEMS[i].imdbid;
                                //      Parameters for ImdB API
                                param2 = {
                                    url: `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieId}&f=json`,
                                    method: "GET",
                                    headers: headers2
                                };

                                request(param2, function(
                                    error,
                                    response,
                                    body
                                ) {
                                    if (!error && response.statusCode == 200) {
                                        // console.log("!error IMDB && response.statusCode == 200");

                                        let payload = JSON.parse(body);

                                        if (payload.imdbRating == "N/A") {
                                            payload.imdbRating = 0;
                                        }

                                        db.addLeaving(
                                            netflixId,
                                            movieId,
                                            leaving,
                                            payload.Type,
                                            payload.Title,
                                            payload.Year,
                                            payload.Runtime,
                                            payload.Genre,
                                            payload.Actors,
                                            payload.Plot,
                                            payload.Language,
                                            payload.Country,
                                            payload.Poster,
                                            payload.imdbRating
                                        )
                                            .then(() => {
                                                db.getLeavingInfo(netflixId)
                                                    .then(results => {
                                                        queryCounter++;

                                                        moviesPayload.push(
                                                            results.rows[0]
                                                        );

                                                        if (
                                                            queryCounter ==
                                                            moviesCount
                                                        ) {
                                                            console.log(
                                                                `queryCounter = moviesCount`
                                                            );

                                                            res.json(
                                                                moviesPayload
                                                            );
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.log(
                                                            "Error at the getNewInfo Query",
                                                            err
                                                        );
                                                    });
                                            })
                                            .catch(err => {
                                                console.log(
                                                    "Error at creating entry at table",
                                                    err
                                                );
                                            });
                                    } else {
                                        console.log("error", error);
                                    }
                                });
                            }
                        }
                    }
                } else {
                    console.log("error", error);
                }
            });
        })
        .catch(err => {
            console.log("Error at deleting table", err);
        });
});

// app.get("/logout", (req, res) => {
//     req.session = null;
//     res.redirect("/");
// });

// app.get("/user", (req, res) => {
//     db.getUserInfo(req.session.usersId)
//         .then(results => {
//             res.json(results.rows);
//         })
//         .catch(err => {
//             console.log("Error at the getUserInfo Query", err);
//         });
// });

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

// We change "app.listen" with "server.listen" so we can use the Socket functionality
// it's server, not app, that does the listening
server.listen(8080, function() {
    console.log("I'm listening.");
});
