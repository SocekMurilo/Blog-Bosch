const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const config = require('config')

require("./startup/db")();

app.use(
    cors({
        origin: "*",
    })
);
    
    require("./startup/routes")(app);

const port = 8080;
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));
