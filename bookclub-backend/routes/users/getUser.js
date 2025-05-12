function getUser(req, res){
  console.log(req.params)
  res.json({name: 'Lyn'})
}

module.exports = getUser