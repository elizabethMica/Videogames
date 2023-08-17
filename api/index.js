
const server = require('./src/app.js');
const { genresOnDB } = require('./src/controllers/genresOnDB');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ alter: true }).then(async() => {
  await genresOnDB()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
