const app = require('./app')

const port = 8080;

const server = app.listen(port, listening)

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};