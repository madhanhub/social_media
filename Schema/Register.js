const mongoose=require('mongoose')

const user_schema=new mongoose.Schema({

    u_id:{
        type:String,
    },
    user_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobile:{
        type:Number
    },
    status:{
        type:String,
        default:'inactive'
    },
 
  
       
    
    
    // command:[{
    //     p_id:{type:String},
    //     message:{type:String}
    // }],

    Bio:[{
        school:{type:String},
        college:{type:String},
        location:{type:String},
        native:{type:String},
        working:{type:String},
    }],
    followers:[{
       user_name: {type:String},
    }],
    following:[{
        user_name: {type:String},
    }],
    request:{
       user_list:[{
        type:String}],
    },
   
})
module.exports=mongoose.model('Register',user_schema)