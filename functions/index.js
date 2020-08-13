// const functions = require('firebase-functions');
const express = require('express')
const fetch = require('node-fetch')
const engines = require('consolidate')
const Handlebars = require("handlebars");
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const tba = require(__dirname + "/helpers/tbaRequests.js")


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

    const expiresIn = 3600000 * 120;
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



app.get('/test', (req, res) => {
var teamData={name:"DuPont/Medtronic/Crosstown Surgery Center/HID Global/PTC/The Dow Chemical Co./Seagate/The Toro Company/Tradition Companies/Dunn & Semington/Cargill Inc./SolidWorks/The Guzik Family/Edina Education Fund/Winnesota Regional Transportation/Jerry's do-it Best Hardware/TJ's Restaurant/Calvary Lutheran Church/Green Machine Superfans&Edina High School",nickname:'"The Green Machine"',location:"Edina, Minnesota",awards:[{award_type:14,event_key:"2006arc",name:"Highest Rookie Seed",recipient_list:[Array],year:2006},{award_type:1,event_key:"2006wi",name:"Regional Winner",recipient_list:[Array],year:2006},{award_type:2,event_key:"2007new",name:"Newton - Division Finalist",recipient_list:[Array],year:2007},{award_type:30,event_key:"2007wi",name:"DaimlerChrysler Team Spirit Award",recipient_list:[Array],year:2007},{award_type:0,event_key:"2008mn",name:"Regional Chairman's Award",recipient_list:[Array],year:2008},{award_type:2,event_key:"2009mn2",name:"Regional Finalist",recipient_list:[Array],year:2009},{award_type:31,event_key:"2009mn2",name:"Website Award",recipient_list:[Array],year:2009},{award_type:32,event_key:"2009mn2",name:"Autodesk Visualization Award",recipient_list:[Array],year:2009},{award_type:31,event_key:"2009wi",name:"Website Award",recipient_list:[Array],year:2009},{award_type:11,event_key:"2010mn2",name:"Gracious Professionalism Award sponsored by Johnson & Johnson",recipient_list:[Array],year:2010},{award_type:31,event_key:"2010mn2",name:"Website Award",recipient_list:[Array],year:2010},{award_type:18,event_key:"2011dmn",name:"Industrial Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2011},{award_type:31,event_key:"2011dmn",name:"Website Award",recipient_list:[Array],year:2011},{award_type:4,event_key:"2011dmn",name:"FIRST Dean's List Finalist Award",recipient_list:[Array],year:2011},{award_type:9,event_key:"2011dmn",name:"Engineering Inspiration",recipient_list:[Array],year:2011},{award_type:31,event_key:"2011mn2",name:"Website Award",recipient_list:[Array],year:2011},{award_type:22,event_key:"2012dmn",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2012},{award_type:31,event_key:"2012dmn",name:"Website Award",recipient_list:[Array],year:2012},{award_type:0,event_key:"2012mn2",name:"Regional Chairman's Award",recipient_list:[Array],year:2012},{award_type:2,event_key:"2012mn2",name:"Regional Finalists",recipient_list:[Array],year:2012},{award_type:22,event_key:"2012mn2",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2012},{award_type:31,event_key:"2012mn2",name:"Website Award",recipient_list:[Array],year:2012},{award_type:29,event_key:"2013mndu",name:"Innovation in Control Award sponsored by Rockwell Automation",recipient_list:[Array],year:2013},{award_type:18,event_key:"2013mnmi2",name:"Industrial Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2013},{award_type:22,event_key:"2013mnmi2",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2013},{award_type:9,event_key:"2013mnmi2",name:"Engineering Inspiration Award",recipient_list:[Array],year:2013},{award_type:0,event_key:"2014mndu",name:"Regional Chairman's Award",recipient_list:[Array],year:2014},{award_type:11,event_key:"2014mnmi2",name:"Gracious Professionalism Award sponsored by Johnson & Johnson",recipient_list:[Array],year:2014},{award_type:2,event_key:"2014mnmi2",name:"Regional Finalist",recipient_list:[Array],year:2014},{award_type:3,event_key:"2015cmp",name:"Woodie Flowers Award",recipient_list:[Array],year:2015},{award_type:9,event_key:"2015mndu",name:"Regional Engineering Inspiration Award",recipient_list:[Array],year:2015},{award_type:0,event_key:"2015mnmi",name:"Regional Chairman's Award",recipient_list:[Array],year:2015},{award_type:22,event_key:"2015mnmi",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2015},{award_type:11,event_key:"2016iacf",name:"Gracious Professionalism Award sponsored by Johnson & Johnson",recipient_list:[Array],year:2016},{award_type:4,event_key:"2016iacf",name:"FIRST Dean's List Finalist Award",recipient_list:[Array],year:2016},{award_type:22,event_key:"2016mndu",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2016},{award_type:2,event_key:"2016mnri",name:"Finalist",recipient_list:[Array],year:2016},{award_type:0,event_key:"2017mndu",name:"Regional Chairman's Award",recipient_list:[Array],year:2017},{award_type:18,event_key:"2017mndu",name:"Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2017},{award_type:18,event_key:"2017mnmi",name:"Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2017},{award_type:3,event_key:"2017mnmi",name:"Woodie Flowers Finalist Award",recipient_list:[Array],year:2017},{award_type:9,event_key:"2017mnmi",name:"Regional Engineering Inspiration Award",recipient_list:[Array],year:2017},{award_type:69,event_key:"2018cmpmi",name:"Chairman's Award Finalist",recipient_list:[Array],year:2018},{award_type:22,event_key:"2018mndu",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2018},{award_type:4,event_key:"2018mndu",name:"FIRST Dean's List Finalist Award",recipient_list:[Array],year:2018},{award_type:0,event_key:"2018mnmi",name:"Regional Chairman's Award",recipient_list:[Array],year:2018},{award_type:2,event_key:"2019cars",name:"Championship Subdivision Finalist",recipient_list:[Array],year:2019},{award_type:0,event_key:"2019cmpmi",name:"Chairman's Award",recipient_list:[Array],year:2019},{award_type:69,event_key:"2019cmpmi",name:"Chairman's Award Finalist",recipient_list:[Array],year:2019},{award_type:0,event_key:"2019mndu",name:"Regional Chairman's Award",recipient_list:[Array],year:2019},{award_type:3,event_key:"2019mndu",name:"Woodie Flowers Finalist Award",recipient_list:[Array],year:2019},{award_type:1,event_key:"2019mnmi2",name:"Regional Winners",recipient_list:[Array],year:2019},{award_type:22,event_key:"2019mnmi2",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2019},{award_type:1,event_key:"2020mndu",name:"Regional Winners",recipient_list:[Array],year:2020},{award_type:22,event_key:"2020mndu",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2020}],years:[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],picture:"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",events:[{address:"350 Harbor Dr, Duluth, MN 55802, USA",city:"Duluth",country:"USA",district:null,division_keys:[],end_date:"2020-03-07",event_code:"mndu",event_type:0,event_type_string:"Regional",first_event_code:"MNDU",first_event_id:"43996",gmaps_place_id:"ChIJaTNyg5NSrlIRB45Mfkoq8Oc",gmaps_url:"https://maps.google.com/?cid=16712904716606803463",key:"2020mndu",lat:46.7803419,lng:-92.0985838,location_name:"Duluth Entertainment Convention Center",name:"Lake Superior Regional",parent_event_key:null,playoff_type:null,playoff_type_string:null,postal_code:"55802",short_name:"Lake Superior",start_date:"2020-03-04",state_prov:"MN",timezone:"America/Chicago",webcasts:[Array],website:"http://www.mnfirst.org",week:1,year:2020},{address:"1901 4th St SE, Minneapolis, MN 55455, USA",city:"Minneapolis",country:"USA",district:null,division_keys:[],end_date:"2020-03-28",event_code:"mnmi2",event_type:0,event_type_string:"Regional",first_event_code:"MNMI2",first_event_id:"43980",gmaps_place_id:"ChIJlxYc1Bsts1IRWDKAmJXi3QQ",gmaps_url:"https://maps.google.com/?cid=350685478141309528",key:"2020mnmi2",lat:44.9781197,lng:-93.22802659999999,location_name:"3M Arena at Mariucci",name:"***SUSPENDED*** Minnesota North Star Regional",parent_event_key:null,playoff_type:null,playoff_type_string:null,postal_code:"55455",short_name:"Minnesota North Star",start_date:"2020-03-25",state_prov:"MN",timezone:"America/Chicago",webcasts:[Array],website:"http://www.mnfirst.org",week:4,year:2020}]};res.render('test', { teamData })
console.log(teamData.events)
})

app.get('/testtwo', (req, res) => {
    var teamData={name:"DuPont/Medtronic/Crosstown Surgery Center/HID Global/PTC/The Dow Chemical Co./Seagate/The Toro Company/Tradition Companies/Dunn & Semington/Cargill Inc./SolidWorks/The Guzik Family/Edina Education Fund/Winnesota Regional Transportation/Jerry's do-it Best Hardware/TJ's Restaurant/Calvary Lutheran Church/Green Machine Superfans&Edina High School",nickname:'"The Green Machine"',location:"Edina, Minnesota",awards:[{award_type:14,event_key:"2006arc",name:"Highest Rookie Seed",recipient_list:[Array],year:2006},{award_type:1,event_key:"2006wi",name:"Regional Winner",recipient_list:[Array],year:2006},{award_type:2,event_key:"2007new",name:"Newton - Division Finalist",recipient_list:[Array],year:2007},{award_type:30,event_key:"2007wi",name:"DaimlerChrysler Team Spirit Award",recipient_list:[Array],year:2007},{award_type:0,event_key:"2008mn",name:"Regional Chairman's Award",recipient_list:[Array],year:2008},{award_type:2,event_key:"2009mn2",name:"Regional Finalist",recipient_list:[Array],year:2009},{award_type:31,event_key:"2009mn2",name:"Website Award",recipient_list:[Array],year:2009},{award_type:32,event_key:"2009mn2",name:"Autodesk Visualization Award",recipient_list:[Array],year:2009},{award_type:31,event_key:"2009wi",name:"Website Award",recipient_list:[Array],year:2009},{award_type:11,event_key:"2010mn2",name:"Gracious Professionalism Award sponsored by Johnson & Johnson",recipient_list:[Array],year:2010},{award_type:31,event_key:"2010mn2",name:"Website Award",recipient_list:[Array],year:2010},{award_type:18,event_key:"2011dmn",name:"Industrial Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2011},{award_type:31,event_key:"2011dmn",name:"Website Award",recipient_list:[Array],year:2011},{award_type:4,event_key:"2011dmn",name:"FIRST Dean's List Finalist Award",recipient_list:[Array],year:2011},{award_type:9,event_key:"2011dmn",name:"Engineering Inspiration",recipient_list:[Array],year:2011},{award_type:31,event_key:"2011mn2",name:"Website Award",recipient_list:[Array],year:2011},{award_type:22,event_key:"2012dmn",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2012},{award_type:31,event_key:"2012dmn",name:"Website Award",recipient_list:[Array],year:2012},{award_type:0,event_key:"2012mn2",name:"Regional Chairman's Award",recipient_list:[Array],year:2012},{award_type:2,event_key:"2012mn2",name:"Regional Finalists",recipient_list:[Array],year:2012},{award_type:22,event_key:"2012mn2",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2012},{award_type:31,event_key:"2012mn2",name:"Website Award",recipient_list:[Array],year:2012},{award_type:29,event_key:"2013mndu",name:"Innovation in Control Award sponsored by Rockwell Automation",recipient_list:[Array],year:2013},{award_type:18,event_key:"2013mnmi2",name:"Industrial Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2013},{award_type:22,event_key:"2013mnmi2",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2013},{award_type:9,event_key:"2013mnmi2",name:"Engineering Inspiration Award",recipient_list:[Array],year:2013},{award_type:0,event_key:"2014mndu",name:"Regional Chairman's Award",recipient_list:[Array],year:2014},{award_type:11,event_key:"2014mnmi2",name:"Gracious Professionalism Award sponsored by Johnson & Johnson",recipient_list:[Array],year:2014},{award_type:2,event_key:"2014mnmi2",name:"Regional Finalist",recipient_list:[Array],year:2014},{award_type:3,event_key:"2015cmp",name:"Woodie Flowers Award",recipient_list:[Array],year:2015},{award_type:9,event_key:"2015mndu",name:"Regional Engineering Inspiration Award",recipient_list:[Array],year:2015},{award_type:0,event_key:"2015mnmi",name:"Regional Chairman's Award",recipient_list:[Array],year:2015},{award_type:22,event_key:"2015mnmi",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2015},{award_type:11,event_key:"2016iacf",name:"Gracious Professionalism Award sponsored by Johnson & Johnson",recipient_list:[Array],year:2016},{award_type:4,event_key:"2016iacf",name:"FIRST Dean's List Finalist Award",recipient_list:[Array],year:2016},{award_type:22,event_key:"2016mndu",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2016},{award_type:2,event_key:"2016mnri",name:"Finalist",recipient_list:[Array],year:2016},{award_type:0,event_key:"2017mndu",name:"Regional Chairman's Award",recipient_list:[Array],year:2017},{award_type:18,event_key:"2017mndu",name:"Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2017},{award_type:18,event_key:"2017mnmi",name:"Safety Award sponsored by Underwriters Laboratories",recipient_list:[Array],year:2017},{award_type:3,event_key:"2017mnmi",name:"Woodie Flowers Finalist Award",recipient_list:[Array],year:2017},{award_type:9,event_key:"2017mnmi",name:"Regional Engineering Inspiration Award",recipient_list:[Array],year:2017},{award_type:69,event_key:"2018cmpmi",name:"Chairman's Award Finalist",recipient_list:[Array],year:2018},{award_type:22,event_key:"2018mndu",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2018},{award_type:4,event_key:"2018mndu",name:"FIRST Dean's List Finalist Award",recipient_list:[Array],year:2018},{award_type:0,event_key:"2018mnmi",name:"Regional Chairman's Award",recipient_list:[Array],year:2018},{award_type:2,event_key:"2019cars",name:"Championship Subdivision Finalist",recipient_list:[Array],year:2019},{award_type:0,event_key:"2019cmpmi",name:"Chairman's Award",recipient_list:[Array],year:2019},{award_type:69,event_key:"2019cmpmi",name:"Chairman's Award Finalist",recipient_list:[Array],year:2019},{award_type:0,event_key:"2019mndu",name:"Regional Chairman's Award",recipient_list:[Array],year:2019},{award_type:3,event_key:"2019mndu",name:"Woodie Flowers Finalist Award",recipient_list:[Array],year:2019},{award_type:1,event_key:"2019mnmi2",name:"Regional Winners",recipient_list:[Array],year:2019},{award_type:22,event_key:"2019mnmi2",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2019},{award_type:1,event_key:"2020mndu",name:"Regional Winners",recipient_list:[Array],year:2020},{award_type:22,event_key:"2020mndu",name:"Entrepreneurship Award sponsored by Kleiner Perkins Caufield and Byers",recipient_list:[Array],year:2020}],years:[2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],picture:"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",events:[{address:"350 Harbor Dr, Duluth, MN 55802, USA",city:"Duluth",country:"USA",district:null,division_keys:[],end_date:"2020-03-07",event_code:"mndu",event_type:0,event_type_string:"Regional",first_event_code:"MNDU",first_event_id:"43996",gmaps_place_id:"ChIJaTNyg5NSrlIRB45Mfkoq8Oc",gmaps_url:"https://maps.google.com/?cid=16712904716606803463",key:"2020mndu",lat:46.7803419,lng:-92.0985838,location_name:"Duluth Entertainment Convention Center",name:"Lake Superior Regional",parent_event_key:null,playoff_type:null,playoff_type_string:null,postal_code:"55802",short_name:"Lake Superior",start_date:"2020-03-04",state_prov:"MN",timezone:"America/Chicago",webcasts:[Array],website:"http://www.mnfirst.org",week:1,year:2020},{address:"1901 4th St SE, Minneapolis, MN 55455, USA",city:"Minneapolis",country:"USA",district:null,division_keys:[],end_date:"2020-03-28",event_code:"mnmi2",event_type:0,event_type_string:"Regional",first_event_code:"MNMI2",first_event_id:"43980",gmaps_place_id:"ChIJlxYc1Bsts1IRWDKAmJXi3QQ",gmaps_url:"https://maps.google.com/?cid=350685478141309528",key:"2020mnmi2",lat:44.9781197,lng:-93.22802659999999,location_name:"3M Arena at Mariucci",name:"***SUSPENDED*** Minnesota North Star Regional",parent_event_key:null,playoff_type:null,playoff_type_string:null,postal_code:"55455",short_name:"Minnesota North Star",start_date:"2020-03-25",state_prov:"MN",timezone:"America/Chicago",webcasts:[Array],website:"http://www.mnfirst.org",week:4,year:2020}]};
    res.render('testtwo', { teamData })
})



app.get('/team/:teamNumber', async (req, res) => {
    var teamNumber = req.params.teamNumber;
    var teamData = await tba.getTeamDetails(teamNumber);

    if(teamData == {}) return res.render('404');
    

    var userData = await getUserDecodedClaims(req.cookies.session || '')
    // console.log(userData)
    
    console.log(teamData)
    res.render('team', { teamData, userData })
});

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

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.use(function (req, res, next){
    res.status(404).render('404')
})


app.listen(process.env.PORT || 8080)

// exports.ssrapp = functions.https.onRequest(app)