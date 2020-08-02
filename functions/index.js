// const functions = require('firebase-functions');
const express = require('express')
const fetch = require('node-fetch')
const engines = require('consolidate')
var path = require('path');


const app = express();

app.engine('hbs', engines.handlebars)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/public')))

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


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
   

    res.render('index')
})


// app.use(function (req, res, next){
//     res.status(404).render('404')
// })

app.listen(process.env.PORT || 8080)

// exports.ssrapp = functions.https.onRequest(app)