CREATE DATABASE greetingsDB;

--\c into greetingsDB
CREATE TABLE greet(
    user_id SERIAL PRIMARY KEY, 
    NAME VARCHAR(255),
    counter INT
);