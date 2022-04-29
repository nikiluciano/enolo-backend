const nodemailer = require ('nodemailer')

module.exports = function sendMailConfirmation(req,res,token) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ccc41709@gmail.com',
            pass: process.env.MY_PASSWORD
        }
    });
    let mailOption = {
        from: 'ccc41709@gmail.com',
        to: req.body.email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:${process.env.PORT}/confirm/${token}> Click here</a>
        </div>`,
    };
    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.log("Impossible to send email");
            //res.json("Impossible to send email"); come fare uscire questi messaggi dato che ci sono dei res.json prima
        } else {
            console.log("Email sent");
            //res.json("Email sent");
        }
    });

}