module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "5bad89a3",
    DB: 'torre_db',
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// module.exports = {
//     HOST: "us-cdbr-east-04.cleardb.com", //"localhost",
//     USER: "b738e06269c720", //"root",
//     PASSWORD: "bc8eafb1", //"5bad89a3",
//     DB: "heroku_ce72dd099ae605c", //'torre_db',
//     dialect: "mysql",
//     port: 3306,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };