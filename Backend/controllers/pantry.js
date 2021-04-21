const pool = require("../db/db");
const listHandler = require('./list.js');

function pushPantryToDB(pantry) {
    //TODO
}

function createInitialPantry() {
  let pantry = listHandler.createInititialList('grocery');
  return pantry;
}


module.exports = {
    createInitialPantry
};