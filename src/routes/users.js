const express = require('express');
const usersOriginal = require('../data/users');
const { check, validationResult } = require('express-validator/check');
const cors = require('cors'); //instaled to enable CORS for testing purpose

module.exports = app => {
  let usersCopy = [ ...usersOriginal ];
  let userCount = usersCopy.length;

  const router = express.Router();
  router.patch('/food', [  //switch to patch to obtain item's id in the request's body
    check('id').exists(),
  ],(req, res) => {
    const { id } = req.body;
    let index = null;
    for(let i=0; i<usersCopy.length; i++){//find the index of the item in usersCopy array that matches the id
      if(usersCopy[i].id == id){
        index = i;
      }
    }
    usersCopy.splice(index,1);
    res.send({
      success: true,
      message: 'Item deleted',
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
        message: 'Item added',
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