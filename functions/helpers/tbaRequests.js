// Imports
const fetch = require('node-fetch');

// Constants
const key = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";



const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']



class tba {
    constructor(teamNumber) {
        this.teamNumber = teamNumber;
    }
    

}


async function gdfe(endpoint) {
    var response = new Object;
    await fetch(`https://www.thebluealliance.com/api/v3/${endpoint}?X-TBA-Auth-Key=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((respJson) => {
            response = respJson;
        });
    return response;
}

async function teamAwards(teamNumber) {
    var response = {};

    await gdfe(`team/frc${teamNumber}/awards`)
        .then((resp) => {
            if(resp.length === 0) return;
            response.awards = resp;
        })
        return response;

}

async function teamYears(teamNumber) {
    var response = {};

    await gdfe(`team/frc${teamNumber}/years_participated`)
        .then((resp) => {response.years = resp})
        return response;

}

async function teamMedia(teamNumber) {
    var response = {};
    
    await gdfe(`team/frc${teamNumber}/media/2020`).then((resp) => {
        if(!resp[0]) return response.picture = null; 
        response.picture = resp[0].details.base64Image;
    })
    return response;

}

async function teamEvents(teamNumber) {
    var response = {};

    await gdfe(`team/frc${teamNumber}/events/2020`)
    .then((resp)=> {console.log(resp); response.events = resp; })
    return response;

}


async function getTeamDetails(teamNumber = null) {
    var response = {};
    await gdfe(`team/frc${teamNumber}`)
        .then((resp) => {
            if (resp["Errors"] != undefined || resp["Errors"] != null) return response = {};
            response.name = (resp.name) ? resp.name : null;
            response.nickname = (resp.nickname) ? resp.nickname : null;
            response.location = (resp.state_prov && resp.city) ? `${resp.city}, ${resp.state_prov}` : "Not Available"
        });
    if (response == {}) return response;
        await Promise.all([teamYears(teamNumber), teamEvents(teamNumber), teamMedia(teamNumber), teamAwards(teamNumber)]).then((val) => {
            for(i=0; i<val.length; i++) {
                response = {...response, ...val[i]}
            }
        })


    return response;
}


// Exports
module.exports = {
    gdfe,
    getTeamDetails
}