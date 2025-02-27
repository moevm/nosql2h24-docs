import dbSession from "#dbWorker/dbSession.js";

export default class DocEntries {
    constructor() {
        const db_session = new dbSession()
        this.session = db_session.get_session()
    }
    async get_all_user_docEntries_by_userId(UserId) {
        console.log(UserId);
    
        let result = await this.session.run(
            `MATCH (u:User {Userid: $userId})-[:uploads]->(d:Document)
             OPTIONAL MATCH (d)-[:has]->(v:Version)
             WITH d, u, 
                  coalesce(collect(v.id), []) AS versions, 
                  coalesce(max(v.CreationDate), d.CreationDate) AS last_updated
             RETURN {
               id: d.id,
               title: d.Title,
               author: u.Login,
               version: versions,
               updated: toString(last_updated)
             } AS document`,
            { userId: parseInt(UserId) } // Приводим UserId к числу, если необходимо
        );
    
        if (result.records.length > 0) {
            let documents = result.records.map(record => record.get("document"));
            console.log(documents);
            return documents;
        } else {
            console.log("Документы не найдены");
            return [];
        }
    }
}