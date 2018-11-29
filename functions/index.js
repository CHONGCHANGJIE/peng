const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();


const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);


// exports.httpEmail = functions.https.onRequest((req, res) => {
//   if(req.method!=='POST'){
//     const error = new Error('Only POST requests are accepted');
//     error.code = 405;
//     throw error;
//   }
//   const msg = {

//     to: 'jie_chong@hotmail.com',
  
//     from: 'test@example.com',
  
//     subject: 'Sending with SendGrid is Fun',
  
//     text: 'and easy to do anywhere, even with Node.js',
  
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  
//   };
//   return cors(req, res, ()=> {
//     let format= req.query.format;
//     if(!format) {format = req.body.format;}
//     sgMail.send(msg);
//   });
// });
 

exports.httpEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => { 

   });
  
        
  const msg = {

    to: 'jie_chong@hotmail.com',
  
    from: 'test@example.com',
  
    subject: 'Sending with SendGrid is Fun',
  
    text: 'and easy to do anywhere, even with Node.js',
  
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',}

    sgMail.send(msg);
  return response.send("Hello from Firebase!");
});