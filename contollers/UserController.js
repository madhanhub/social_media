const register=require('../Schema/Register')
const post=require('../Schema/Post')
//const { v4: uuidv4 } = require('uuid')
class UserController{
    static async adduser(
        user_name,email,password
    ){  
        //const u_id = uuidv4()
        
        const new_register=await new register({
            user_name,
            email,
            password,
            //u_id,
            
            
        }).save()
        return new_register
   
    }

    static async Login(
        email,password,status
    ){
        const login=await register.findOneAndUpdate({email,password},
            {$set:{status:'active'}})
            return login
    }

    static async Logout(
        password,status
    ){
        const logout=await register.findOneAndUpdate({password},
            {$set:{status:'inactive'}})
            return logout
    }

    static async New_Post(
       _id
    )
    {
        const newPost=await new post({
            _id
        }).save()
        return newPost
    }
    static async Post({
        _id,title,desc,id
    }){
        const Post=await post.findOneAndUpdate({_id},
            {$push:{post:{
                p_id:id,
                title,
                desc,    
            }}},{new:true})
            return Post
    }
    static async Command(
        _id,message,
    ){
        const comd=await post.findOneAndUpdate({_id,'post._id':_id},
            {$push:{'post.$.command':{message}}})
            return comd
    }

    static async Bio(
        u_id,school,college,working,location,native
    ){
        const bio=await register.findOneAndUpdate({u_id},
            {$push:{Bio:{school,college,working,location,native}}})
            return bio
    }
    static async Delete(
        u_id
    )
    {
        const del=await register.findOneAndDelete({u_id})
        return del
    }
    static async List(
        u_id
    )
    {
        const list=await register.findOne({u_id})
        return list
    }
   static async Follow(
    u_id,user_name
   ){
    const follo=await register.findOneAndUpdate({u_id},
        {$push:{followers:{user_name}}})
        return follo
   }
   static async UnFollow(
    u_id,user_name
   ){
    const unfollo=await register.findOneAndUpdate({u_id},
        {$pull:{followers:{user_name}}})
        return unfollo
   }
   static async Following(
    u_id,user_name
   ){
    const following=await register.findOneAndUpdate({u_id},
        {$push:{following:{user_name}}})
        return following
   }
   static async Deleted(
    u_id,user_name
   ){
    const del=await register.findOneAndUpdate({u_id},
        {$pull:{following:{user_name}}})
        return del
   }
   static async Likes(
    u_id,p_id
   ){
    const likees=await post.findOneAndUpdate({u_id,'post.p_id':p_id},
        {$inc:{'post.$.likes':1}})
        return likees
   }
   static async UnLikes(
    u_id,p_id
   ){
    const likee=await post.findOneAndUpdate({u_id,'post.p_id':p_id},
        {$inc:{'post.$.likes':-1}})
        return likee
   }
   static async Request(
    u_id,user_list
   ){
    const reqe=await register.findOneAndUpdate({u_id},
        {$push:{'request.user_list':user_list}})
        return reqe
   }
}
module.exports=UserController