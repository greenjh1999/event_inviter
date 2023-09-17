import express from 'express';
import cors from 'cors';
import AWS from 'aws-sdk';
import multer from 'multer';
import ejs from 'ejs';
import path from 'path';

AWS.config.update({
    accessKeyId: 'HIDDENI', //hidden for security
    secretAccessKey: 'HIDDEN', //hidden for security
    region: 'us-east-2',
});

const ses = new AWS.SES({ region: 'us-east-1' });

const upload = multer();
const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', './');

app.use(express.json());
app.use(cors());

app.post('/submit-invitation', upload.single('attachment'), async (req, res) => {
    console.log(req.body);
    try {
        const { emailList, emailSubject, message } = req.body;

        const html = await ejs.renderFile('email-template.ejs', {
            backgroundColor: '#000',
            titleColor: 'yellow',
            textColor: 'yellow',
            message: message,
        });

        const params = {
            Destination: {
                ToAddresses: [emailList], // Use emailList directly
            },
            Message: {
                Body: {
                    Text: { Data: message },
                    Html: { Data: html },
                },
                Subject: { Data: emailSubject },
            },
            Source: 'no_reply_john_green@outlook.com', // Your verified email address
            ReplyToAddresses: ['no_reply_john_green@outlook.com'], // Use your reply-to address
        };

        // Use the SES.sendEmail method to send the email
        ses.sendEmail(params, (err, data) => {
            if (err) {
                console.error('Error sending email:', err);
                res.status(500).json({ error: 'An error occurred while sending the email' });
            } else {
                console.log('Email sent successfully:', data.MessageId);
                res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




