var express = require('express')
var router = express.Router()
const Clients = require('../models/Clients')

// Get All Clinets
router.get('/clients', (req, res, next) => {
  Clients.findAll()
    .then(tasks => {
      res.json(tasks)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/client', (req, res, next) => {
  if (!req.body.name) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    Clients.create(req.body)
      .then(() => {
        res.send('Clients Added!')
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }
})

router.delete('/client/:id', (req, res, next) => {
  Clients.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send('Clients deleted!')
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// Update Clients
router.put('/client/:id', (req, res, next) => {
	console.log(req.body);
	
	
  if (!req.body.name) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    Clients.update(
      { name: req.body.name, data: req.body.data  },
      { where: { id: req.params.id } }
    )
      .then(() => {
        res.send('Clients Updated!')
      })
      .error(err => handleError(err))
  }
})

module.exports = router
