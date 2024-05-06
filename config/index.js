require("dotenv").config()

const config = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};

module.exports = {config}