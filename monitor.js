const shell = require("shelljs");
const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.WHD_EMAIL,
        pass: process.env.WHD_PWD
      }
    });

    const mailOptions = {
      from: process.env.WHD_EMAIL,
      to: process.env.CFN_EMAIL,
      subject: '爱马仕补货通知！！',
      text: '快点链接! ' + process.env.HERMES_LINK
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

function monitor() {
  shell.exec(`curl ${process.env.HERMES_LINK} \
    -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36' \
    -H 'accept-language: en-US,en;q=0.9' \
    --compressed > out.txt`)

  const code1 = shell.exec("grep -q \"We’re sorry. The page you were looking for no longer exists.\" out.txt");
  const code2 = shell.exec("grep -q \"Oops ! The selected object is no longer available.\" out.txt");
  // const code ={};
  // code.code = 1;

  if (code.code === 0 || code2.code === 0) {
    console.log('not found');
  } else {
    console.log("found!");
    sendEmail();
    clearInterval(func);
  }
  
}

console.log("Monitor app is running!!");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


let func;
func = setInterval(monitor, getRandomInt(40, 80));






