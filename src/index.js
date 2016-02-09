var Digi = require('./lib/digi');


function JQConnector() {

  var canvas = $("#jdigi-canvas");
  var config = $("#jdigi-config");
  var toolbar = $("#jdigi-toolbar");
  var stattxt = $("#jdigi-status");
  var outtxt = $("#jdigi-output");
  var intxt = $("#jdigi-input");

  var digi = new Digi(canvas, stattxt, outtxt, intxt);

  function setupConfig() {

  }

  function setupToolbar() {

  }

  function setup(){
    setupConfig();
    setupToolbar();
  }

  setup();

  this.start = function() {
    digi.start();
  };

}

$document.ready(function(){
  var conn = new JQConnector();
  conn.start();
});
