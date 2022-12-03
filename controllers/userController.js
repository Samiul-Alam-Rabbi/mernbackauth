import User from "../models/userModel.js";
import nodemailer from "nodemailer";

export const userRegister = async(req, res) => {
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});

    try {
        await newUser.save();
        res.send({
            code: 200,
            message: "sucessfully register",
        })
        // res.status(200).json({message: newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// login User

export const loginUser = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email: email})
        if(user) {

            if(user.password === password) {
                res.send({
                    code: 200,
                    message: 'user Found',
                    token: 'fdffgfigjfgfg',
                    name: user.name,
                    email: user.email,
                    id: user._id,
                })
            } else {
                res.send({
                    code: 400,
                    message: "Wrong Password"
                })
            }
            // const validity = await bcrypt.compare(password, user.password)
            
            // validity? res.status(200).json(user): res.status(400).json("Wrong Password");
        }  
        else{
            res.send({
                code: 404,
                message: 'User does not exists'
            })
        }
    } catch (error) {
        res.send({
            code: 500,
            message: error.message
        })
    }
}


export const sendOTP = async(req, res) => {
    console.log(req.body);
    const _otp = Math.floor(100000 + Math.random() * 900000);
    console.log(_otp);
    let user = await User.findOne({email: req.body.email});


    if(!user) {
        res.send({
            code: 500,
            message: 'user not found'
        })
    }
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        sendmail: true,
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    let  info = await transporter.sendMail({
        from: 'msar3469@gmail.com',
        to: req.body.email,
        subject: "OTP",
        text: String(_otp),
        html: `<html>
            <body>
                Hello and welcom
            </body>
        </html>`,
    })
    if(info.messageId) {
        console.log(info, 84);
        User.updateOne({email: req.body.email}, {otp: _otp})
            .then(result=> {
                res.send({
                    code: 200,
                    message: 'otp send'
                })
            }).catch(err=>{
                res.send({
                    code: 500,
                    message: 'Server err'
                })
            })
    } else {
        res.send({
            code: 500,
            message: 'Server err'
        })
    }
}


export const submitOTP = async(req, res) => {
    console.log(req.body);
    User.findOne({otp: req.body.otp}).then(result=> {
        // update the password
        User.updateOne({email: result.email}, {password: req.body.password})
            .then(result=> {
                res.send({
                    code: 200,
                    message: 'Password updated'
                })
            }).catch(err=>{
                res.send({
                    code: 500,
                    message: 'Server err'
                })
            })
    }).catch(err=> {
        res.send({
            code: 500,
            message: 'Otp is wrong'
        })
    })
}

// Get all Users
export const getUsers = async(req, res) => {
    const users = await User.find()
    .then((users)=> {
        res.json({
            users,
            total: users.length
        });
    //    res.json(users.length);
    })
    .catch((error)=> console.log(error));
    
}