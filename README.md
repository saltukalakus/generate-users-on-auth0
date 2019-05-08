**Description**

This script runs the [create a user management API](https://auth0.com/docs/api/management/v2#!/Users/post_users) to create users from a JSON array in a file named <b>file.json</b>. Normally you <b>should always</b> be using [the import management API](https://auth0.com/docs/api/management/v2#!/Jobs/post_users_imports) to create users in bulk but under very special circumstances this script might be useful where the import API is insufficient. Notice that if you run this script with a large user base, it is very likely that your tenant will be banned so only use it with caution and with a small number of users. Like less than 1K. Create user API required a password for the user. The script generates random passwords for each user. The users should get a reset link to update the passwords similar to importing with the import API.


**Build steps**

1-) Copy <b>.env-sample</b> as <b>.env</b> in the root folder of the project. Add the required parameters in the <b>.env</b> file appropriate for your Auth0 tenant.

One special note for the management API token; You could copy the token from the API Explorer Tab of the Auth0 Management API in the APIs secion. Then make sure that you enable the API Explorer Application on the database connection you are running this script against otherwise you may get an error like below:

```
connection is disabled (client_id: bQ2GM4kxRWTTYGnhi7hIs7ok8Ev0enDU - connection: TestDB)
```

The client_id in my test environment is the one used for <b>API Explorer Application</b>. I am testing with a database connection named <b>TestDB</b>.


2-) Install Node.js on your local machine.

3-) Store the bulk user file as <b>file.json</b> on the project's root folder. The file format is same as the [import/export extension](https://auth0.com/docs/extensions/user-import-export).


**Running the script**

// This needs to be run once
```
$ npm install
```
// Run the script
```
$ npm start
```

**Verify if the users are created**

Navigate to the users view and filter with the connection name to see if the users are created.
