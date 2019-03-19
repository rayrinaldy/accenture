var express = require('express');
var router = express.Router();
var UserController = require('./controller/AdminController');

// Get all user list
router.get('/', UserController.list);

// Edit users
router.get('/edit/:id', UserController.edit);

// update user
router.post('/update/:id', UserController.update);

// Delete user
router.post('/delete/:id', UserController.delete);

// Send Email
router.post('/mail', UserController.email);

module.exports = router;
