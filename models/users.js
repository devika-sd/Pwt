const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const schema=mongoose.Schema;

const UsersSchema=new schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    typeUser:{
        type:String,
        enum:['admin','trainer','user'],
        default:'user'
    },
    workouts:[
       {
           _id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'pwt',
                unique:true
            },
            title:{
                type:String,
                require:true
            },
            cbpm:{
                type:Number,
                require:true
            },
            summary:{
                type:String,
                require:true
            }
       }
    ]
});
UsersSchema.methods.generateToken = async function() {
    let token=await jwt.sign({_id:this._id,typeUser:this.typeUser},process.env.JWT_SECRET_KEY,{ expiresIn: '1h' });
    return token;
}

UsersSchema.methods.matchtype2 = async function (rawpassword) {
    console.log("Inside a match password");
    return await bcrypt.compare(rawpassword,this.password);
}
UsersSchema.statics.matchtype3 = async function (rawpassword,hashpassword) {
    console.log("Inside a match password");
    return await bcrypt.compare(rawpassword,hashpassword);
}

UsersSchema.pre('save',async function () {
    console.log(this)
    console.log("before save operation  "+this.password);
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    console.log("after save method  ",this.password);

})
const Users=new mongoose.model('user',UsersSchema);
module.exports=Users;