const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./casacriativa-master.db");

//criando o banco de dados
db.serialize(function() { 
    /*
     //criar a tabela
    db.run(`
    CREATE TABLE IF NOT EXISTS ideias(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        imagem TEXT,
        titulo TEXT,
        categoria TEXT, 
        descricao TEXT,
        link TEXT
    );
    `) */

    //inserir dados na tabela
    
    const query = `INSERT INTO ideias(
        imagem,
        titulo,
        categoria,
        descricao,
        link
        ) VALUES (?,?,?,?,?);
    `

    const values = [
    "https://image.flaticon.com/icons/svg/2729/2729077.svg",
    "Receita",
    "Culinária",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque ipsa consequatur rerum vitae amet enim",
    "https://github.com/biaazv",
    ]
/*
    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    }) 
*/


    //deletar dados da tabela
    /* db.run(`DELETE FROM ideias WHERE id = ?`, [2], function(err){
        if (err) return console.log(err)

        console.log("Deletei", this)
    }) */
    
    //consultar dados da tabela
    /* db.all(`SELECT * from ideias`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    }) 
 */
})

module.exports = db;