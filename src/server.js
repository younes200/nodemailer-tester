const express = require("express");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send('ok');
})

app.post("/sendmail", async (req, res) => {
  const { body } = req;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        ciphers:'SSLv3'
    }
  });

  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `"${body.fromName}" ${body.fromEmail}`, // sender address
      to: body.to, // list of receivers
      subject: body.subject, // Subject line
      text: body.text, // plain text body
      html: body.html, // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).json({ message: "Mail sent" });
  } catch (exception) {
    res.status(500).json({ error: exception.toString() });
  }
});

app.listen(port, () => {
  console.log(`Service started on port ${port}`);
});
