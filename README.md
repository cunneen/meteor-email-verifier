# meteor-email-verifier
A meteor email verification package that works with iron router, based on https://github.com/ideaq/meteor-email

To use:

1. Add the package
    ```
        meteor add cunneen:email-verifier
    ```
2. Put code similar to the following in your application, so that
    1. Users are sent a verification email when they register
    2. Users can't login until their email address has been verified.
      (Note: This uses the [accounts-entry](http://github.differential.com/accounts-entry/) package, with [pull request #350](https://github.com/Differential/accounts-entry/pull/350) ).
      ```javascript
          if (Meteor.isServer) {
            Accounts.config({
              "sendVerificationEmail": true,
              "loginExpirationInDays": 5
            });
            if (AccountsEntry) {
              AccountsEntry.config({
              "signupCode": "secretS1gnupC0de",
              "passwordSignupFields": "USERNAME_AND_EMAIL"
            });
            }
            //Copy all of the properties in the settings over to the emailTemplates
            _.extend(Accounts.emailTemplates, {
              "siteName": "My Fantastic Site",
              "from": "no-reply@example.com"
            });
        
            var loginAttemptVerifier = function (parameters) {
              if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
                // is the user an admin ?
                var adminUser = (parameters.user.username === "admin");
                if (adminUser) {
                  return parameters.allowed;
                }
                // return true if verified email, false otherwise.
                var found = _.find(parameters.user.emails, function (thisEmail) {
                  return thisEmail.verified;
                });
                if (!found) {
                  throw new Meteor.Error(500, 'We sent you an email.');
                }
                return found && parameters.allowed;
              } else {
                console.log("user has no registered emails.");
                return false;
              }
            };
            Accounts.validateLoginAttempt(loginAttemptVerifier);
        }
      ```

3. Ensure your email is configured:
    * In your server/server.js file add the following MAIL_URL config line:
    ```javascript
        process.env.MAIL_URL="smtp://xxxxx%40gmail.com:yyyyy@smtp.gmail.com:465/"; 
    ```
    Where xxxxx is your gmail username and yyyyy is your gmail password.



```
