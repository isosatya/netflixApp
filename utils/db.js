const spicedPg = require("spiced-pg");
///////////////// this communicates with the local or the web sql database and has to be
///////////////// specified for each project
const dbUrl =
    process.env.DATABASE_URL ||
    `postgres:postgres:postgres@localhost:5432/netflix`;
var db = spicedPg(dbUrl);

/////////////////////////////////////////////////////////////////////////

module.exports.cleanNewTable = function cleanNewTable() {
    return db.query(
        `
        DELETE FROM new;
        `
    );
};

module.exports.addNew = function addNew(
    netflixid,
    imbdid,
    type,
    title,
    year,
    runtime,
    genre,
    actors,
    plot,
    language,
    country,
    poster,
    imdb_rating
) {
    return db.query(
        `
        INSERT INTO new (netflixid, imbdid, type, title, year, runtime, genre, actors, plot, language, country, poster, imdb_rating)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id;
    `,
        [
            netflixid,
            imbdid,
            type,
            title,
            year,
            runtime,
            genre,
            actors,
            plot,
            language,
            country,
            poster,
            imdb_rating
        ]
    );
};

module.exports.getNewInfo = function getNewInfo(netflixid) {
    return db.query(
        `
        SELECT  netflixid,
                imbdid,
                type,
                title,
                year,
                runtime,
                genre,
                actors,
                plot,
                language,
                country,
                poster,
                imdb_rating 
        FROM new 
        WHERE netflixid = $1;
        `,
        [netflixid]
    );
};

// module.exports.users = function users(firstName, lastName, email, password) {
//     return db.query(
//         `
//         INSERT INTO users (first, last, email, password)
//         VALUES ($1, $2, $3, $4)
//         RETURNING id;
//     `,
//         [firstName, lastName, email, password]
//     );
// };

// module.exports.login = function login(logEmail) {
//     return db.query(
//         `SELECT id, email, password
//     FROM users
//     WHERE email = $1;`,
//         [logEmail]
//     );
// };

// module.exports.getUserInfo = function getUserInfo(id) {
//     return db.query(
//         `
//         SELECT first, last, email, bio, imgUrl, created_at
//         FROM users
//         WHERE id = $1;
//         `,
//         [id]
//     );
// };
