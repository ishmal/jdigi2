"use strict";

var Digi = require('./lib/digi').Digi;


function JQConnector() {

  var canvas = $("#jdigi-canvas");
  var config = $("#jdigi-config");
  var toolbar = $("#jdigi-toolbar");
  var stattxt = $("#jdigi-status");
  var outtxt = $("#jdigi-output");
  var intxt = $("#jdigi-input");

  var digi = new Digi(canvas[0]);

  function setupConfig() {
      config.empty();
      var modes = digi.modes;
      let tab = $("<ul class='nav nav-tabs'>");
      let content = $("<div class='tab-content container'>");
      config.append(tab, content);
      modes.forEach(function(m) {
        let p = m.properties;
        // LINK
        let item = $("<li class='nav-item'>");
        tab.append(item);
        let link = $("<a class='nav-link' data-toggle='tab'>").text(p.name)
          .attr('href', '#tab_' + p.name);
        item.append(link);
        // PANEL
        let panel = $("<div class='tab-pane' role='tabpanel' height='300px'>")
          .attr('id', 'tab_' + p.name);
        content.append(panel);
        let title = $("<h4 class='col-md-12'>").text(p.description);
        panel.append(title);
        let ctrlPanel = $("<div class='row'>");
        panel.append(ctrlPanel);
        let ctrls = p.controls;
        ctrls.forEach(function(ctrl){
          let type = ctrl.type;
          if (type === 'choice') {
            let drop = $("<div class='open'>");
            panel.append(drop);
            let dropId = "drop_" + ctrl.name;
            let btn = $("<button class='btn btn-secondary dropdown-toggle' type='button'" +
                " data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>")
                .attr('id', dropId).text(ctrl.name);
            drop.append(btn);
            let menu = $("<div class='dropdown-menu'>").attr('aria-labelledby', dropId);
            drop.append(menu);
            let opts = ctrl.options;
            opts.forEach(function(opt){
              let anc = $("<a class='dropdown-item'>").attr('href','#').text(opt.name);
              menu.append(anc);
            });
          } else if (type === 'boolean') {
              let btn = $("<button type='button' class='btn btn-primary' data-toggle='button' " +
              " aria-pressed='false' autocomplete='off'>").text(ctrl.name);
              panel.append(btn);
          } else {
            console.log("Unhandled control type '" + type + "'");
          }
        });

      });
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
