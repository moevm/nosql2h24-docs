import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload";
import neo4j from 'neo4j-driver'

const driver = neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "admin"))
const session = driver.session()
// await session.run('MATCH (n) DETACH DELETE n')
session.run (`CREATE (admin)`)
// await session.run(`CREATE (spiderman:Document {title:"требования к костюму челвоека-паука",id:1,  
//             content: "цвет преимущественно красный.должны быть белые линзы.цена 9000", 
//            version: "1.0.0"}) 
//            -[:HAS_SECTION]-> 
//            (требования:Section {sec_num:1, title:"Требования"}) 
//            -[:HAS_REQUIREMENT]-> 
//            (цвет:Requirement{title:"цвет", content:"красный"})-[:APPEARS_IN]->(требования), 
//             (требования) 
//            -[:HAS_REQUIREMENT]-> 
//             (линзы:Requirement {title:"линзы", content: "белые"})-[:APPEARS_IN]->(требования), 
//             (spiderman)-[:HAS_SECTION]-> 
//             (цена:Section {sec_num:2,id:2,  title:"Цена"})-[:HAS_KEYWORD]->(стоимость:Price {title:"Цена",content:"9000"})-[:APPEARS_IN]->(цена)`)

            
let router = express.Router();

router.get ("/", (req, res) => {
    res.send("Hello world")
})

router.post ("/login", (req, res) => {
    var body = req.body;
    console.log(body)
})

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    next();
})

app.use ("/", router)
app.listen (5000)
session.close()
driver.close()