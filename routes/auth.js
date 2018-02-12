module.exports = {

  facebookAuth: {
    clientID: '188206165264319', // your App ID
    clientSecret: '7b2cac88a042cfe6e5d3d48a833f01ed', // your App Secret
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    profileFields: ['id', 'email', 'name'] // For requesting permissions from Facebook API
  }
};
