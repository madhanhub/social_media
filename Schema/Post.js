const mongoose=require('mongoose')
const post=new mongoose.Schema({
  
    post:[{
        u_id:{type:String},
        title:{type:String},
        desc:{type:String},
        likes:{type:Number,
        default:0},
        command:[{
            
            message:{type:String}
        }],
        
        }],
})
module.exports=mongoose.model('Post',post)