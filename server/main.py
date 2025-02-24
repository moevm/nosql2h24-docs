from flask import Flask
from database import DataBase
from flask_restx import Api, Resource, fields
import jwt


app = Flask(__name__)
rest_api = Api(app)

singin_model = rest_api.model(
    'SignInModel', {
        'login':fields.String(required=True),
        'password': fields.String(required=True)
    }
)

@rest_api.route('/login')
class Login(Resource):

    @rest_api.expect(singin_model, validate=True)
    def get(self):
        
        req_data = request.get_json()

        _login = req_data.get("login")
        _password = req_data.get("password")


if __name__ == '__main__':

    # Database connection 
    conn = DataBase("neo4j://localhost:7687", "neo4j", "admin")
    conn.query('MATCH (n) DETACH DELETE n')
    task = ('CREATE (spiderman:Document {title:"требования к костюму челвоека-паука",id:1, '
           ' content: "цвет преимущественно красный.должны быть белые линзы.цена 9000",'
           'version: "1.0.0"})'
           '-[:HAS_SECTION]->'
           '(требования:Section {sec_num:1, title:"Требования"})'
           '-[:HAS_REQUIREMENT]->'
           '(цвет:Requirement{title:"цвет", content:"красный"})-[:APPEARS_IN]->(требования),'
            '(требования)'
           '-[:HAS_REQUIREMENT]->'
            '(линзы:Requirement {title:"линзы", content: "белые"})-[:APPEARS_IN]->(требования),'
            '(spiderman)-[:HAS_SECTION]->'
            '(цена:Section {sec_num:2,id:2,  title:"Цена"})-[:HAS_KEYWORD]->(стоимость:Price {title:"Цена",content:"9000"})-[:APPEARS_IN]->(цена)')
    conn.query(task)
    print(conn.query('MATCH (spiderman)-[:HAS_SECTION]->(требования)-[:HAS_REQUIREMENT]->(r:Requirement) match (spiderman)-[:HAS_SECTION]->(цена)-[:HAS_KEYWORD]->(p:Price) return (r.title +" " + r.content),p.content'))
    #conn.query("Match (n) DETACH DELETE n")

    # Server starting 
    app.run(debug=True)
