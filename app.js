// Importa o framework express (Analogia: como se importasse o SpringBoot):
const express = require('express');


// Cria a aplicação do servidor:
const server = express(); // Variável que irá receber as requisições


// Define uma rota do método GET:
// '/curso'-> endpoint    |    req-> recebe    |    res-> responde
server.get('/curso', (req, res) => {
    // Criando o objeto:
    let objeto = {
        propriedade: 'valor'
    };

    // Retornando o objeto:
    return res.json(objeto);

    /* Forma encurtada: return res.json({propriedade: 'valor'}); */
}); 


// Método listen() faz o servidor escutar as requisições em uma porta determinada:
server.listen(8050, () => {
    console.log("O servidor está ligado na porta 8050");
});

// Query params
server.get('/curso', (req, res) => {
    const nome = req.query.nome;
    return res.json({
        curso: `Aprendendo ${nome}`
    })
});

// Route params
server.get('/curso/:id', (req, res) => {
    const id = req.params.id;
    return res.json({
        curso: `Aprendendo ${id}`
    })
});