function logout(req, res) {
  res.clearCookie('token', {httpOnly: true}).json({success: 'true'});
}

module.exports = logout;