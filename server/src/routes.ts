import express from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

//index, show, create, update, delete

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index)

routes.post('/points', pointsController.create)

routes.get('/points', pointsController.index)

routes.get('/points/:id', pointsController.show)

/*routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });

})*/

// Service pattern
// Repository Pattern

export default routes;

/* const users = [{
    name: 'shiro',
    email: 'shiro@shiros.com'
},
{
    name: 'leo',
    email: 'leo@shiros.com'
}]

// query params => parametros opcionais
// path params => parametros obrigatorios
// body

app.get('/users', (request, response) => {

    const { search } = request.query

    const filtredUsers = search ?
        users.filter(user => user.name.includes(String(search))) : users

    console.log('Listagem de usuários');

    // JSON
    return response.json(filtredUsers);

})

app.get('/users/:id', (request, response) => {

    const { id } = request.params;

    // JSON
    return response.json(users[Number(id)]);

})

app.post('/users', (request,response) => {

    const data = request.body;

    const user = {
        name: data.name,
        email: data.email,
    }

    return response.json(user);

})

*/

