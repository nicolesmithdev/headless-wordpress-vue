# headless-blog

This project utilizes Vue.js on the front-end, connecting to the WordPress REST API for the backend. Express.js is also used on the back-end. For this project you will need both the front-end and back-end running at the same time. You will also need a client key for Gravity Forms if applicable.

## Gravity Forms / Backend

-   In the `admin` folder, rename `.env.sample` to `.env`
-   Generate a Gravity Forms API key inside WP-Admin > Forms > Settings > Rest API
-   Add your keys to `admin/.env`
-   Run `npm install`
-   Run `nodemon index.js` to start the web server
