from neo4j import GraphDatabase


class HelloWorld(GraphDatabase):
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        if self.driver is not None:
            self.driver.close()

    def query(self, query, db=None):
        assert self.driver is not None, "Driver not initialized!"
        session = None
        response = None
        try:
            session = self.driver.session(database=db) if db is not None else self.driver.session()
            response = list(session.run(query))
        except Exception as e:
            print("Query failed:", e)
        finally:
            if session is not None:
                session.close()
        return response


if __name__ == '__main__':
    conn = HelloWorld()
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
