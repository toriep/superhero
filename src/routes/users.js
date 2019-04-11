const express = require('express');
const usersOriginal = require('../data/users');
const { check, validationResult } = require('express-validator/check');
//instaled to enable CORS for testing purpose
const cors = require('cors');

module.exports = app => {
  let usersCopy = [ ...usersOriginal ];
  let userCount = usersCopy.length;

  const router = express.Router();
  router.patch('/food', [
    check('id').exists(),
  ],(req, res) => {
    console.log(req.query); 
    const { id } = req.body;
    let index = null;
    for(let i=0; i<usersCopy.length; i++){
      if(usersCopy[i].id == id){
        index = i;
      }
    }
    usersCopy.splice(index,1);
    res.send({
      success: true,
      usersCopy
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
      console.log('req.body :', req.body);
      res.json({
        success: userCount,
        usersCopy
      })
    } catch (err) {
      console.log('Could not add hero');
      res.status(422).send(err.toString());
    }
  });
  app.use(cors());
  app.use('/users', router);
}