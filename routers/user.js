
const express = require('express')
const User = require('../models/user')
const bycrypt = require('bcrypt')
const authenticateUser = require('../middleware/authenticateUser')

const router = express.Router()

router.post('/register',async (req,res)=>{
    const user = new User(req.body)
    try{
         const hashedPW = await bcrypt.hash(user.password,8)
         user.password = hashedPW
         const u = await user.save()
         req.session.user_id = u._id
         res.redirect('/dashboard')
 
    }catch(error){
         res.redirect('/')
    }
 
 })

router.get('/dashboard',authenticateUser,async (req,res)=>{
    
    res.render('dashboard',{username:req.user.username})
})

router.get('/topsecret',authenticateUser,async (req,res)=>{
    res.send(req.user)
})

router.post('/logout',authenticateUser,(req,res)=>{
    req.session.destroy(()=>{
        console.log('Logged out successfully')
        res.redirect('/')
    })
})


router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            console.log("Auth error")
            return res.redirect('/')
        }

        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            console.log("Auth error")
            return res.redirect('/')
        }
        req.session.user_id = user._id
        res.redirect('/dashboard')

    } catch(err){
        console.log("Login error")
        res.redirect('/')
    }
})

module.exports = router