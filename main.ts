import { DB         } from './server/db';
import { Server     } from './server/server';
import { mainRouter } from './main.router';

const db     = new DB();
const server = new Server();

db.bootstrap().then(() => {
    server.bootstrap([
        mainRouter
    ]).then(server => {
        console.log('Server is listening on:', server.application.address());
    }).catch(error => {
        console.log('Server failed to start...');
        console.error(error);
        process.exit(1);
    });
});
