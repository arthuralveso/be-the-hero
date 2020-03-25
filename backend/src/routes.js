const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// toda a logica ta no controler aqui só chamamos as rotas com os metodos dos controllers


// chamamos o post para fazer login em uma sessão pois ele vai receber o id da ONG e iniciar uma sessão.
routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);


module.exports = routes;