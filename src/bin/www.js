const app = require("../server");
require("../config/db");

app.listen(8000, () =>
    console.log("Port Is Running Successfully at 8000")
);