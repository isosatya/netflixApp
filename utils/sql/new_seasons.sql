DROP TABLE IF EXISTS new_seasons;

CREATE TABLE new_seasons
(
    id SERIAL PRIMARY KEY,
    netflixid VARCHAR(600) NOT NULL UNIQUE,
    imbdid VARCHAR(600) NOT NULL UNIQUE,
    title VARCHAR(600),
    year VARCHAR(600),
    runtime VARCHAR(600),
    genre VARCHAR(600),
    actors VARCHAR(600),
    plot VARCHAR(600),
    language VARCHAR(600),
    country VARCHAR(600),
    poster VARCHAR(600),
    imdb_rating VARCHAR(600),
    total_seasons varchar(600),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
