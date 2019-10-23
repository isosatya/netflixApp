DROP TABLE IF EXISTS new;

CREATE TABLE new
(
    id SERIAL PRIMARY KEY,
    netflixid TEXT NOT NULL UNIQUE,
    imbdid TEXT NOT NULL UNIQUE,
    type TEXT,
    title TEXT,
    year TEXT,
    runtime TEXT,
    genre TEXT,
    actors TEXT,
    plot TEXT,
    language TEXT,
    country TEXT,
    poster TEXT,
    imdb_rating TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);