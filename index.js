const PORT = process.env.PORT || 3000;

const app = require('./app');

const init = () => {
    app.listen(PORT, () => {
        console.log(`Server ready for appointments on port ${PORT}`);
    });
}

init()
