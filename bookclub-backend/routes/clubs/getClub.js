const {fetchClubDetailsByClubId} = require('../../db/dbClubQueries');
const dayjs = require('dayjs');

async function getClub(req, res) {
  
  const clubId = req.params.id;

  const bookclub = await fetchClubDetailsByClubId(clubId);

  if (bookclub && bookclub.length) {
    const clubRecord = {
      name: bookclub[0].club,
      members: [],
      book: {
        name: bookclub[0].bookTitle,
        author: bookclub[0].bookAuthor
      },
      meeting: {
        date: dayjs(bookclub[0].meetingDate).format('HH:mm on DD-MM-YYYY'),
        location: bookclub[0].meetingLocation
      }
    };

    for (const record of bookclub) {
      clubRecord.members.push({name: record.members, id: record.memberId});
    }

    res.json(clubRecord);
  } else {
    res.json({
      success: false,
      body: 'Server error. Please try again.'
    });
  }
}

module.exports = getClub;