const User = require('../models/user')

async function authenticateUser(req,res,next){
    if(!req.session.user_id){
        console.log("This page requires authentication")
        return res.redirect('/')

    }
    req.user = await User.findById(req.session.user_id)

    next()
}

module.exports = authenticateUser