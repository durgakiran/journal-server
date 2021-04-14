import app from './app';

const start = async () => {
    // start the server
    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
};

start();
