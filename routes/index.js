const express = require('express');
const router = express.Router();

// import express-validator
const { body } = require('express-validator/check');

// import controller
const projectsController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

module.exports = function () {
    router.get('/', projectsController.projectsHome);
    router.get('/new-project', projectsController.formNewProjec);
    router.post('/new-project', 
        body('name').not().isEmpty().trim().escape(),
        projectsController.newProject
    );
    // list projects
    router.get('/projects/:url', projectsController.projectForUrl);

    //update projects
    router.get('/projects/edit/:id', projectsController.formEdit);
    router.post('/new-project/:id', 
        body('name').not().isEmpty().trim().escape(),
        projectsController.updateProject
    );

    // delete project from axios
    router.delete('/projects/:url', projectsController.deleteProject);

    // add new task
    router.post('/projects/:url', taskController.addTask);

    // update task
    router.patch('/tasks/:id', taskController.changeStatusTask);

    // update task
    router.delete('/tasks/:id', taskController.deleteTask);

    // new account
    router.get('/new-account', userController.formNewAccount);
    router.post('/new-account', userController.newAccount);

    return router;
}