const connection = require('./dbConnection')

async function fetchUserByEmail(userEmail) {
  try {
    const result = await connection('users').where('email', userEmail).select(['*']).first()
    return result
  } catch(err) {
    console.log(err)
    return false
  }
}

module.exports = { fetchUserByEmail }