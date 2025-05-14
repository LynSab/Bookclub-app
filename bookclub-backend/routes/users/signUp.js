function signUp(req, res) {
  console.log(req.body)
  res.json({name: 'Lyn'})
}

module.exports = signUp