// config/auth.js

module.exports = {
  facebookAuth: {
    clientID: '1868560456700086', // your App ID
    clientSecret: '8b9ffd54470373b0ca81fd8be3fc5129', // your App Secret
    callbackURL: 'http://localhost:1337/auth/facebook/callback'
  },
  twitterAuth: {
    consumerKey: 'your-consumer-key-here',
    consumerSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:1337/auth/twitter/callback'
  },
  googleAuth: {
    clientID: 'your-secret-clientID-here',
    clientSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:1337/auth/google/callback'
  }
};