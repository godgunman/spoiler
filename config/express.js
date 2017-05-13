const passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy
  //Other strategies go here
  ;

const verifyHandler = function (token, tokenSecret, profile, done) {
  process.nextTick(function () {

    User.findOne({ uid: profile.id }, function (err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function (err, user) {
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function (user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
  User.findOne({ uid: uid }, function (err, user) {
    done(err, user);
  });
});

module.exports.http = {

  customMiddleware: function (app) {
 
    passport.use(new FacebookStrategy({
      clientID: "294821867642958", // Use your Facebook App Id
      clientSecret: "979aaeca8cec6ba9e56d78c293e84ef4", // Use your Facebook App Secret
      callbackURL: "https://spoiler-app.herokuapp.com/auth/facebook/callback"
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
