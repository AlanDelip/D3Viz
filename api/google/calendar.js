const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/calendar.events.readonly',
	'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
// 	if (err) return console.log('Error loading client secret file:', err);
// 	// Authorize a client with credentials, then call the Google Calendar API.
// 	authorize(JSON.parse(content), listEvents);
// });

fs.readFile('./us-holidays.json', (err, content) => {
	let data = [];
	let holidays = JSON.parse(content).items;
	for (let holiday of holidays) {
		const start = holiday.start.dateTime || holiday.start.date;
		const end = holiday.end.dateTime || holiday.end.date;
		data.push({start, end, name: holiday.summary});
	}
	fs.writeFile("ny-holidays.json", JSON.stringify(data), res => {
		console.log("write success");
	})
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getAccessToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			callback(oAuth2Client);
		});
	});
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
	const calendar = google.calendar({version: 'v3', auth});
	let startDate = new Date();
	startDate.setFullYear(2017, 10, 0);
	let data = [];
	calendar.events.list({
		calendarId: 'columbia.edu_ntjs0e60drh90lf9t9hk4oaoks@group.calendar.google.com',
		timeMin: startDate.toISOString(),
		maxResults: 100,
		singleEvents: true
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		const events = res.data.items;
		if (events.length) {
			events.map((event, i) => {
				const start = event.start.dateTime || event.start.date;
				const end = event.end.dateTime || event.end.date;
				data.push({start, end, name: event.summary});
			});
			fs.writeFile("ny-events.json", JSON.stringify(data), res => {
				console.log("write success");
			})
		} else {
			console.log('No upcoming events found.');
		}
	});
}