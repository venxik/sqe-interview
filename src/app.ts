import Express from 'express';
import cors from 'cors';
import router from './router';
import globalErrorHandler from '@middleware/globalErrorHandler';

const App = Express();

App.use(cors());
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

App.use('/api', router);

App.use(globalErrorHandler);

export default App;
