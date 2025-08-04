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

async function fetchUserById(userId) {
  try {
    const result = await connection('users').where('id', userId).select(['*']).first()
    return result
  } catch(err) {
    console.log(err)
    return false
  }
}

async function createNewUser(newUser) {
  try {
    await connection('users').insert(newUser)
    return true
  } catch(err) {
    console.log(err)
    if (err.code == 'ER_DUP_ENTRY') {
      return 'Duplicate'
    } else {
      return false
    }
  }
}

module.exports = { fetchUserByEmail, createNewUser, fetchUserById }