const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const contentful = require('contentful-management');
const faker = require('faker');
const _ = require('lodash');

const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {

        client.getSpace(process.env.CONTENTFUL_SPACE_ID)
            .then((space) => space.getEnvironment('master'))
            .then((environment) => environment.createEntry('user', {
                fields: {
                    username: {
                        'en-US': _.camelCase((faker.vehicle.color() + ' ' + faker.random.word() + ' ' + faker.hacker.verb())) + _.random(0, 9999)
                    },
                    googleId: {
                        'en-US': profile.id
                    },
                    email: {
                        'en-US': profile.emails[0].value
                    }
                }
            }))
            .then((entry) => entry.publish())
            .then((entry) => {
                console.log(entry)
                done(null, profile);
            })
            .catch((error) => {
                console.log(error);
                done(null, profile);
            });
    }
));
