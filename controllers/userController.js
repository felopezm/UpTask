const Users = require('../models/Users');
const sendMail = require('../handlers/email');

exports.formNewAccount = (req, res) => {
    res.render('newAccount', {
        namePag: 'New Account UpTask'
    });
}

exports.formLogin = (req, res) => {
    const { error } = res.locals.messages;
    res.render('login', {
        namePag: 'Login UpTask',
        error
    });
}

exports.newAccount = async (req, res) => {
    // read data
    const { email, password } = req.body;

    try {
        await Users.create({
            email,
            password
        });

        // create url confirmation account
        const confirmtUrl = `http://${req.headers.host}/confirm/${email}`;
        const user = { email };

        await sendMail.sendMail({
            user,
            subject: 'Confirm Account for UpTask',
            confirmtUrl,
            file: 'confirmAccount'
    
        });

        req.flash('correcto','Send an email, confirm your account');
        res.redirect('/login');

    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('newAccount', {
            messages: req.flash(),
            namePag: 'New Account UpTask',
            email,
            password
        });
    }
}

exports.formRestorePassword = (req, res) => {
    res.render('restorePassword', {
        namePag: 'Restore Password of UpTask'
    });
}

exports.confirmAccount = async (req, res) =>{
    const user = await Users.findOne({
        where: {
            email: req.params.email
        }
    });

    if (!user) {
        req.flash('error', 'Not validate');
        res.redirect('/new-account');
    }

    user.active = 1;
    await user.save();

    req.flash('correcto', 'You can login');
    res.redirect('/login');
}