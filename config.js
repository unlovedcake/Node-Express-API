const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "127.1.1.0",
        user: "root",
        password: "",
        database: "node-express",
    },
    listPerPage: 10,
};


module.exports = config;