import dbSession from "#dbWorker/dbSession.js";

export default class Doc {
    constructor() {
        const db_session = new dbSession()
        this.session = db_session.get_session()
    }

    async create_new_document_by_userId(UserId, DocId, Title){
        let result = await session.run(`
              MATCH (u:User {Userid: UserId})
              MATCH (v:Version)
              WITH u, coalesce(max(v.id), 0) + 1 AS newVersionId
              CREATE (d:Document {id: $docId, Title: $title})
              CREATE (u)-[:uploads]->(d)
              CREATE (v:Version {id: newVersionId, Version: 1, CreationDate: datetime()})
              CREATE (d)-[:has]->(v)
              RETURN d.id AS DocumentId, d.Title AS Title, v.id AS VersionId, v.Version AS Version, v.CreationDate AS CreationDate
          `, { UserId, DocId, Title });
          
        let newDocument = result.records[0];
        console.log("New document created:", {
            DocumentId: newDocument.get("DocumentId"),
            Title: newDocument.get("Title"),
            VersionId: newDocument.get("VersionId"),
            Version: newDocument.get("Version"),
            CreationDate: newDocument.get("CreationDate")
          });
    }
}