DROP TABLE IF EXISTS leaving;

CREATE TABLE leaving
(
    id SERIAL PRIMARY KEY,
    imbdid VARCHAR(10) NOT NULL UNIQUE,
    leaving VARCHAR(20),
    title VARCHAR(40),
    year VARCHAR(6),
    runtime VARCHAR(40),
    genre VARCHAR(60),
    actors VARCHAR(100),
    plot VARCHAR(300),
    language VARCHAR(40),
    country VARCHAR(100),
    poster VARCHAR(300),
    imdb_rating VARCHAR(10),
    type VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);