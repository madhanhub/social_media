const mongoose=require('mongoose')

const user_schema=new mongoose.Schema({

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
 
    upload:[{

        post:{
        p_id:{type:String},
        title:{type:String},
        desc:{type:String},
        }
}],
    
    command:[{
        p_id:{type:String},
        message:{type:String}
    }],

    Bio:[{
        school:{type:String},
        college:{type:String},
        location:{type:String},
        native:{type:String},
        working:{type:String},
    }]
})
module.exports=mongoose.model('Register',user_schema)