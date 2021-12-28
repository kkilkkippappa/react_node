const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name:{
        type: String, 
        maxlength : 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image:String,
    token:{
        type: String
    },
    tokenExp:{
        type: String
    }
})

// register 에서 mongoose save 하기 전에..
// 비밀번호 암호화
userSchema.pre('save', function(){
    var user = this;

    // 비밀번호를 바꿀 때
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword 1234   암호화된 비밀번호 체크 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err), 
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}