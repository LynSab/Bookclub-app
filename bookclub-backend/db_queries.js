const knex = require('knex')

const connection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
})

//db query example
connection('users').where('id', 1).select(['email']).then(function (data) {
  console.log('success')
  console.log(data)
}).catch(function (error) {
  console.log(error)
})