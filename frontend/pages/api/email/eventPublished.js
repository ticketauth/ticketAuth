const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

export default async function handler(req, res) {
  try {
    // const img = require('../../../utils/emailTicket.png');
    // console.log('img: ' + img);

    const accessToken = await oAuth2Client.getAccessToken();

    let eventDetails = req.body.eventDetails;

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ticketauthxyz@gmail.com',
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'TicketAuth <ticketauthxyz@gmail.com>',
      to: eventDetails.email,
      subject: `Congratulations! you published your event: ${eventDetails.eventName}`,
      attachments: [
        {
          filename: 'ticket.png',
          content: eventDetails.ticketImage,
          encoding: 'base64',
        },
      ],
      text: `


Hi! “event organizer name”, you have successfully published your event, here are some steps you'll need to take in order to authenticate your attendees on event day ( with your device ):

Go to - “www.ticketauth.com/authenticate”
Once you’re in that page type “COLLECTIONID” into the input bar
A QR-code will be generated for attendees of your event to scan and validate their ticket ownership.
Successful validation will bring up a check mark on screen!

Thank You!
Please reply to this email if you have any questions or you need further assistance.`,

      html: `
<div style="color:black">
<h3>Hi! “event organizer name”, you have successfully published your event, here are some steps you'll need to take in order to authenticate your attendees on event day ( with your device ):</h3><br/><br/>
Go to - “www.ticketauth.com/authenticate”<br/>
Once you’re in that page type “COLLECTIONID” into the input bar<br/>
A QR-code will be generated for attendees of your event to scan and validate their ticket ownership.<br/>
Successful validation will bring up a check mark on screen!<br/><br/>

Thank You!<br/>
Please reply to this email if you have any questions or you need further assistance.
</div>`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(200).json('result');
  }

  // res.status(200).json("result");
}
