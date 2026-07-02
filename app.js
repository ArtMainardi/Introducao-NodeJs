// Importa o framework express (Analogia: como se importasse o SpringBoot):
const express = require('express');
// Cria a aplicação do servidor:
const server = express(); // Variável que irá receber as requisições
server.use(express.json()); // Permite que o Express entenda JSON
server.use(express.urlencoded({ extended: true })); // Permite que entenda dados de formulários (URL-encoded)


// ========= MIDDLEWARE =========
/* Um middleware é, essencialmente, uma função que tem acesso aos objetos de 
solicitação (req), resposta (res) e à próxima função de middleware no ciclo 
de solicitação-resposta do aplicativo (geralmente chamada de next). */

server.use((req, res, next) => { // Isso significa que toda e qualquer requisição que chegar ao servidor passará por essa função antes de chegar à rota final
    // next: Uma função que, quando chamada, passa o controle para o próximo middleware ou rota na fila.
    console.log("Requisição chamada");
    return next();
    // Isso é crucial. Ele diz ao Node: "Já fiz o que precisava aqui, pode seguir para a próxima função/rota"
});

// Middleware Local:
function CursoExiste(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({
            erro: "O nome do curso é obrigatório!"
        });
    } else {
        return next();
    }
}


let curso = [];
// ========= MÉTODOS ========= //
// GET:
// '/curso'-> endpoint    |    req-> recebe    |    res-> responde
server.get('/curso', (req, res) => {
    // Retornando o objeto:
    return res.json(curso);

    /* Forma encurtada: return res.json({propriedade: 'valor'}); */
}); 

// Post:
server.post(`/curso`, CursoExiste, (req, res) => {
    const objeto = req.body;
    curso.push(objeto.nome);
    return res.json(curso);
});

// Put:
server.put(`/curso/:id`, CursoExiste, (req, res) => {
    const id = req.params.id;
    const objeto = req.body;

    curso[id] = objeto.nome;
    return res.json(curso);
});

// Delete
server.delete(`/curso/:id`, (req, res) => {
    const id = req.params.id;
    curso.splice(id, 1);
    return res.json(curso);
});


// ====== MÉTODO LISTEN ======
// Faz o servidor escutar as requisições em uma porta determinada:
server.listen(8050, () => {
    console.log("O servidor está ligado na porta 8050");
});


/* ====== PARAMS ======
// Query Params
server.get('/curso', (req, res) => {
    const nome = req.query.nome;
    return res.json({
        curso: `Aprendendo ${nome}`
    })
});
// Route Params
server.get('/curso/:id', (req, res) => {
    const id = req.params.id;
    return res.json({
        curso: `Aprendendo ${id}`
    })
});*/