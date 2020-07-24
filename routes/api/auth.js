const express = require('express')
const router = express.Router()
const auth= require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

const User = require('../../models/User') // importing the User model 

//@route  GET api/auth
//@desc  Load user
//access private
router.get('/', auth ,async(req,res)=>{
    try{
        // get the user of a perticular id as in the auth we send req.user
        // find by id and get the user but we dont want ot get their password 
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message)
        res.status(500).json('Server error')
    }
})


//@route  POST api/auth
//@desc  Login User
//access public
router.post('/', 
[   // this is a middle ware for validation purposes
    check('email','Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists() // exists means user should enter a password
], 
async (req,res)=>{
    // check if there are errors in validation 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    // If no errors in validation
    const { email, password}= req.body

    try{
        // see if users exists
        let user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ errors: [ { msg:"Invalid credentials" } ] })
        }

        // compare passwords
        const isMatch= await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ errors: [ { msg:"Invalid credentials" } ] })
        }

        // return json web token
        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn:3600}, (err, token)=>{
            if (err) throw err
            //res.json({ token, user })
            res.json({ token })
        })

    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router

