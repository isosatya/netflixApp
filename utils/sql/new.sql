DROP TABLE IF EXISTS new;

CREATE TABLE new
(
    id SERIAL PRIMARY KEY,
    netflixid VARCHAR(500) NOT NULL UNIQUE,
    imbdid VARCHAR(500) NOT NULL UNIQUE,
    type VARCHAR(500),
    title VARCHAR(500),
    year VARCHAR(500),
    runtime VARCHAR(500),
    genre VARCHAR(500),
    actors VARCHAR(500),
    plot VARCHAR(500),
    language VARCHAR(500),
    country VARCHAR(500),
    poster VARCHAR(500),
    imdb_rating VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);