const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Usermanagementcontroller = require('../controllers/userManagementController');
const usermanagementcontroller = new Usermanagementcontroller();
const Projectmanagementcontroller = require('../controllers/projectManagementController');
const projectmanagementcontroller = new Projectmanagementcontroller();

router.get('/', (req, res)=>{
    console.log("API called")
    res.send('from routes');
});

router.get('/view-project', (req, res) => {
    projectmanagementcontroller.viewProjects(req, res);
});

router.get('/view-single-project/:id', (req, res) => {
    projectmanagementcontroller.viewSingleProject(req, res);
});

router.get('/view-users', (req, res) => {
    usermanagementcontroller.viewUsers(req, res);
});

// take input from users and store in database
router.post('/user-registration', (req, res) => {
    usermanagementcontroller.register(req, res);
});

router.delete('/delete-user/:id', (req, res) => {
    usermanagementcontroller.deleteUser(req, res);
});

router.post("/login", (req, res)=>{
    usermanagementcontroller.login(req, res);
});

router.post('/add-project', (req, res) => {
    projectmanagementcontroller.addProject(req, res);
});

router.delete('/delete-project/:id', (req, res) => {
    projectmanagementcontroller.deleteProject(req, res);
});

router.put('/update-project/:id', (req, res) => {
    projectmanagementcontroller.updateProject(req, res);
});


// to export variables that can be used in another file 
module.exports = router;
