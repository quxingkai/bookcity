var api = require("../../config").api;
const data = {};
api.forEach(function(item, key) {
    data[Object.keys(item)[0]] = Object.values(item)[0];
})
module.exports = data;