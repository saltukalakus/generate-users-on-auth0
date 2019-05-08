const dotenv = require('dotenv');
var ManagementClient = require('auth0').ManagementClient;
var sleep = require('sleep');

dotenv.config();

var management = new ManagementClient({
  token: process.env.AUTH0_MNG_TOKEN,
  domain: process.env.AUTH0_DOMAIN
});

function makePassword(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function generateUser(user) {
  try {
    let result = await management.users.create(user);
  } catch(err) {
    // Most likely you may get errors due to the duplicate users.
    console.log(err.statusCode);
    console.log(err.message);
  }
}

var fs = require('fs');
  fs. readFile(process.env.BULK_USER_FILE, 'utf8', function(err, contents) {
  
  if (err) {
    console.log(err)
    return;
  }
  
  users = JSON.parse(contents);
  for (user in users){
    console.log (users[user]);

    // Set the database name you would want to create the users
    users[user].connection = process.env.AUTH0_DATABASE_NAME;

    // The API requires a password. This section creates a 
    // 20 digit random password for each user
    users[user].password = makePassword(20);

    // Management API to create the user
    generateUser(users[user])
    
    // Wait 500 miliseconds after each Mng. API call
    // This ensures that the management API call isn't 
    // rate limitted.
    sleep.msleep(500) 
  }
});

