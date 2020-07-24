const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User') // Importing the User model

//@route  POST api/users
//@desc  Register User
//access public
router.post('/',  
[   // this is a middle ware for validation purposes
    check('username', 'Name is Required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password of more then 6 characters').isLength({ min:6 })
], 
async (req,res)=>{
    // check if there are errors in validation 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    // If no errors in validation
    const {username, email, password}= req.body

    try{
        // see if users exists
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ errors: [ { msg:"User already exists" } ] })
        }

        user= new User({
            username, 
            email,
            password
        })

        // encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()

        // return json web token
        const payload={
            username:{
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