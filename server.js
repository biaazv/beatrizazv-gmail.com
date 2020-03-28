//express usado para criar e confirgurar o servidor
const express = require("express");
const server = express();

const db = require("./db")


//configurar arquivos estáticos(CSS, scripts, imagens)
server.use(express.static("public"));

//habilitar o uso do req.body
server.use(express.urlencoded({extended: true}));

//configuração do nunjucks - template engine
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true, //desabilitar o cache
});

//rota e captura do pedido do cliente para responder
server.get("/", function(req, res){

    db.all(`SELECT * from ideias`, function(err, rows){
        if (err) { 
            console.log(err)
            res.send("Erro no banco de dados!")
        }

        const ideiasReversas = [...rows].reverse()
        let ultimasIdeias =[]
    
        for (ideia of ideiasReversas) {
            if (ultimasIdeias.length < 2) {
                ultimasIdeias.push(ideia)
            }
        }


        return res.render("index.html", { ideias: ultimasIdeias })
    }) 

    
});

server.get("/ideias", function(req, res){
    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        const ideiasReversas = [...rows].reverse()
        return res.render("ideias.html", {ideias: ideiasReversas})
    })
});

server.post("/", function(req, res){
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
        req.body.imagem,
        req.body.titulo,
        req.body.categoria,
        req.body.descricao,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) { 
            console.log(err)
            res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
});
});

//servidor ligado na porta 3000
server.listen(3000, console.log("rodando hein bb"));
