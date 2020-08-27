// Imports
const fetch = require('node-fetch');

// Constants
const key = "lrqZK0XAvSpeHXuWi9vhbmnAbF4ueBRQB3OevJC1pOWIWQdwX1WKRJ4oQceP0ox5";



const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']





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
    var response = new Object;

    await gdfe(`team/frc${teamNumber}/awards`)
        .then((resp) => {
            if(resp.length === 0) return;
            response.awards = resp;
        })
        return response;

}

async function teamYears(teamNumber) {
    var response = new Object;

    await gdfe(`team/frc${teamNumber}/years_participated`)
        .then((resp) => {response.years = resp})
        return response;

}

async function teamMedia(teamNumber) {
    var response = new Object;
    
    await gdfe(`team/frc${teamNumber}/media/2020`).then((resp) => {
        if(!resp[0]) return response.picture = null; 
        response.picture = resp[0].details.base64Image;
    })
    return response;

}

async function teamEvents(teamNumber) {
    var response = new Object;

    await gdfe(`team/frc${teamNumber}/events/2019`)
    .then((resp)=> { 
        // console.log(resp)
        if(resp.Errors) return response = {};
        response.events = resp;
        // if(resp.length >= 1) return;
        response.events.sort((a, b) => {
            var startDate1 = new Date(a.start_date)
            var startDate2 = new Date(b.start_date)
            return startDate1.getTime() - startDate2.getTime()
        })

        for(i=0; response.events.length > i; i++) {
            var startDate = new Date(response.events[i].start_date)
            var endDate = new Date(response.events[i].end_date);
            response.events[i].dateString = `${months[startDate.getMonth()]} ${startDate.getDate()} - ${months[endDate.getMonth()]} ${endDate.getDate()}`
        }
    
    })
    return response;

}

async function basicTeamDetails(teamNumber) {
    var response = new Object;
    await gdfe(`team/frc${teamNumber}`)
        .then((resp) => {
            // console.log(resp)
            if (resp["Errors"] != undefined || resp["Errors"] != null) return response = {};
            response.name = (resp.name) ? resp.name : null;
            response.nickname = (resp.nickname) ? resp.nickname : null;
            response.location = (resp.state_prov && resp.city) ? `${resp.city}, ${resp.state_prov}` : "Location Not Available";
            response.city = resp.city;
            response.state_prov = resp.state_prov;
            response.country = resp.country;
        });
        return response;
}

async function statboticsTeamData(teamNumber) {
    var response = new Object;
    await fetch(`https://backend.statbotics.io/api/team/${teamNumber}`)
        .then(async (resp) => {
            try{
              resp = await resp.json()  
            response.elo = `${resp[0].elo} Elo`;
            } catch(e) {
            console.log(e)
            response.elo = 'Elo Unavailable';
            }
        })
        return response;
}
async function getTeamDetails(teamNumber = null) {
    var response = new Object;
        await Promise.all([basicTeamDetails(teamNumber), teamYears(teamNumber), teamEvents(teamNumber), teamMedia(teamNumber), teamAwards(teamNumber), statboticsTeamData(teamNumber)]).then((val) => {
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