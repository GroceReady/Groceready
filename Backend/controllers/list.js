const initialSublistCategories = [];
const initialSublistSettings = {};

const pool = require('../db/db.js')


function pushListToDB(pantry) {
  //TODO
}

function createInititialList(typeString) {
  let gList = {};
  gList['type'] = typeString;
  gList['sublists'] = {};
  gList['sublistSettings'] = {}
  for (let listCat of initialSublistCategories) {
    gList['sublists'][listCat] = {};
    gList['sublistSettings'][listCat] = initialSublistSettings[listCat];
  }
  pushListToDB(gList)
  // pantry['items'] = [{'name':'butter', 'sublist': 'dairy'}]

  return gList;
}

function getItemsInList(list_id) {
  let sqlQuery = "SELECT * FROM item WHERE list_id = " + pool.escape(list_id);

  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
  // return pool.query(sqlQuery, function (err, rows, fields) {
  //   if (err) {
  //     console.log(err.stack)
  //   } else {
  //     return rows
  //   }
  // })
}

function getPantryList(request, response) {
  let hid = request.params.householdID
  var sqlQuery = 'SELECT * FROM list_table WHERE household_id = ' + pool.escape(hid) + 'AND list_type = \'pantry\'';
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack)
    } else {
      if (rows.length > 1) {
        throw Error('FOUND DUPLICATE PANTRIES')
      } else if (rows.length == 0) {
        throw Error('COULD NOT FIND PANTRIES WITH HOUSEHOLD ID ' + hid)
      }
      let list_id = rows[0].list_id;
      getItemsInList(list_id).then((itemList) => {
        rows[0]['items'] = itemList
        response.json(rows[0]);
      })
    }
  });
}


function getGroceryList(request, response) {
  let hid = request.params.householdID
  var sqlQuery = 'SELECT * FROM list_table WHERE household_id = ' + pool.escape(hid) + 'AND list_type = \'glist\'';
  pool.query(sqlQuery, function (err, rows, fields) {
    if (err) {
      console.log(err.stack)
    } else {
      if (rows.length > 1) {
        throw Error('FOUND DUPLICATE GROCERY LISTS')
      } else if (rows.length == 0) {
        throw Error('COULD NOT FIND GROCERY LIST WITH HOUSEHOLD ID ' + hid)
      }
      let list_id = rows[0].list_id;
      getItemsInList(list_id).then((itemList) => {
        rows[0]['items'] = itemList
        response.json(rows[0]);
      })
    }
  });
}


module.exports = {
  createInititialList,
  getPantryList,
  getGroceryList
};