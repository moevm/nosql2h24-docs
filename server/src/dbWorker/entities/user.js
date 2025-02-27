import dbSession from "#dbWorker/dbSession.js";

export default class User {
    constructor() {
        const db_session = new dbSession()
        this.session = db_session.get_session()
    }

    async get_user_by_id(UserId) {
        const result = await this.session.run(`
            MATCH (u:User {Userid: $userid})
            RETURN u.Login AS Login
          `, { UserId });
          
        if (result.records.length > 0) {
            let login = result.records[0].get("Login");
            console.log("Login:", login);
          } else {
            console.log("User not found");
        }
    }

    async get_userId_by_login_and_password(login, password){
            let result = await this.session.run(
                `MATCH (u:User {Login: $login, Password: $password})
                 RETURN u.Userid AS Userid`,
                { login: login, password: password }
            );
            console.log(result.records[0].get('Userid')); // Получить значение по ключу "Userid"
           return result.records[0].get('Userid')

        
    }
}