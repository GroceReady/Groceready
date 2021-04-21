const pool = require("../db/db.js");

function pushItemToDB(item) {
    var sqlQuery =
        "insert into item (list_id,quantity,item_name) VALUES (" +
        item["listID"] +
        "," +
        item["quantity"] +
        "," +
        pool.escape(item["item_name"]) +
        ");";

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
    // pool.query(sqlQuery, function (err, rows, fields) {
    //     if (err) {
    //         console.log(err.stack);
    //     } else {
    //         console.log("PUSH ITEM RETURN ROWS")
    //         console.log(rows)
    //         return rows;
    //     }
    // });
}

function updateItemInDB(item, itemID) {
    let updateStatements = []
    for (let updateField of Object.keys(item)) {
        updateStatements.push(updateField + " = " + pool.escape(item[updateField]))
    }
    let sqlQuery = "UPDATE item SET " + updateStatements.join(', ') + " WHERE item_id = " + itemID ;//pool.escape(itemID);
    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


function getItemID(item_name, list_id) {
    var sqlQuery =
        "select item_id from item where list_id = " +
        list_id +
        "and item_name = " +
        item_name +
        ";";
    pool.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log(err.stack);
        } else {
            return rows;
        }
    });
}

function moveToOtherList(request, response){
    let itemList = request.body.itemList;
    let otherListID = request.body.otherListID;
    console.log("itemList", itemList)
    sqlQuery = "UPDATE item SET list_id = "+ pool.escape(otherListID)+" WHERE item_id IN (" + pool.escape(itemList) + ")"
    console.log(sqlQuery)
    pool.query(sqlQuery,[otherListID, (itemList)], function (err, rows, fields) {
        if (err) {
            console.log(err.stack);
        } else {
            return rows;
        }
    });
}

function getItemByID(itemID) {
    let sqlQuery = "SELECT * FROM item WHERE item_id = ?";

    return new Promise((resolve, reject) => {
        pool.query(sqlQuery, [itemID], (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


function newItem(request, response) {
    console.log("new item")
    let itemData = request.body;
    let listID = request.params.listID;
    let item = {};
    item["listID"] = parseInt(listID);
    item["item_name"] = itemData["name"];
    item["quantity"] = itemData["quantity"];
    item["itemDetails"] = {};
    console.log(item);
    pushItemToDB(item).then((itemID) => {
        item['item_id'] = itemID.insertId;
        response.json(item)
    });
}

function deleteItemByID(itemID) {
    var sqlQuery = "delete from item where item_id = " + itemID;
    pool.query(sqlQuery, function (err, rows, fields) {
        if (err) {
            console.log(err.stack);
        } else {
            return rows;
        }
    });
}

function updateItem(request, response) {
    let itemID = request.params.itemID;
    getItemByID(itemID).then((items) => {
        let updatedItem;
        let updatedFields = {};
        if (items.length != 1) {
            throw Error("Found " + items.length + " items with id " + itemID);
        } else {
            updatedItem = items[0]
        }
        for (let field of Object.keys(request.body)) {
            if (Object.keys(updatedItem).includes(field)) {
                updatedItem[field] = request.body[field];
                updatedFields[field] = request.body[field]
            } else {
                let errorMesage =
                    "didn't recognize item field " + field + "in item handler";
                throw new Error(errorMesage);
            }
        }
        updateItemInDB(updatedFields, itemID).then(() => response.json(updatedItem));
    })
}

function deleteItem(request, response) {
    let itemID = request.params.itemID;
    deleteItemByID(itemID);
    response.json({ status: "success!" });
}

module.exports = {
    newItem,
    updateItem,
    deleteItem,
    moveToOtherList
};
