// npm install mysql2
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'escola'
});

connection.connect((erro) => {
    if(erro){
        console.log("Erro ao conectar: ", erro);
        return;
    }
    console.log("Banco conectado com sucesso!");
});

//Exportar o objeto connection
module.exports = connection;