const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.projectsHome = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({where: {userId}});
    res.render('index', {
        namePag: 'Proyects',
        projects
    });
}

exports.formNewProjec = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({where: {userId}});
    res.render('newProject', {
        namePag: 'New Project',
        projects
    });
}

exports.newProject = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({where: {userId}});
    const { name } = req.body;
    let errores = [];

    if (!name) {
        errores.push({ 'texto': 'Add name to project' })
    }

    if (errores.length > 0) {
        res.render('newProject', {
            namePag: 'New Project',
            errores,
            projects
        })
    } else {
        const userId = res.locals.user.id;
        await Projects.create({ name,userId });
        res.redirect('/');
    }
}

exports.projectForUrl = async (req, res, next) => {
    const userId = res.locals.user.id;
    const projectsPromise = Projects.findAll({where: {userId}});
    const projectPromise = Projects.findOne({
        where:{
            url:req.params.url,
            userId
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    // get tasks for project
    const tasks = await Tasks.findAll({
        where: {
            projectId: project.id
        },
        include: [{
            model: Projects
        }]
    });

    if(!project) return next();

    res.render('tasks',{
        namePag: 'Tasks of Project',
        projects,
        project,
        tasks
    });
}

exports.formEdit = async (req, res) =>{
    const userId = res.locals.user.id;
    const projectsPromise = Projects.findAll({where: {userId}});
    const projectPromise = Projects.findOne({
        where:{
            id:req.params.id,
            userId
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    res.render('newProject',{
        namePag: 'Edit Project',
        projects,
        project
    });
}

exports.updateProject = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Projects.findAll({where: {userId}});
    const { name } = req.body;
    let errores = [];

    if (!name) {
        errores.push({ 'texto': 'Add name to project' })
    }

    if (errores.length > 0) {
        res.render('newProject', {
            namePag: 'New Project',
            errores,
            projects
        })
    } else {
        await Projects.update(
            { name: name },
            { where: { id: req.params.id }}
            );
        res.redirect('/');
    }
}

exports.deleteProject = async (req, res, next) =>{
    // req, query o params
    const {urlProject} = req.query;
    
    const result = await Projects.destroy({
        where: {url: urlProject}
    });

    if(!result)
        return next();

    res.status(200).send('Delete Proyect !');
}
