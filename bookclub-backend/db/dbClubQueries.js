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

async function fetchBookByClub(clubID) {
  try {
    const result = await connection('books').where('club', clubID).select(['*']).first()
    return result
  } catch(err) {
    console.log(err)
    return false
  }
}

async function createNewBook(newBook) {
  try {
    const currentBook = await fetchBookByClub(newBook.club)

    if (currentBook) {
      await connection('books').where('id', currentBook.id).del()
    }

    await connection('books').insert(newBook)
    return true

  } catch(err) {
    console.log(err)
    return false
  }
}

async function fetchMeetingByClub(clubID) {
  try {
    const result = await connection('meetings').where('club', clubID).select(['*']).first()
    return result
  } catch(err) {
    console.log(err)
    return false
  }
}

async function createNewMeeting(newMeeting) {
  try {
    const currentMeeting = await fetchMeetingByClub(newMeeting.club)

    if (currentMeeting) {
      await connection('meetings').where('id', currentMeeting.id).del()
    }

    await connection('meetings').insert(newMeeting)
    return true

  } catch(err) {
    console.log(err)
    return false
  }
}

async function fetchClubsByMembership(userID) {
  try {
    const result = await connection('clubs').leftJoin('memberships', 'clubs.id', 'memberships.club').where('memberships.user', userID).select('clubs.id', 'clubs.name')
    return result
  } catch(err) {
    console.log(err)
    return false
  }
}

module.exports = { createNewClub, createNewMembership, createNewBook, createNewMeeting, fetchClubsByMembership }