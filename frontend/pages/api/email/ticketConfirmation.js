const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oAuth2Client = new google.auth.OAuth2(
	process.env.GMAIL_CLIENT_ID,
	process.env.GMAIL_CLIENT_SECRET,
	process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

export default async function handler(req, res) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "ticketauthxyz@gmail.com",
				clientId: process.env.GMAIL_CLIENT_ID,
				clientSecret: process.env.GMAIL_CLIENT_SECRET,
				refreshToken: process.env.GMAIL_REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const mailOptions = {
			from: "TicketAuth <ticketauthxyz@gmail.com>",
			to: req.body.email,
			subject: "Hello from ticketaut repo",
			text: "Hello from gmail email using API",
			html: "<h1>Hello from gmail email using API</h1>",
		};

		const result = await transport.sendMail(mailOptions);
		console.log(result);
		res.status(200).json("result");
	} catch (error) {
		console.log(error);
	}

	// res.status(200).json("result");
}
