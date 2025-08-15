const connection = require('./dbConnection')

async function createNewClub(newClub, membershipUserId) {
  try {
    await connection.transaction(async (trx) => {
      await trx('clubs').insert({name: newClub})

      const clubDetail = await trx('clubs').where('name', newClub).select(['*']).first()

      memberDetail = {
        club: clubDetail.id,
        user: membershipUserId
      }
      await trx('memberships').insert(memberDetail)

      await trx('books').insert({"title": 'Not yet set', "author": 'n/a', "club": clubDetail.id})

      const date = new Date()
      await trx('meetings').insert({"date": date, "location": 'Not yet set', "club": clubDetail.id})

      return true
    })
  } catch(err) {
    console.log(err)
    if (err.code === 'ER_DUP_ENTRY') {
      return 'Duplicate'
    } else {
      return false
    }
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

    await connection.transaction(async (trx) => {
      if (currentBook) {
        await trx('books').where('id', currentBook.id).del()
      }

      await trx('books').insert(newBook)
      return true
    })
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
    
    await connection.transaction(async (trx) => {
      if (currentMeeting) {
        await trx('meetings').where('id', currentMeeting.id).del()
      }
  
      await trx('meetings').insert(newMeeting)
      return true
    })
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

async function fetchClubDetailsByClubId(clubID) {
  try {
    const result = await connection('clubs')
      .join('memberships', 'clubs.id', 'memberships.club')
      .join('users', 'memberships.user', 'users.id')
      .join('meetings', 'clubs.id', 'meetings.club')
      .join('books', 'clubs.id', 'books.club')
      .where('clubs.id', clubID)
      .select({
        club: 'clubs.name',
        members: 'users.username',
        memberId: 'users.id',
        meetingDate: 'meetings.date',
        meetingLocation: 'meetings.location',
        bookTitle: 'books.title',
        bookAuthor: 'books.author'
      })
      return result
  } catch(err) {
    console.log(err)
    return false
  }
}

module.exports = { createNewClub, createNewMembership, createNewBook, createNewMeeting, fetchClubsByMembership, fetchClubDetailsByClubId }