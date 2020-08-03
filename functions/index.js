// const functions = require('firebase-functions');
const express = require('express')
const fetch = require('node-fetch')
const engines = require('consolidate')
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const csrfMiddleware = csrf({cookie: true})

const app = express();

app.engine('hbs', engines.handlebars)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(csrfMiddleware)



var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scoultimate.firebaseio.com"
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.all('*', (req, res, next) => {
    res.cookie("SXSRF-TOKEN", req.csrfToken());
    next();
})

async function getUserDecodedClaims(sessionToken) {
    var resp;
    await admin
    .auth()
    .verifySessionCookie(sessionToken, true)
    .then((decodedClaims) => {
        resp = decodedClaims
        })
        .catch(error => {resp = null;})

    return resp;
}

app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    admin
        .auth()
        .createSessionCookie(idToken, {expiresIn})
        .then(
            (sessionCookie) => {
                const options = {maxAge: expiresIn, httpOnly: true}
                res.cookie('session', sessionCookie, options);
                res.end(JSON.stringify({status: "success"}))
            },
            (error) => {
                res.status(401).send("Error 401: Unauthorized Request")
            }
        )

})


app.get('/sessionLogout', (req, res) => {
    res.clearCookie("session")
    res.redirect('/auth')
})

async function gdfe(endpoint) {
    var response = new Object;
    // var url = new URL(`https://www.thebluealliance.com/api/v3/${endpoint}?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5`);
    await fetch(`https://www.thebluealliance.com/api/v3/${endpoint}?X-TBA-Auth-Key=lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5`)
        .then((response) => {
            return response.json()
        })
        .then((respJson) => {
            response = respJson;
        });
    return response;
}



async function getTeamDetails(teamNumber) {
    var teamNickName, teamName, teamLocation, teamImageString;
    await gdfe(`team/frc${teamNumber}`)
        .then((resp) => {
            teamName = resp.name;
            teamNickName = resp.nickname;
        })

return [teamNickName, teamName, teamLocation, teamImageString]
}

app.get('/team/:teamNumber', async (req, res) => {
    var teamNumber = req.params.teamNumber;
    var [teamNickName, teamName, teamLocation, teamImageString] = await getTeamDetails(teamNumber);
    
    if(!teamNickName || !teamName) return res.render('404')

    res.render('team', { teamName, teamNickName, teamNumber })
})

app.get('/', async (req, res) => {
   var userData = await getUserDecodedClaims(req.cookies.session || '')
    var profileImageUrl = (userData && userData.picture) ? userData.picture : null;
    res.render('index', {profileImageUrl});
})

app.get('/account', (req, res) => {
    const sessionCookie = req.cookies.session || '';

    admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
        res.send(`${decodedClaims.name}`)
    })
    .catch((error) => {
        res.clearCookie("session")
        res.redirect('/auth')
    })
})
app.get('/auth', async (req, res) => {
   res.render('authentication');
})


app.use(function (req, res, next){
    res.status(404).render('404')
})

app.listen(process.env.PORT || 8080)

// exports.ssrapp = functions.https.onRequest(app)