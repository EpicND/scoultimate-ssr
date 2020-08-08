// Imports
const fetch = require('node-fetch');

// Constants
const key = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";

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

async function getTeamDetails(teamNumber) {
    var response = {};
    await gdfe(`team/frc${teamNumber}`)
        .then((resp) => {
            if (resp["Errors"] != undefined || resp["Errors"] != null) return response = {};
            response.name = (resp.name) ? resp.name : null;
            response.nickname = (resp.nickname) ? resp.nickname : null;
            response.location = (resp.state_prov && resp.city) ? `${resp.city}, ${resp.state_prov}` : "Not Available"
        });
    if (response == {}) return response;
    await gdfe(`team/frc${teamNumber}/awards`)
    return response;
}


// Exports
module.exports = {
    gdfe,
    getTeamDetails
}