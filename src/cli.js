#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var commander = require("commander");
var main_1 = require("./main");
var program = new commander.Command();
program
    .version('0.0.2')
    .name('fy')
    .usage('<English>')
    .arguments('<English>')
    .action(function (english) {
    main_1.translate(english);
});
program.parse(process.argv);
