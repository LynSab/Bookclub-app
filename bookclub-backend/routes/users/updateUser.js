const { updateUsername } = require('../../db/dbUserQueries');
const { updateUserEmail } = require('../../db/dbUserQueries');
const { updateUserPassword } = require('../../db/dbUserQueries');
const { fetchUserById } = require('../../db/dbUserQueries');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function updateUser(req, res) {
  const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  
  if (req.body.username) {
    const userData = await updateUsername(req.body.username, userId);
        
    if (userData === false) {
      res.json({
        success: 'false',
        body: 'Server error. Please try again.'
      });
    } else {
      res.json({
        success: true,
        body: 'Successfully changed username'
      });
    }
  } else if (req.body.email) {
    const userData = await updateUserEmail(req.body.email, userId);
        
    if (userData === false) {
      res.json({
        success: 'false',
        body: 'Server error. Please try again.'
      });
    } else {
      res.json({
        success: true,
        body: 'Successfully changed email'
      });
    }
  } else if (req.body.currentPassword) {

    const currentRecord = await fetchUserById(userId);
    const passwordMatch = await bcrypt.compare(req.body.currentPassword, currentRecord.password);

    if (passwordMatch === false) {
      res.json({
        success: 'false',
        body: 'Incorrect password.'
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.newPassword, salt);

      const userData = await updateUserPassword(newPassword, userId);

      if (userData === false) {
        res.json({
          success: 'false',
          body: 'Server error. Please try again.'
        });
      } else {
        res.json({
          success: true,
          body: 'Successfully changed password'
        });
      }      
    }
  } else {
    // TODO: update error message?
    res.json({
      success: 'false',
      body: 'Server error. Please try again.'
    });
  }
}

module.exports = updateUser;