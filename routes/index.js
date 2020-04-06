const express = require('express');
const router = express.Router();

// import express-validator
const { body } = require('express-validator/check');

// import controller
const projectsController = require('../controllers/projectController');

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


    return router;
}