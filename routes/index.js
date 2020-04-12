const express = require('express');
const router = express.Router();

// import express-validator
const { body } = require('express-validator/check');

// import controller
const projectsController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

module.exports = function () {
    router.get('/',
        authController.userAuthenticate,
        projectsController.projectsHome
     );

    router.get('/new-project',
        authController.userAuthenticate,
        projectsController.formNewProjec
    );

    router.post('/new-project', 
        body('name').not().isEmpty().trim().escape(),
        authController.userAuthenticate,
        projectsController.newProject
    );
    // list projects
    router.get('/projects/:url', 
        authController.userAuthenticate,
        projectsController.projectForUrl
    );
    //update projects
    router.get('/projects/edit/:id',
        authController.userAuthenticate,
        projectsController.formEdit
    );
    router.post('/new-project/:id', 
        body('name').not().isEmpty().trim().escape(),
        authController.userAuthenticate,
        projectsController.updateProject
    );

    // delete project from axios
    router.delete('/projects/:url',
        authController.userAuthenticate,
        projectsController.deleteProject
    );

    // add new task
    router.post('/projects/:url', 
        authController.userAuthenticate,
        taskController.addTask
    );

    // update task
    router.patch('/tasks/:id',
        authController.userAuthenticate,
        taskController.changeStatusTask
    );

    // update task
    router.delete('/tasks/:id', 
        authController.userAuthenticate,
        taskController.deleteTask
    );

    // new account
    router.get('/new-account', userController.formNewAccount);
    router.post('/new-account', userController.newAccount);
    router.get('/confirm/:email', userController.confirmAccount);

    // init session
    router.get('/login', userController.formLogin);
    router.post('/login', authController.authenticateUser);

    // close session
    router.get('/logout', authController.logout);

    // restore password
    router.get('/restorePassword', userController.formRestorePassword);
    router.post('/restorePassword', authController.sendToken);
    router.get('/restorePassword/:token', authController.validateToken);
    router.post('/restorePassword/:token', authController.updatePassword);

    return router;
}