const connection = require('./dbConnection')

async function createNewClub(newClub) {
  try {
    await connection('clubs').insert({name: newClub})
    return true
  } catch(err) {
    console.log(err)
    return false
  }
}

async function createNewMembership(newMembership) {
  try {
    await connection('memberships').insert(newMembership)
    return true
  } catch(err) {
    console.log(err)
    return false
  }
}

module.exports = { createNewClub, createNewMembership }