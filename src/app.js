import env from 'dotenv';
import dbConnect from './api/config/dbConnection.js';
import app from "./api/server.js";

env.config()

dbConnect()

// const PORT = process.env.PORT || 3000;
const PORT = 4003;

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
    console.log(`http://localhost:${PORT}`)
})