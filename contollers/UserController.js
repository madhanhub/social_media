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
            u_id
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
            {$push:{'upload.0.post':{
                p_id,
                title,
                desc
            }}})
            return post
    }
}
module.exports=UserController