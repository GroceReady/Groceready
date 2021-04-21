const { default: HouseHold } = require("../pages/HouseHold");

const apiBaseURL = ""//TODO:

function makeCall(route, method) {
    let headers = {};
    headers['method'] = method
    return fetch(apiBaseURL + route, headers);
}

function getHousehold(householdID) {
    return makeCall('/household/' + HouseHoldID).then((res) => res.json()).then((household) => {
        return household
    })
}



module.exports = {
    getHousehold
}