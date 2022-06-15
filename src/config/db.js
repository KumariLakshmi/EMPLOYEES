const mongoose = require("mongoose");

const db = "mongodb+srv://kumari:kumari96@cluster0.0vz4a.mongodb.net/EmpData?retryWrites=true&w=majority"

mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, result) => {
        if (err) {
            console.log("Database Connection Error", err);
        }
        else {
            console.log("Database Connected");
        }
    }
);