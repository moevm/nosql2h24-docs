from fastapi import FastAPI, Response, Body, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from neo4j import GraphDatabase
from database import DataBase
from typing import Optional

import os

NEO4J_URI = "neo4j://localhost:7687"  # Или ваш URI Neo4j
NEO4J_USER = "neo4j"  # Или ваш пользователь
NEO4J_PASSWORD = "admin"  # Или ваш пароль

conn = DataBase("neo4j://localhost:7687", "neo4j", "admin")
conn.query('MATCH (n) DETACH DELETE n')
conn.query("CREATE (admin:User {id: 1, login: 'admin', password: 'admin'})")
# conn.query("CREATE (document_1:Document {id: 1, title: 'Документ 1'})")
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
def login(data = Body()):
    print(data)
    login = data["login"]
    password = data["password"]
    result = conn.query("match (a:User) where a.login = '{}' and a.password = '{}' return a.id".format(login, password))
    if not result:
        return {"success": False}
    return {"success": True, "userId": result[0].get("a.id")}

@app.get("/documents_list")
def document_list():
    result = conn.query("match (a:Document) return a")
    print(result)
    res = [{"id": x['a'].get("id"), "title": x['a'].get("title")} for x in result]
    print(res)
    return res

@app.post("/upload")
async def upload(file: UploadFile = File(...), filename: Optional[str] = None):
    original_filename = file.filename
    file_extension = os.path.splitext(original_filename)[1].lower()  # Получаем расширение файла
    content_type = file.content_type

    if filename:
        safe_filename = filename.replace(" ", "_") + file_extension  # Заменяем пробелы на "_" и добавляем расширение
    else:
        safe_filename = original_filename

    filepath = os.path.join(UPLOAD_DIR, safe_filename)

    with open(filepath, "wb") as f:
        while True:
            chunk =  await file.read(1024 * 1024)  # Читаем файл по частям (chunks)
            if not chunk:
                break
            f.write(chunk)
    
    return {"filename":safe_filename, "filepath":filepath, "message":"Файл успешно загружен"}

@app.post("/create_document")
def create_document(data = Body()):
    title = data['title']
    file = data['filepath']
    user = data['user']
    # print("CREATE ('{}':Document {filepath: '{}', user: '{}'})".format(title, file, user))
    # query = "CREATE ('{}':Document {filepath: '{}', user: '{}'})".format(title, file, user)
    # conn.query(query)

    with GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD)) as driver:
            with driver.session() as session:
                # Используем параметризованный запрос
                query = """
                    CREATE (d:Document {
                        title: $title,
                        filepath: $filepath
                    })
                """
                # Проверка, что данные есть и используем модель DocumentData

                # Вместо небезопасной строки с .format() используем:
                session.run(query, title=title, filepath=file)  # Передача параметров
    # print(data)

# if __name__ == '__main__':
    # Database connection 
    
    # task = ('CREATE (spiderman:Document {title:"требования к костюму челвоека-паука",id:1, '
    #        ' content: "цвет преимущественно красный.должны быть белые линзы.цена 9000",'
    #        'version: "1.0.0"})'
    #        '-[:HAS_SECTION]->'
    #        '(требования:Section {sec_num:1, title:"Требования"})'
    #        '-[:HAS_REQUIREMENT]->'
    #        '(цвет:Requirement{title:"цвет", content:"красный"})-[:APPEARS_IN]->(требования),'
    #         '(требования)'
    #        '-[:HAS_REQUIREMENT]->'
    #         '(линзы:Requirement {title:"линзы", content: "белые"})-[:APPEARS_IN]->(требования),'
    #         '(spiderman)-[:HAS_SECTION]->'
    #         '(цена:Section {sec_num:2,id:2,  title:"Цена"})-[:HAS_KEYWORD]->(стоимость:Price {title:"Цена",content:"9000"})-[:APPEARS_IN]->(цена)')
    # conn.query(task)
    # print(conn.query('MATCH (spiderman)-[:HAS_SECTION]->(требования)-[:HAS_REQUIREMENT]->(r:Requirement) match (spiderman)-[:HAS_SECTION]->(цена)-[:HAS_KEYWORD]->(p:Price) return (r.title +" " + r.content),p.content'))
    # conn.query("Match (n) DETACH DELETE n")

