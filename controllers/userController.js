const Users = require('../models/Users');

exports.formNewAccount = (req, res) => {
    res.render('newAccount', {
        namePag: 'New Account UpTask'
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

        res.redirect('/init-session');

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