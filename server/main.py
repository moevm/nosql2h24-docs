from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from database import DataBase

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
def login():
    return {}

conn = DataBase("neo4j://localhost:7687", "neo4j", "admin")
conn.query('MATCH (n) DETACH DELETE n')
conn.query("CREATE (admin:User {id: 1, login: 'admin', password: 'password'})")

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

