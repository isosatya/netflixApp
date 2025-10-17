const request = require("request");
const db = require("./db");

/**
 * Makes API request to Netflix API
 * @param {string} url - Netflix API endpoint
 * @param {object} headers - API headers
 * @returns {Promise} - Promise that resolves with API response
 */
function makeNetflixRequest(url, headers) {
    return new Promise((resolve, reject) => {
        const params = {
            url: url,
            method: "GET",
            headers: headers
        };

        request(params, function(error, response, body) {
            if (error) {
                reject(error);
            } else if (response.statusCode !== 200) {
                reject(new Error(`API request failed with status: ${response.statusCode}`));
            } else {
                try {
                    const payload = JSON.parse(body);
                    resolve(payload);
                } catch (parseError) {
                    reject(parseError);
                }
            }
        });
    });
}

/**
 * Makes API request to IMDb API
 * @param {string} movieId - IMDb movie ID
 * @param {object} headers - API headers
 * @returns {Promise} - Promise that resolves with movie details
 */
function makeImdbRequest(movieId, headers) {
    return new Promise((resolve, reject) => {
        const params = {
            url: `https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movieId}&f=json`,
            method: "GET",
            headers: headers
        };

        request(params, function(error, response, body) {
            if (error) {
                reject(error);
            } else if (response.statusCode !== 200) {
                reject(new Error(`IMDb API request failed with status: ${response.statusCode}`));
            } else {
                try {
                    const payload = JSON.parse(body);
                    // Normalize rating
                    if (payload.imdbRating === "N/A") {
                        payload.imdbRating = 0;
                    }
                    resolve(payload);
                } catch (parseError) {
                    reject(parseError);
                }
            }
        });
    });
}

/**
 * Processes Netflix API response and enriches with IMDb data
 * @param {object} netflixPayload - Response from Netflix API
 * @param {object} imdbHeaders - IMDb API headers
 * @param {function} dbAddFunction - Database function to add items
 * @param {function} dbGetFunction - Database function to get items
 * @returns {Promise} - Promise that resolves with enriched movie data
 */
async function processNetflixResponse(netflixPayload, imdbHeaders, dbAddFunction, dbGetFunction) {
    if (netflixPayload.ITEMS.length === 0) {
        return [];
    }

    const moviesWithImdb = netflixPayload.ITEMS.filter(item => item.imdbid && item.imdbid !== "notfound");
    const moviesPayload = [];
    let queryCounter = 0;

    // Process each movie with IMDb data
    for (const item of moviesWithImdb) {
        try {
            const imdbData = await makeImdbRequest(item.imdbid, imdbHeaders);
            const netflixId = item.netflixid;

            // Add to database
            await dbAddFunction(
                netflixId,
                item.imdbid,
                imdbData.Title,
                imdbData.Year,
                imdbData.Runtime,
                imdbData.Genre,
                imdbData.Actors,
                imdbData.Plot,
                imdbData.Language,
                imdbData.Country,
                imdbData.Poster,
                imdbData.imdbRating,
                imdbData.totalSeasons || null
            );

            // Get from database
            const dbResult = await dbGetFunction(netflixId);
            moviesPayload.push(dbResult.rows[0]);
            queryCounter++;

        } catch (error) {
            console.error(`Error processing movie ${item.netflixid}:`, error);
        }
    }

    return moviesPayload;
}

/**
 * Handles API errors consistently
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @param {object} res - Express response object
 */
function handleApiError(error, context, res) {
    console.error(`Error in ${context}:`, error);
    res.status(500).json({ 
        error: "Internal server error",
        message: "Failed to fetch data from external APIs"
    });
}

module.exports = {
    makeNetflixRequest,
    makeImdbRequest,
    processNetflixResponse,
    handleApiError
};
