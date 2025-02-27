import neo4j from 'neo4j-driver'
import fs from 'fs'
import csv from 'csv-parser'

export default class dbSession {
    static instance = null;

    constructor() {
        if (dbSession.instance) {
            return dbSession.instance;
        }
        // Настройка подключения к Neo4j
        this.driver = neo4j.driver("bolt://db:7687", neo4j.auth.basic("neo4j", "12345678"),{ disableLosslessIntegers: true } );
        this.session = this.driver.session();
        dbSession.instance = this;
    }
    async init_db() {
        // Функция для инициализации базы данных из CSV
        // const results = [];
        // fs.createReadStream(csvFilePath)
        //     .pipe(csv())
        //     .on('data', (data) => results.push(data))
        //     .on('end', async () => {
        //     for (const row of results) {
        //         // Пример запроса для создания узлов
        //         await this.session.run('CREATE (n:Node {name: $name})', { name: row.name });
        //     }
        //     console.log('Database initialized');
        //     });
        for (const query of QUERY_INIT) {
            await this.session.run(query)
        }

        // const result = await this.session.run(
        //     "MATCH (u:User) RETURN u.Userid AS Userid, u.Login AS Login"
        //   );

        // console.log(result.records
//         const result = await this.session.run(
//             "MATCH (u:User) RETURN u.Userid AS Userid, u.Login AS Login"
//           )

//         console.log(result.records)
        
//         result.records.forEach(record => {
//         console.log(record.get("Userid")); // Получить значение по ключу "Userid"
//         console.log(record.get("Login"));  // Получить значение по ключу "Login"
//   });

        let result = await 
        this.session.run(`MATCH (u:User {Userid: 2})-[:uploads]->(d:Document)
                  OPTIONAL MATCH (d)-[:has]->(v:Version)
                  WITH d, u, collect(v.id) AS versions, max(v.CreationDate) AS last_updated
                  RETURN {
                    id: d.id,
                    title: d.Title,
                    author: u.Login,
                    version: versions,
                    updated: toString(last_updated)
                } AS document`)
        let documents = result.records.map(record => record.get("document"))
        //documents.forEach(doc => )
        console.log(documents);
    }

    get_session() {
        return this.session
    }

}

const QUERY_INIT = [
`// Параметры для создания пользователей
WITH [
    {Userid: 1, Login: "user1", Password: "pass1"}
] AS users

// Создание пользователей
UNWIND users AS user
CREATE (u:User)
SET u = user

// Параметры для создания документов первого пользователя
WITH u, [
    {id: 11, Title: "Document 1.1", versions: [
        {id: 111, Version: 1, CreationDate: datetime()},
        {id: 112, Version: 2, CreationDate: datetime()}
    ]},
    {id: 12, Title: "Document 1.2", versions: [
        {id: 121, Version: 1, CreationDate: datetime()},
        {id: 122, Version: 2, CreationDate: datetime()},
        {id: 123, Version: 3, CreationDate: datetime()},
        {id: 124, Version: 4, CreationDate: datetime()}
    ]}
] AS documents
WHERE u.Userid = 1

// Создание документов и версий для первого пользователя
UNWIND documents AS doc
CREATE (d:Document)
SET d.id = doc.id, d.Title = doc.Title
CREATE (u)-[:uploads]->(d)

// Добавляем WITH перед UNWIND для передачи контекста
WITH d, doc, u
UNWIND doc.versions AS version
CREATE (v:Version)
SET v = version
CREATE (d)-[:has]->(v)

// Параметры для создания тегов
WITH v, u, [
    {id: 1, start: 0, end: 10},
    {id: 2, start: 20, end: 30},
    {id: 3, start: 40, end: 50},
    {id: 4, start: 60, end: 70},
    {id: 5, start: 80, end: 90},
    {id: 6, start: 100, end: 110}
] AS tags

// Создание тегов для каждой версии (3 тега на версию)
UNWIND tags[0..3] AS tag
CREATE (t:Tag)
SET t = tag
CREATE (v)-[:contains]->(t)`,
`// Параметры для создания пользователей
WITH [
    {Userid: 2, Login: "Matvey", Password: "12345678"}
] AS users

UNWIND users AS user
CREATE (u:User)
SET u = user

// Параметры для создания документов второго пользователя
WITH u, [
    {id: 1, Title: "Document 2.1", versions: [
        {id: 1, Version: 1, CreationDate: datetime ("2023-10-25T14:30:45.123456789Z")},
        {id: 2, Version: 2, CreationDate: datetime("2023-10-25T14:30:45.123456789Z")}
    ]},
    {id: 2, Title: "Document 2.2", versions: [
        {id: 3, Version: 1, CreationDate: datetime("2023-10-25T14:30:45.123456789Z")},
        {id: 4, Version: 2, CreationDate: datetime("2023-10-25T14:30:45.123456789Z")},
        {id: 5, Version: 3, CreationDate: datetime("2023-10-25T14:30:45.123456789Z")}
    ]},
    {id: 3, Title: "Document 2.4", versions: [
        {id: 241, Version: 1, CreationDate: datetime("2023-10-25T14:30:45.123456789Z")}
    ]}
] AS documents
WHERE u.Userid = 2

// Создание документов и версий для второго пользователя
UNWIND documents AS doc
CREATE (d:Document)
SET d.id = doc.id, d.Title = doc.Title
CREATE (u)-[:uploads]->(d)

// Добавляем WITH перед UNWIND для передачи контекста
WITH d, doc, u
UNWIND doc.versions AS version
CREATE (v:Version)
SET v = version
CREATE (d)-[:has]->(v)`
]

const QUERY_MATCH=[
`MATCH (u:User)
RETURN u;`]