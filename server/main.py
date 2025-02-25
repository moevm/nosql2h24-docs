from fastapi import FastAPI, Response, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from database import DataBase

conn = DataBase("neo4j://localhost:7687", "neo4j", "admin")
conn.query('MATCH (n) DETACH DELETE n')
conn.query("CREATE (admin:User {id: 1, login: 'admin', password: 'admin'})")
conn.query("CREATE (document_1:Document {id: 1, title: 'Документ 1'})")


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

