
exports.CLIENT_ID = undefined;
exports.CLIENT_SECRET = undefined;
exports.SCOPE = 'https://www.googleapis.com/auth/plus.login';

exports.isInitialized = function(){
  return exports.CLIENT_ID && exports.CLIENT_SECRET;
};

var REDIRECT_URL = 'postmessage'
  ;

var googleapis = require('googleapis');

var allAuths = [];

var plusClient;
googleapis.load( 'plus', 'v1', function(err,client){
  plusClient = client;
});

var now = function(){
  return (new Date()).toISOString();
};

exports.auth = function( req, res ){
  var ret = {
    err: null,
    ok: null
  };

  // Confirm CSRF?
  var sessionStateToken = req.session['state'];
  var clientStateToken  = req.body['state'];
  console.log( 'csrf', sessionStateToken, clientStateToken );
  if( !sessionStateToken || !clientStateToken || sessionStateToken !== clientStateToken ){
    ret.err = {
      msg: 'state token does not match'
    };
    res.send(ret);
    return;
  }

  // Exchange the code for a token
  var oauth2 = new googleapis.OAuth2Client( exports.CLIENT_ID, exports.CLIENT_SECRET, REDIRECT_URL );
  oauth2.getToken( req.body.code, function(err, tokens){
    oauth2.credentials = tokens;
    console.log( now(), err, tokens );
    allAuths.push( oauth2 );
    plusClient.plus.people.get({
      userId: 'me'
    })
    .withAuthClient(oauth2)
    .execute(function(err,result){
      ret.err = err;
      ret.ok = result;
      res.send(ret);
    });
  });
};

var logOwner = function( auth ){
  plusClient.plus.people.get({
    userId: 'me'
  } ).withAuthClient(auth).execute(function(err,result,res){
      console.log( '--', now(), 'start --' );
      console.log( '-token ', auth.credentials );
      console.log( '-err   ', err );
      console.log( '-result', result );
      console.log( '--', now(), 'end   --' );
  });
};

var logAuths = function(){
  console.log( '---', now(), 'starting ---' );
  allAuths.forEach(logOwner);
  console.log( '---', now(), 'done     ---' );
};

setInterval( logAuths, 10*60*1000 );
