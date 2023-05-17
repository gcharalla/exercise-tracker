import server from './services/server';
import { initMongoDB } from './database/db';

const PORT = process.env.PORT ?? 3000;

const init = async() => {
    try {
      await initMongoDB();
      server.listen(PORT);
      console.log(`Listening on port ${PORT}`);
    } catch (error) {
      console.error('Error starting server:', error);
    }
  };
  
init()