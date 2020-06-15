const express = require("express");
const morgan = require("morgan");

// Routes
const authors = require("./routes/author.route");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Mount routers
app.use("/api/v1/autores", authors);

const port = process.env.PORT || 3000;
app.listen(port, console.log("Server is running on port", port));
