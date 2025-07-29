const connection = require('./dbConnection')

async function createNewClub(newClub, membershipUserId) {
  try {
    // TODO: TRANSACTION??

    console.log(membershipUserId)
    await connection('clubs').insert({name: newClub})
    const clubDetail = await connection('clubs').where('name', newClub).select(['*']).first()

    memberDetail = {
      club: clubDetail.id,
      user: membershipUserId
    }
    
    const membership = await createNewMembership(memberDetail)

    await createNewBook({"title": 'Not yet set', "author": 'n/a', "club": clubDetail.id})
    
    const date = new Date()
    await createNewMeeting({"date": date, "location": 'Not yet set', "club": clubDetail.id})

    if (membership === true) {
      return true
    } else {
      return false
    }
    
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

    // TODO: amend to use transaction for delete and insert
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
    
    // TODO: amend to use transaction for delete and insert
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