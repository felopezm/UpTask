const passport = require('passport');
const Users = require('../models/Users');
const crypto = require('crypto');
const Sequelize =  require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');
const sendMail = require('../handlers/email');

exports.authenticateUser = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Both fields are mandatory'
});


exports.userAuthenticate = (req, res, next) =>{
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/login');
}

exports.logout = (req, res) =>{
    req.session.destroy(() => {
        res.redirect('/login');
    })
}

// generate token if user exist
exports.sendToken = async (req, res) => {
    const {email} = req.body;
    const user = await Users.findOne({where:{email}});

    if (!user) {
        req.flash('error', 'E-mail Not exist');
        res.redirect('/restorePassword');
    }

    user.token = crypto.randomBytes(20).toString('hex');
    user.expiration = Date.now() + 3600000; // 1 hour

    // update 
    await user.save();

    // url reset
    const resetUrl = `http://${req.headers.host}/restorePassword/${user.token}`;

    // send mail with token 
    
    await sendMail.sendMail({
        user,
        subject: 'Password Reset',
        resetUrl,
        file: 'restorePassword'

    });    

    req.flash('correcto', 'A message was sent to your email to make the password change.');
    res.redirect('/login');
  
}

exports.validateToken = async (req, res) =>{
    const user = await Users.findOne({
        where:{
            token: req.params.token
        }
    });

    if (!user) {
        req.flash('error', 'Error Token');
        res.redirect('/restorePassword');
    }

    res.render('resetPassword', {
        namePag: 'Reset Password'
    })

}

exports.updatePassword = async (req, res) =>{
    const user = await Users.findOne({
        where:{
            token: req.params.token,
            expiration: {
                [Op.gte] : Date.now()
            }
        }
    });

    if (!user) {
        req.flash('error', 'Not validate');
        res.redirect('/restorePassword');
    }

    // hashear new password
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    user.token = null;
    user.expiration = null;

    await user.save();

    req.flash('correcto', 'Your password update with success');
    res.redirect('/login');
   
}