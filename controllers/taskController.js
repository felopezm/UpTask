const Projects = require('../models/Projects');
const Task = require('../models/Tasks');

// params = /:variable in the router
// query = declaration variable for url

exports.addTask = async (req, res, next) => {
    // get project of url
    const project = await Projects.findOne({ where: { url: req.params.url } });
    // get task
    const { task } = req.body;

    // status 0 incomplete
    const status = 0;
    const projectId = project.id;

    // insert task
    const result = await Task.create({
        task,
        status,
        projectId
    });

    if (!result) return next();

    // redirect
    res.redirect(`/projects/${req.params.url}`);

}

exports.changeStatusTask = async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });

    // change status
    let status = 0;
    if (task.status === status) {
        status = 1;
    }

    task.status = status;
    const result = await task.save();

    if (!result) return next();

    res.status(200).send('update ok..');
}

exports.deleteTask = async (req, res, next) => {
    const { id } = req.params;

    const result = await Task.destroy({
        where: { id }
    });

    if (!result) return next();

    res.status(200).send('Delete Task ok..');
}