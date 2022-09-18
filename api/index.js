require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();

systemLog();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(fileUpload());

if (process.env.LOCALSERVER == "ON") {
    app.use(express.static(path.join(__dirname, "..")))
    console.log("STATIC FOLDER IS BEING SERVED FROM", path.join(__dirname, ".."))
}

app.post("/api", (req, res) => {
    if (req.body.verify == "OK") {
        transporter.sendMail({
            subject: "사진 전송해드립니다",
            from: "다문화 축제 프로젝트 <multiculture@localhost>",
            to: req.body.email,
            text: "다문화 축제 파일 전송해 드립니다.",
            attachments: [
                {
                    filename: req.files.file.name,
                    content: req.files.file.data
                }
            ]
        }).then((status) => {
            res.send("OK");
            console.log("Email successfully sent.", status);
        })
        
    } else {
        console.error("Unprocessable request")
    }
});

app.listen(process.env.PORT || 80, () => {
    console.log("OK", process.env.PORT || 80);
});


//INIT NODEMAILER
let transporter = nodemailer.createTransport({
    sendmail: true
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("ERROR: ", error);
    } else {
        console.log("EMAIL OK");
    }
})

function systemLog() {
    console.log("===============================")
    console.log("Start of SYSTEM INFORMATION LOG")
    console.log("===============================")
    console.log("OS Architecture: ", process.arch)
    console.log("Platform: ", process.platform)
    console.log("Environment Variables: ", process.env)
    console.log("Current Directory", process.cwd())
    console.log("===============================")
    console.log("End of SYSTEM INFORMATION LOG")
    console.log("===============================")
}