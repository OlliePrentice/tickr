
const express = require('express');
const next = require('next');
const passport = require('passport');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

require("./services/passport.js");

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.use(passport.initialize());
    server.use(passport.session());

    server.get('/a', (req, res) => {
        return app.render(req, res, '/a', req.query)
    });

    server.get('/b', (req, res) => {
        return app.render(req, res, '/b', req.query)
    });

    server.get("/api/current-user", (req, res) => {
        res.send(req.body);
    });


    server.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    server.get(
        "/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: "/"
        }),
        (req, res) => {
            // Successful authentication, redirect home.
            res.redirect("/");
        }
    );


    server.all('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
