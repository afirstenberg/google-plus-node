# google-plus-node
## A demonstration of using Google+ Sign-In with node.js

### Background

This example is based on the Google+ Sign-In "one-time-code" flow (sometimes
known as the "hybrid flow") for authentication. This is documented at
https://developers.google.com/+/web/signin/server-side-flow and the steps
mentioned in the files here correspond to the steps outlined there.

This is considered best practice if you want the user to sign-in using the
Google+ Sign-In button, but wish to be able to take actions on the user's
behalf from the server, or after they are not active at your site. See the
page at developers.google.com for furtehr details.


### Preparing to run

As documented in Step 1, you will need to create a project with the
Google APIs Console. From this console, you will need to generate a Client
ID and Secret, which you will need to provide when running the app.

All dependent npm packages are defined in package.json, so you should run
> npm install
to have the dependencies automatically downloaded and installed.


### Running

The id and secret that you received from the developers console will be passed
to the program using environment variables. In UNIX-derived operating systems,
you can replace them inside the quotes in a command such as:

> CLIENT\_ID="id" CLIENT\_SECRET="secret" node app.js


### Feedback and updates

Questions, comments, suggestions, and feedback of all sorts are welcome.
You can either submit a bug or change via github at
https://github.com/afirstenberg/google-plus-node, ask a question via the
Google+ Developers community on Google+,
or find me on Google+ at http://plus.prisoner.com/
