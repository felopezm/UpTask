const Projects = require('../models/Projects');

exports.projectsHome = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('index', {
        namePag: 'Proyects',
        projects
    });
}

exports.formNewProjec = async (req, res) => {
    const projects = await Projects.findAll();
    res.render('newProject', {
        namePag: 'New Project',
        projects
    });
}

exports.newProject = async (req, res) => {
    const projects = await Projects.findAll();
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
        await Projects.create({ name });
        res.redirect('/');
    }
}

exports.projectForUrl = async (req, res) => {
    const projectsPromise = Projects.findAll();
    const projectPromise = Projects.findOne({
        where:{
            url:req.params.url
        }
    });

    const [projects, project] = await Promise.all([projectsPromise, projectPromise]);

    if(!project) return next();

    res.render('tasks',{
        namePag: 'Tasks of Project',
        projects,
        project
    });
}

exports.formEdit = async (req, res) =>{
    const projectsPromise = Projects.findAll();
    const projectPromise = Projects.findOne({
        where:{
            id:req.params.id
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
    const projects = await Projects.findAll();
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
