const express = require('express')
const app=express()
const morgan=require('morgan')
const mongoose= require('mongoose')
const bodyParser = require('body-parser')
const path= require('path')


const upload= require('./functions/upload_images')
const multer=require('multer')
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'photo')
  },
  filename:(req,file,cb)=>{
  cb(null,file.originalname)
    }
})
const photo=multer({storage})
app.set('viewengine','ejs')

// const axios=require('axios')
const dotenv=require('dotenv').config()
const jsonwebtoken=require('jsonwebtoken')

const authorization = require('./functions/auth')
const cors= require('./functions/cors')
const post=require('./Schema/Post')
const register=require('./Schema/Register')
//const admin=require('./Schema/Admin')


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
        const existingUser = await register.findOne({ email })

		if (existingUser) {
			return res.status(401).json({ message: 'User already exists' })
		}
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

app.post('/post',async(req,res)=>{
    try{
        const {title,desc,likes,u_id}=req.body
        const newPost= await UserController.New_Post(
            title,
            desc,
            likes,
            u_id
            
        )
        res.status(200).json({message:'success',data:newPost})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/user/post',authorization,async(req,res)=>{
    try{
        const{title,desc,likes}=req.body
        const post=await UserController.Post(
            
            req.u_id,
            title,
            desc,
            likes
        )
            res.status(200).json({message:'post uploaded',data:post})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/post/command',authorization,async(req,res)=>{
    try{
        const {message,p_id}=req.body
        const comman=await UserController.Command(
            req.u_id,
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
        const{ school,college,working,location,native}=req.body
        const bio=await UserController.Bio(
           req.u_id,school,college,working,location,native
        )
            res.status(200).json({message:'bio updated',data:bio})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/user/delete',authorization,async(req,res)=>
{
    try{
        const u_id=req.u_id
        const dele=await UserController.Delete(u_id)
            res.status(200).json({message:'deleted successfully',data:dele})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/user/list',authorization,async(req,res)=>{
    try{
        const u_id=req.u_id
        const list=await UserController.List(
            u_id
        )
        res.status(200).json({message:'listed successfully',data:list})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})
app.post('/upload',photo.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', fileInfo: req.file })
    res.json(req.file)
  })
  app.post('/admin/view',async(req,res)=>{
    try{
        const view=await register.findOne({_id:req.body._id})
        res.status(200).json({message:'success',data:view})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })
  
  app.post('/user/fans',authorization,async(req,res)=>{
    try{
        const{user_name}=req.body
        const fol=await UserController.Follow(
            req.u_id,
            user_name
            )
            res.status(200).json({message:'success',data:fol})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })

  app.post('/user/unfollowers',authorization,async(req,res)=>{
    try{
        const{user_name}=req.body
        const unfol=await UserController.UnFollow(
            req.u_id,
            user_name
            )
            res.status(200).json({message:'success',data:unfol})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })

  app.post('/share',async(req,res)=>{
    try{
        const share=await register.findOne({_id:req.body._id},{post:1})
        var pos=share
        await register.findOneAndUpdate({u_id:req.body.u_id},
            {$push:{post:{title:req.body.title,desc:req.body.desc}}},
            {new:true})
        res.status(200).json({message:'success',data:pos})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })
  
  app.post('/user/following',authorization,async(req,res)=>{
    try{
        const {user_name}=req.body
        const foll=await UserController.Following(
            req.u_id,
            user_name
        )
        res.status(200).json({message:'succes',data:foll})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  }) 

  app.post('/user/delete/request',authorization,async(req,res)=>{
    try{
        const{user_name}=req.body
        const del=await UserController.Deleted(
            req.u_id,
            user_name
        )
        res.status(200).json({message:'success',data:del})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })
  app.post('/post/likes',authorization,async(req,res)=>{
    try{
        const{p_id}=req.body
        const likee=await UserController.Likes(
            req.u_id,
            p_id
        )
            res.status(200).json({message:'success',data:likee})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })

  app.post('/post/unlikes',authorization,async(req,res)=>{
    try{
        const{p_id}=req.body
        const likees=await UserController.UnLikes(
            req.u_id,
            p_id
        )
            res.status(200).json({message:'success',data:likees})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })

  app.post('/user/request',authorization,async(req,res)=>{
    try{
        const{user_list}=req.body
        const reqe=await UserController.Request(
            req.u_id,
            user_list
        )
            res.status(200).json({message:'success',data:reqe})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })
  
  app.post('/request/accept',async(req,res)=>{
    try{
        const { u_id, user_list } = req.body
      const update=await register.findOne({u_id:req.body.u_id},{'request.user_list':req.body.user_list})
      const Toupdate=update.request.user_list
      await register.findOneAndUpdate({u_id:u_id},
        {$push:{following:{user_name:user_list}}})
        res.status(200).json({message:'success',data:Toupdate})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
  })

  