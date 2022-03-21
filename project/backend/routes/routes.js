const express = require('express');
const router = express.Router();
const Usermanagementcontroller = require('../controllers/userManagementController');
const usermanagementcontroller = new Usermanagementcontroller();

router.get('/', (req, res)=>{
    console.log("API called")
    res.send('from routes');
});

// take input from users and store in database
router.post('/register', (req, res) => {
    usermanagementcontroller.register(req, res);
});

router.post("/login", (req, res)=>{
    usermanagementcontroller.login(req, res);
});

module.exports = router;
// to export variables that can be used in another file