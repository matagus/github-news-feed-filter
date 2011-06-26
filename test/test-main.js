const main = require("main");
const self = require("self");

exports.test_test_run = function(test) {
  test.pass("Unit test running!");
};

exports.test_id = function(test) {
  test.assert(require("self").id.length > 0);
};

exports.testData = function(test) {
  test.assert(self.data.load("panel.js").length > 0);
};

exports.testData = function(test) {
  test.assert(self.data.load("github.js").length > 0);
};
