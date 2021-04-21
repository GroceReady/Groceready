const listHandler = require('./list.js');

function getInitialGroceryList() {
    let grocery = glist.createInititialList('grocery');
    return grocery;
}



module.exports = {
    getInitialGroceryList
  };