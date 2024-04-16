const express = require('express')
const app=express()
const morgan=require('morgan')
const mongoose= require('mongoose')
const bodyParser = require('body-parser')
const path= require('path')
const { v4: uuidv4 } = require('uuid')

// const axios=require('axios')
const dotenv=require('dotenv').config()
const jsonwebtoken=require('jsonwebtoken')

const authorization = require('./functions/auth')
const cors= require('./functions/cors')

const register=require('./Schema/Register')
// const admin=require('./Schema/Admin')
// const { register } = require('module')

const UserController=require('./contollers/UserController')

app.use(express.json())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors)

app.listen(3333, () => {
	console.log('SERVER Run')

	mongoose.set('strictQuery', false)
	//connecting mongodb
	mongoose
		.connect(`mongodb+srv://madhan91101:Mcabca%409@klncollege.ab2hmvj.mongodb.net/`
			//process.env.MYDB_CONNECTION,
		// 	, {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
)
		.then(() => {
			conn = mongoose.connection
			console.log('database Connected')
		})
		.catch((error) => {
			console.log('Error connecting to MongoDB:', error)
		})
})

app.get('/', async (req, res) => {
	res.json('welcome ')
})

app.post('/user',async(req,res)=>{
    try{
        const{user_name,email,password}=req.body
        const new_user=await UserController.adduser(
            user_name,
            email,
            password, 
           
              
    )
        res.status(200).json({message:'new commer',data:new_user})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
    

app.post('/user/login',async(req,res)=>{
    try{
        const {email,password,status}=req.body
        const Login=await UserController.Login(
            email,password,status
        )

            if(Login){
                {
                  let token= await jsonwebtoken.sign({id:Login.id,user_name:Login.user_name,email:Login.email,u_id:Login.u_id},process.env.SECRET)
                  res.setHeader('token',token)
                  res.setHeader('id',Login.id)
                  res.setHeader('user_name',Login.user_name)
                  res.setHeader('email', Login.email)
                  res.setHeader('u_id',Login.u_id)
                 
                  
                  res.status(200).json({message:"login successfully",data:token})
                }
            }
        
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/user/logout',async(req,res)=>{
    try{
        const {password,status}=req.body
        const logout=await UserController.Logout(
            password,
            status
        )
            res.status(200).json({message:'logout successfully',data:logout})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/user/post',authorization,async(req,res)=>{
    try{
        const{title,desc}=req.body
        const post=await UserController.Post(
            req.u_id,
            title,
            desc
        )
            res.status(200).json({message:'post uploaded',data:post})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/post/command',authorization,async(req,res)=>{
    try{
        const { _id,message,p_id}=req.body
        const comman=await UserController.Command(
            _id,
            message,
            p_id
        )
            res.status(200).json({message:'command placed',data:comman})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/user/bio',authorization,async(req,res)=>{
    try{
        const{ _id,school,college,working,location,native}=req.body
        const bio=await UserController.Bio(
            _id,school,college,working,location,native
        )
            res.status(200).json({message:'bio updated',data:bio})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

