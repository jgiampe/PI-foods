//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {

  //Inicialización
  await Diet.bulkCreate([
    {name: 'Gluten Free'},
    {name: 'Ketogenic'},
    {name: 'Vegetarian'},
    {name: 'Lacto-Vegetarian'},
    {name: 'Ovo-Vegetarian'},
    {name: 'Vegan'},
    {name: 'Pescetarian'},
    {name: 'Paleo'},
    {name: 'Primal'},
    {name: 'Low FODMAP'},
    {name: 'Whole30'},
    {name: 'Omnivore'},
   ])
   
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
