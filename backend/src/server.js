const App = require('./index');

App.listen(process.env.PORT, () => {
    console.log(`Listening on localhost:${process.env.PORT}`)
});