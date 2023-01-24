import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "remibouilly", // identifiant BDD
    password: "2014b48cf721fb03a60fb5316be2404e", // le password
    database: null, // nom de la base de donnée
});