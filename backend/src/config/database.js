module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "5bad89a3",
    DB: 'torre_db',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};