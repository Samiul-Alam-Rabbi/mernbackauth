import nodemailer from "nodemailer";
import User from "../models/userModel.js";

export const nodeMailer = async(req, res) => {

    // let transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "dc8add141a8d53",
    //       pass: "af015df92d155d"
    //     }
    //   });
    const _otp = Math.floor(100000 + Math.random() * 900000);
    console.log(_otp);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'techs.a.rabbiali1998@gmail.com',
            pass: 'mccypkbixwvluplv',
        }
    })
    let info = await transporter.sendMail({
        from: 'techs.a.rabbiali1998@gmail.com',
        to: req.body.email,
        subject: "OTP",
        text: String(_otp),
        html: `<b>Hello world?</b></br><b>Your otp is: ${_otp}`,
    });

    // console.log("Message sent: %s", info.messageId);

    if(info.messageId) {
        User.updateOne({email: req.body.email}, {otp: _otp})
            .then(result => {
                res.send({
                    code: 200,
                    message: "successfully send",
                });
            }).catch(err=>{
                res.send({
                    code: 500,
                    message: 'Server err'
                })
            })
    } else {
        res.send('Err is send');
    }
        

}