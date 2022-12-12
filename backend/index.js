import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

// Create express app
const app = express();

// add Cors to app
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Port
const PORT = process.env.PORT || 5000;

// Database connection url
const CONNECTION_URL =
    "mongodb+srv://ticketauth:xyzticketauth@cluster0.yyn3cl5.mongodb.net/?retryWrites=true&w=majority";

// connect to database with mongoose
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server Running");
        });
    })
    .catch((error) => {
        console.log(error);
    });
