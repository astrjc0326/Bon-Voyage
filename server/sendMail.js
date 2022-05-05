const nodemailer = require('nodemailer');

module.exports = {
  sendMail: (fromCity, from, toCity, to, price, link, callback) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPW
      }
    })
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.CLIENT_EMAIL,
      subject: 'Low Price Alert!',
      text: `Only $${price} to fly from ${fromCity}-${from} to ${toCity}-${to}, link:${link}`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        callback(err)
      } else {
        console.log('Email sent', info.response)
        callback(null)
      }
    })
  }
}