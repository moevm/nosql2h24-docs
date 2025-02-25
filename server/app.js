import express from "express"
import routes from "./routes.js"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload";

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    next();
})

app.use ("/", routes)
app.listen (5000)