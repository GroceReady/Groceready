const { request } = require("express");

const pool = require("../db/db.js");

// const householdHandler = require("./household.js")

function newUser(user, response) {
  var uid = user.body.id;
  var uname = user.body.fullName;
  console.log("UID " + uid);
  console.log("UNAME " + uname);
  var sqlQuery =
    "INSERT INTO user_table (user_id,user_name) VALUES(" +
    pool.escape(uid) +
    "," +
    pool.escape(uname) +
    ");";
  return pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      response.json(rows);
    }
  });
}

function getUser(request, response) {
  let uid = request.params.uid;
  console.log("REQUEST: " + uid);
  var sqlQuery = "SELECT * FROM user_table WHERE user_id = " + pool.escape(uid);
  return pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      if (rows.length != 1) {
        console.log("FOUND " + rows.length + " USERS WITH GIVEN ID");
      }
      response.json(rows[0]);
    }
  });
}

async function getUserHouseholds(request, response) {
  let uid = request.params.user_id;

  console.log(uid);
  var sqlQuery =
    "WITH given_user_households AS (select ref.household_id, h.household_name, h.join_code, h.created_by from household h join user_households ref on ref.household_id = h.household_id where ref.user_id = " +
    pool.escape(uid) +
    ")" +
    "SELECT given_user_households.*, pantry.list_id AS pantry_id, grocery.list_id AS glist_id from given_user_households join list_table pantry on pantry.household_id = given_user_households.household_id and pantry.list_type = 'pantry' join list_table grocery on grocery.household_id = given_user_households.household_id and grocery.list_type = 'glist';";
  // pool.escape('VRoNMc6OPrYEjhVlb1sugXdWZZu1')
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      // console.log(uid)
      // console.log("rows");
      // console.log(rows)
      // for (let h of rows) {
      //   await getPantryAndGList(rows['household_id'])
      //   console.log(pantryAndGList)
      //   h['pantry_id'] = pantryAndGList['pantry_id']
      //   h['glist_id'] = pantryAndGList['glist_id']
      // }
      rows.forEach(function (element) {
        if (uid == element.created_by) {
          element.is_owner = 1;
        } else {
          element.is_owner = 0;
        }
      });
      console.log("before")
      response.json(rows);
    }
  });
}

function getPantryAndGList(household_id) {
  var sqlQuery =
    "select distinct h.household_id, pantry.list_id AS pantry_id, grocery.list_id AS glist_id from (SELECT * FROM household WHERE household_id = " +
    pool.escape(household_id) +
    ") h join list_table pantry on pantry.household_id = h.household_id and list_type = 'pantry' join list_table grocery on grocery.household_id = h.household_id and list_type = 'glist'";
  // pool.escape('VRoNMc6OPrYEjhVlb1sugXdWZZu1')
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("found pantry and glist:");
      console.log(rows);
      return rows;
    }
  });
}

module.exports = {
  newUser,
  getUser,
  getUserHouseholds,
};
