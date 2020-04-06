const Projects = require('../models/Projects');
const Task = require('../models/Tasks');

exports.addTask = async (req, res, next) => {
    // get project of url
    const project = await Projects.findOne({where: {url: req.params.url}});
    // get task
    const {task} = req.body;

    // status 0 incomplete
    const status = 0;
    const projectId = project.id;

    // insert task
    const result = await Task.create({
        task,
        status,
        projectId
    });

    if(!result) return next();

    // redirect
    res.redirect(`/projects/${req.params.url}`);

}