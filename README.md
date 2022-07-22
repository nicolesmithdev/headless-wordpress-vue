# headless-blog

This project utilizes Vue.js on the front-end, connecting to the WordPress REST API for the backend. Express.js is also used on the back-end. For this project you will need both the front-end and back-end running at the same time. You will also need a client key for Gravity Forms if applicable.

## Local Setup

-   Root Directory
    -   `npm install`
-   MySQL / WordPress Backend Setup (`admin` Directory)
    -   `npm install`
    -   Rename `.env.sample` to `.env`
    -   Generate a Gravity Forms API key inside WP-Admin > Forms > Settings > Rest API
    -   Add your keys to `admin/.env`
    -   Use MAMP to start the database, selecting the `admin` directory as the Document Root
    -   Run `nodemon index.js` to start the web server
