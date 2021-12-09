const app = require(".");

const connect = require("./config/db");

app.listen(2400, async() => {
    console.log("listening port 2400");
    await connect();
});