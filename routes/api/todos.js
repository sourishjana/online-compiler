const express = require('express')
const router = express.Router()
//const config = require('config')
const {check, validationResult} = require('express-validator') 

const User = require('../../models/User') // Importing the User model
const Todo = require('../../models/Todo') // Importing the Post model
const auth= require('../../middleware/auth')


//@route  POST api/todos
//@desc  Create todo
//@access private
router.post('/',[
    auth,[
        check('title','Title is required').not().isEmpty()
    ]
],async (req,res)=>{
    // check if there are errors in validation 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // get the user by using jwt token
        // we dont want to get their password
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.status(404).send('User not authorized')
        }

        // creating the post
        const newTodo =new Todo({
            user:req.user.id,
            title:req.body.title,
            content:req.body.content,
            completed: req.body.completed 
        })

        const todo = await newTodo.save()

        res.json(todo)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})


//@route  PATCH api/todos/:id
//@desc  Update todo
//@access private
router.patch('/:id',[
    auth,[
        check('title','Title is required').not().isEmpty()
    ]
],async (req,res)=>{
    // check if there are errors in validation 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const updates=Object.keys(req.body)
    console.log(updates)

    try {
        const todo=await Todo.findOne({_id:req.params.id, user:req.user.id})

        if(!todo){
            return res.send('Todo not found')
        }

        updates.forEach((key)=>{todo[key]=req.body[key]})
        await todo.save()
        res.send(todo)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

//@route  DELETE api/todos/:id
//@desc  Delete todo
//@access private
router.delete('/:id',auth,async (req,res)=>{
    try{
        const todo=await Todo.findOneAndDelete({_id:req.params.id, user:req.user.id})
        if(!todo){
            return res.send('Todo not found')
        }
        res.send(todo)
    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }
})


//@route  GET api/todos 
//@desc  Get all todo for a user
//@access private
router.get('/', auth, async(req, res)=>{
    try {

        // get all posts of all users
        //console.log
        const todos = await Todo.find({ user:req.user.id }).sort({ date:-1 })

        res.json(todos)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


module.exports = router