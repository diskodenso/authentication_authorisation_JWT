// import dotenv
import 'dotenv/config';
// import express
import express from 'express';
// import cors
import cors from 'cors';
// import database connecter function from client.js
import "./db/client.js"
const app = express();
const port = process.env.PORT || 5000

// import middleware to transcript to json
app.use(express.json()); // body parser
// import middleware cors
app.use(cors());

// declare database
// create route for api 
app.get("/", (req, res) => {
    res.send("JWT LECTURE")
});

// app.listen
app.listen(port, () => {
    console.log(`Server is listening to ${port}`)
});