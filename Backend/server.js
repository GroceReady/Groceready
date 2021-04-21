// import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");

// import handlers
const householdHandler = require("./controllers/household.js");
const itemHandler = require("./controllers/item.js");
const userHandler = require("./controllers/user.js");
const listHandler = require("./controllers/list.js");

// const roomHandler = require('./controllers/room.js');
// const roomGenerator = require('./util/roomIdGenerator.js');
const { request } = require("express");
const moment = require("moment");
const { connect } = require("http2");

const app = express();
const port = 4567;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// var pool = mysql.createPool({
//     host: "groceready.cbrml2sf20qq.us-east-2.rds.amazonaws.com",
//     user: "admin",
//     password: "groceready",
//     port: "3306",
//     database: "groceready"
// });

// connection.connect(function(err) {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database.');
// })

//end connection
// connection.end();

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
// app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// set up stylesheets route  | TODO: Do *I* have to do this???

// Create controller handlers to handle requests at each endpoint
// app.get('/', homeHandler.getHome);
// app.get('/:roomId', roomHandler.getRoom);
// app.post('/create',createRoom);
// app.get('/roomList/get', getRoomList);
// app.get('/:roomId/info', getRoomInfo);
// app.post('/:roomId/message', postMessage);

app.post("/household/:uid/newHousehold", householdHandler.newHousehold);
//app.put("/household/:householdID", householdHandler.updateHousehold);
app.get("/household/:householdID", householdHandler.getHousehold);
app.get("/household/:householdID/getall", householdHandler.getAllHouseholds);
app.get(
  "/household/:householdID/getallnames",
  householdHandler.getAllHouseholdNames
);
app.delete("/household/:householdID", householdHandler.deleteHousehold);
app.post("/household/:uid/join", householdHandler.joinHousehold);
app.post("/household/:householdID/checkowner", householdHandler.checkOwnerHousehold);
app.post("/household/:householdID/leave", householdHandler.leaveHousehold);
app.post("/household/:householdID/leaveordelete", householdHandler.leaveOrDeleteHousehold);


app.post("/:listID/item", itemHandler.newItem);
app.put("/:listID/move", itemHandler.moveToOtherList);
app.put("/item/:itemID", itemHandler.updateItem);
// app.post('/:itemID/food/changeQuantity', itemHandler.updateItemQuantity)
app.delete("/item/:itemID", itemHandler.deleteItem);

app.post("/user", userHandler.newUser);
app.get("/user/:uid", userHandler.getUser);
app.get("/user/:user_id/households", userHandler.getUserHouseholds);

app.get("/list/grocerylist/:householdID", listHandler.getGroceryList);
app.get("/list/pantrylist/:householdID", listHandler.getPantryList);
app.get("/user/:user_id/households", userHandler.getUserHouseholds);

// app.get('/:itemID/food', itemHandler.deleteItem)
// NOTE: This is the sample server.js code we provided, feel free to change the structures

// catch 404
app.use(function (req, res, next) {
  console.log(req);
  console.log("error");
  console.log(req.originalUrl);
  var err = new Error("Not Found" + req.originalUrl);
  err.status = 404;
  next(err);
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
