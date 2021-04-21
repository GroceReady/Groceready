// Controller handler to handle functionality in home page

// const fetch = require("node-fetch");
const pantryHandler = require("./pantry.js");
const userHandler = require("./user.js");
const groceryListHandler = require("./grocerylist.js");
const db = require("../db/db.js");
const pool = require("../db/db.js");

const uniqueInvites = new Set();
var randomstring = require("randomstring");

// function createRoom(event) {
//   event.preventDefault();
//   console.log("IN CREATE ROOM");
// }

// Example for handle a get request at '/' endpoint.

async function getHouseholdByID(householdID) {
  // let [rows, fields] = await db.connection.promise().query(`SELECT * FROM household WHERE household_id='${householdID}'`);
  var sqlQuery =
    "SELECT * FROM household WHERE household_id = " + pool.escape(householdID);
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      return rows;
    }
  });
}

function getAllHouseholdByUserID(userID) {
  // let [rows, fields] = await db.connection.promise().query(`SELECT * FROM household WHERE household_id='${householdID}'`);
  var sqlQuery =
    "SELECT household_id FROM user_table WHERE user_id = " +
    pool.escape(userID);
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("all households");
      console.log(rows);
      return rows;
    }
  });
}

function getAllHouseholdNames(householdIDs) {
  // let [rows, fields] = await db.connection.promise().query(`SELECT * FROM household WHERE household_id='${householdID}'`);
  var sqlQuery =
    "SELECT household_id, household_name FROM household WHERE household_id IN " +
    pool.escape(householdIDs);
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
      `  12`;
    } else {
      return rows;
    }
  });
}

// [TODO remove item details ]
//remove the household from the household table, remove all users associated with taht
// function deleteHouseholdByID(householdID) {
//   var sqlQuery =
//     "DELETE FROM household WHERE household_id = ?; DELETE FROM user_households WHERE household_id = ?";
//   pool.query(
//     sqlQuery,
//     [householdID, householdID],
//     function (err, rows, fields) {
//       if (err) {
//         console.log(err.stack);
//       } else {
//         return;
//       }
//     }
//   );
// }

function leaveOrDelete(householdID, uid) {
  var sqlQuery =
    "SELECT is_owner FROM user_households WHERE household_id = ? AND user_id = ?;";
  pool.query(sqlQuery, [householdID, uid], function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("inside leave Or Delete");
      console.log(rows);
      console.log(rows[0]["is_owner"]);
      var isOwner = rows[0]["is_owner"];
      if (isOwner == 0) {
        //is not owner, leave
        console.log("inside leave now");
        var sqlQuery =
          "DELETE FROM user_households WHERE household_id = ? AND user_id = ?";
        pool.query(sqlQuery, [householdID, uid], function (err, rows, fields) {
          if (err) {
            console.log(err.stack);
          }
        });
      } else {
        console.log("inside delete now");
        //is owner, delete
        var sqlQuery =
          "DELETE FROM household WHERE household_id = ?; DELETE FROM user_households WHERE household_id = ?";
        pool.query(
          sqlQuery,
          [householdID, householdID],
          function (err, rows, fields) {
            if (err) {
              console.log(err.stack);
            } else {
              return;
            }
          }
        );
      }
    }
  });
}

// function leaveHouseholdByID(householdID, uid) {
//   console.log("inside leave now")
//   var sqlQuery =
//     "DELETE FROM user_households WHERE household_id = ? AND user_id = ?";
//   pool.query(
//     sqlQuery,
//     [householdID, uid],
//     function (err, rows, fields) {
//       if (err) {
//         console.log(err.stack);
//       } else {
//         return;
//       }
//     }
//   );
// }

function addUserToHousehold(joincode, uid) {
  //FIXME: Error =   Error: ER_BAD_NULL_ERROR: Column 'household_id' cannot be null

  let getHouseholdQuery =
    "SELECT household_id FROM household WHERE join_code = BINARY ?";
  pool.query(getHouseholdQuery, [joincode], function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      if (rows.length != 1) {
        throw Error(
          "Found " + rows.length + " households with join code " + joincode
        );
      }
      let householdID = rows[0]["household_id"];
      console.log("household id: ");
      console.log(householdID);
      var sqlQuery = "INSERT INTO user_households VALUES (?, ?, 0)";
      pool.query(sqlQuery, [uid, householdID], function (err, rows, fields) {
        if (err) {
          //check if user is trying to join household twice
          if (err.errno == 1062) {
            console.log("message", "User already exists in household."); //we send the flash msg
          } else {
            console.log(err.stack);
          }
        } else {
          return true;
        }
      });
    }
    // console.group("Oh no :(")
  });
}

function newHousehold(request, response) {
  let data = request.body;
  let hhName = request.body.hhName;
  let uid = request.params.uid;
  let joinCode = randomstring.generate(5);
  console.log(newHousehold);
  console.log(uid);
  // let joincode = generateJoinCode();
  // console.log(joincode);
  var sqlQuery =
    "INSERT INTO household (household_name,created_by,join_code) VALUES(" +
    pool.escape(hhName) +
    "," +
    pool.escape(uid) +
    "," +
    pool.escape(joinCode) +
    ");";

  sqlQuery +=
    "INSERT INTO user_households (user_id,household_id,is_owner) VALUES(" +
    pool.escape(uid) +
    ",(SELECT household_id FROM household WHERE created_by = ? and household_name = ?),1);";
  sqlQuery +=
    "INSERT INTO list_table (household_id,list_name,list_type) VALUES(" +
    "(SELECT household_id FROM household WHERE created_by = ? and household_name = ?),?,?)" +
    ",((SELECT household_id FROM household WHERE created_by = ? and household_name = ?),?,?);";
  console.log(sqlQuery);
  pool.query(
    sqlQuery,
    [uid, hhName, uid, hhName, hhName, "glist", uid, hhName, hhName, "pantry"],
    function (err, rows, fields) {
      if (err) {
        console.log(err.stack);
      } else {
        response.json(rows);
      }
    }
  );
}

function getHousehold(request, response) {
  response.json(getHouseholdByID(request.params.householdID));
}

function getAllHouseholds(request, response) {
  response.json(getAllHouseholdByUserID(request.params.householdID));
}

//gets a list of household ids, and household_name
function getAllHouseholdNames(request, response) {
  housholdIDs = getAllHouseholdByUserID(request.params.householdID);
  response.json(getAllHouseholdNames(request.params.householdID));
}

function deleteHousehold(request, response) {
  console.log("here now@@");
  console.log(request.params.householdID);
  let householdID = request.params.householdID;
  deleteHouseholdByID(householdID);
  response.json({ status: "success!" });
}

function leaveHousehold(request, response) {
  console.log(request.params.householdID);
  let householdID = request.params.householdID;
  var uid = request.body.uid;
  leaveHouseholdByID(householdID, uid);
  response.json({ status: "success!" });
}

function leaveOrDeleteHousehold(request, response) {
  console.log(request.params.householdID);
  console.log(request);
  let householdID = request.params.householdID;
  var uid = request.body.uid;
  leaveOrDelete(householdID, uid);
  response.json({ status: "success!" });
}

function checkOwnerHousehold(request, response) {
  let householdID = request.params.householdID;
  var uid = request.body.uid;
  console.log("doing checks");
  console.log(uid);
  console.log("household id");
  console.log(householdID);
  var sqlQuery =
    "SELECT is_owner FROM user_households WHERE user_id = ? and household_id = ?;";
  pool.query(sqlQuery, [uid, householdID], function (err, rows, fields) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(rows);
      value = rows[0]["is_owner"];
      response.json(value);
      console.log("done logging");
      // if (rows[0]["is_owner"] == 0) {
      //   //NOT owner
      //   response.json({ isOwner: false });
      // } else {
      //   //owner
      //   response.json({ isOwner: true });
      // }
    }
  });
}

function joinHousehold(request, response) {
  console.log("here at join");
  console.log(request.body);
  joinCode = request.body.joinCode;
  uid = request.params.uid;
  addUserToHousehold(joinCode, uid);
  response.json({ status: "success" });
}

// NOTE: this lives in user... for some reason. Couldn't move it here without errors
// function getPantryAndGList(household_id) {

//   var sqlQuery =
//   "select distinct h.household_id, pantry.list_id AS pantry_id, grocery.list_id AS glist_id from (SELECT * FROM household WHERE household_id = " + pool.escape(household_id) + ") h join list_table pantry on pantry.household_id = h.household_id and list_type = \'pantry\' join list_table grocery on grocery.household_id = h.household_id and list_type = \'glist\'"
//     pool.escape(uid);
//     // pool.escape('VRoNMc6OPrYEjhVlb1sugXdWZZu1')
//   pool.query(sqlQuery, function (err, rows, fields) {
//     if (err) {
//       console.log(err.stack);
//     } else {
//       return rows
//     }
//   });
// };

module.exports = {
  newHousehold,
  //updateHousehold,
  getHousehold,
  getAllHouseholds,
  getAllHouseholdNames,
  deleteHousehold,
  joinHousehold,
  leaveHousehold,
  checkOwnerHousehold,
  leaveOrDeleteHousehold,
  // getPantryAndGList
};
