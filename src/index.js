"use strict";

var Digi = require('./lib/digi').Digi;


function JQConnector() {

  var canvas = $("#jdigi-canvas")
  var config = $("#jdigi-config");
  var toolbar = $("#jdigi-toolbar");
  var stattxt = $("#jdigi-status");
  var outtxt = $("#jdigi-output");
  var intxt = $("#jdigi-input");

  var digi = new Digi(canvas[0]);

  function setupConfig() {

  }

  function setupToolbar() {

  }

  function setupStatus() {
    let elem = stattxt;
    let text = "";
    let output = {
      clear: () => {
        text = "";
        elem.val(text);
      },
      putText: () => {
        text += s;
        elem.val(text);
      }
    };
    digi.statText = output;
  }

  function setupOutput() {
    let elem = outtxt;
    let text = "";
    let output = {
      clear: () => {
        text = "";
        elem.val(text);
      },
      putText: (s) => {
        text += s;
        elem.val(text);
      }
    };
    digi.outText = output;
  }

  function setupInput() {
    let elem = stattxt;
    let text = "";
    let input = {
      clear: () => {
        text = "";
        elem.val(text);
      },
      getText: () => {
        return "";
      }
    };
    digi.inText = input;
  }


  function setup(){
    setupConfig();
    setupToolbar();
    setupStatus();
    setupOutput();
    setupInput();
  }

  setup();

  this.start = function() {
    digi.start();
  };

}

$(document).ready(function(){
  var conn = new JQConnector();
  conn.start();
});
