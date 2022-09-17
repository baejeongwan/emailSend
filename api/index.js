const path = require('path');
const smtpServer = require('smtp-server').SMTPServer;
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
const server = new smtpServer({
    authMethods: ['PLAIN', 'LOGIN'],
    authOptional: true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(fileUpload());

app.post("/api", (req, res) => {
    if (req.body.verify == "OK") {
        transporter.sendMail({
            subject: "사진 전송해드립니다",
            from: "다문화 축제 프로젝트 <multiculture-noreply@hanlight.com>",
            to: req.body.email,
            text: "다문화 축제 파일 전송해 드립니다.",
            attachments: [
                {
                    filename: req.files.file.name,
                    content: req.files.file.data
                }
            ]
        }).then(() => {
            res.send("OK");
            console.log("전송되었습니다.");
        })
        
    } else {
        console.error("Unprocessable request")
    }
});

app.listen(80, () => {
    console.log("OK");
});

server.listen('25');

server.on('error', (err) => {
    console.log("ERROR!", err);
});

//INIT NODEMAILER
let transporter = nodemailer.createTransport({
    host: "localhost",
    port: 25,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("EMAIL OK");
    }
})