const register=require('../Schema/Register')
class UserController{
    static async adduser(
        user_name,email,password,u_id
    ){
        
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
}
module.exports=UserController