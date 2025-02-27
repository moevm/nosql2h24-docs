import dbSession from "#dbWorker/dbSession.js";

export default class Versions {
    constructor() {
        const db_session = new dbSession()
        this.session = db_session.get_session()
    }

    async get_all_documents_verions_by_DocumentId(DocumentId){
        let result = await this.session.run(`
            MATCH (d:Document {id: $DocumentId})-[:has]->(v:Version)
        RETURN v.id AS VersionId, v.Version AS Version, toString(v.CreationDate) AS CreationDate
        ORDER BY v.Version`,
            { DocumentId: parseInt(DocumentId) });

          console.log(result.records[0],'versii')

          const versions = result.records.map(record => ({
            id: record.get("VersionId"),
            version: record.get("Version"),
            date: record.get("CreationDate")
          }));
          
          console.log(versions);

          return versions;
    }

    async create_new_version_by_documentId(DocumentId){
        let result = await this.session.run(`
            MATCH (d:Document {id: $DocumentId})
            WITH d, coalesce(max((v:Version).id), 0) + 1 AS newVersionId
            WITH d, newVersionId, coalesce(max((d)-[:has]->(v:Version).Version), "0.0") + 1 AS newVersion
            CREATE (v:Version {id: newVersionId, Version: newVersion, CreationDate: datetime()})
            CREATE (d)-[:HAS_VERSION]->(v)
            RETURN v.id AS VersionId, v.Version AS Version, v.CreationDate AS CreationDate
          `, {DocumentId});
          
          const newVersion = result.records[0];
          console.log("New version created:", {
            VersionId: newVersion.get("VersionId"),
            Version: newVersion.get("Version"),
            CreationDate: newVersion.get("CreationDate")
          });
          return newVersion;
    }

}