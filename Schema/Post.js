const mongoose=require('mongoose')
const post=new mongoose.Schema({
    u_id:{
        type:String,
    },
    post:[{
        p_id:{type:String},
        title:{type:String},
        desc:{type:String},
        likes:{type:Number,},
        command:[{
            p_id:{type:String},
            message:{type:String}
        }],
        
        }],
})
module.exports=mongoose.model('Post',post)