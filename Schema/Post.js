const mongoose=require('mongoose')
const post=new mongoose.Schema({
  
    post:[{
        p_id:{type:String},
        title:{type:String},
        desc:{type:String},
        likes:{type:Number,
        default:0},
        command:[{
            p_id:{type:String},
            message:{type:String}
        }],
        
        }],
})
module.exports=mongoose.model('Post',post)