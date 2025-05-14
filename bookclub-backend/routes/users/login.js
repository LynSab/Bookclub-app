function login(req, res) {
  console.log(req.body)
  res.json({name: 'Lyn'})
}

module.exports = login