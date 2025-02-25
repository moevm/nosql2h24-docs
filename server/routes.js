import bodyParser from "body-parser";
import express, { response } from "express"
import fs from "fs"


let router = express.Router();

router.get ("/", (req, res) => {
    res.send("Hello world")
})

router.post ("/login", (req, res) => {
    var body = req.body;
    console.log(body)
})

export default router;