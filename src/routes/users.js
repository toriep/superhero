const express = require('express');
const usersOriginal = require('../data/users');
const { check, validationResult } = require('express-validator/check');
//instaled to enable CORS for testing purpose
const cors = require('cors');

module.exports = app => {
  let usersCopy = [ ...usersOriginal ];
  let userCount = usersCopy.length;

  const router = express.Router();
  router.delete('/food', (req, res) => {
    console.log(req.query); 
    res.send({
      success: true
    })
  });
  router.get('/foods', (req, res) => {
    const sorted = usersCopy.sort((a, b) => a.id - b.id);

    res.send(sorted);
  });
  router.post('/food', [
    check('hero_name').exists(),
    check('first_name').exists(),
    check('last_name').exists()
  ],(req, res) => {
    try {
      validationResult(req).throw();
      userCount += 1;
      usersCopy.push({
        id: userCount,
        ...req.body
      })
      res.json({
        success: userCount
      })
    } catch (err) {
      res.status(422).send(err.toString());
    }
  });
  app.use(cors());
  app.use('/users', router);
}