const nodemailer = require('nodemailer')


function sendEmail(email, sujet = "", text = "", message = "", expiresIn = "") {
    return new Promise((resolve, reject) => {
        const username = process.env.GMAIL_USER
        const password = process.env.GMAIL_PASSWORD
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: username,
                pass: password
            }
        })

        const mail_option = {
            from: username,
            to: email,
            subject: `${sujet}`,
            text: `${message}`,
            html: `<h1>${text}</h1>`,
            expiresIn: `${expiresIn}`

        }
        transporter.sendMail(mail_option, function(error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `une erreur est survenue` })
            }
            return resolve({
                message: "Le mail a été envoyé avec succes "
            })
        })

    })
}

module.exports = {
    sendEmail
}