import express from 'express';

const app = express();

console.log('Server iniciado');


app.get('/users', (request, response) => {

    console.log('Listagem de usuários');

    // JSON
    response.json({message: 'Hello World'});
    
})


app.listen(3333);