const register=require('../Schema/Register')
const { v4: uuidv4 } = require('uuid')
class UserController{
    static async adduser(
        user_name,email,password
    ){  
        const u_id = uuidv4()
        
        const new_register=await new register({
            user_name,
            email,
            password,
            u_id,
            
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
    static async Post(
        u_id,title,desc
    ){
        const p_id = uuidv4()
        const post=await register.findOneAndUpdate({u_id},
            {$push:{post:{
                p_id,
                title,
                desc
            }}})
            return post
    }
    static async Command(
        u_id,message,p_id
    ){
        const comd=await register.findOneAndUpdate({u_id,'post.p_id':p_id},
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
    _id,user_name
   ){
    const follo=await register.findOneAndUpdate({_id},
        {$push:{followers:{user_name}}})
        return follo
   }
   static async UnFollow(
    _id,user_name
   ){
    const unfollo=await register.findOneAndUpdate({_id},
        {$pull:{followers:{user_name}}})
        return unfollo
   }
}
module.exports=UserController