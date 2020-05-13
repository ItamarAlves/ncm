import { Router } from 'express';
import NcmController from './controllers/NcmController';

const routes = new Router();

routes.get('/', (request, response) => {
  return response.json({message: "ok"});
});

routes.get('/ncm', NcmController.index);

export default routes;