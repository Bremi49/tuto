import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "remibouilly", // identifiant BDD
    password: "2014b48cf721fb03a60fb5316be2404e", // le password
    database: "remibouilly_projet", // nom de la base de donnée
});


// permet d'obtenir le resultat des requete sql async
export const asyncQuery = async (sql, params = []) => {
    return new Promise((resolve, reject)=>{
        pool.query(sql,params, (error, result)=>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}
// import mysql from "mysql";

// export let pool  = mysql.createPool({
//   connectionLimit : 10000,
//     host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
//     user: "anthonycarreta", // identifiant BDD
//     password: "acfff451642c9b6988a8a36616c1ba28", // le password
//     database: "anthonycarreta_exercices", // nom de la base de donnée
// });

export default pool