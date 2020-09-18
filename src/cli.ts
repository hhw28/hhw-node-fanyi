#!/usr/bin/env node
import * as commander from 'commander';
import {translate} from './main';

const program = new commander.Command();

program
  .version('1.0.0')
  .name('fy')
  .usage('<English>')
  .arguments('<English>')
  .action(function (english) {
    translate(english)
  });

program.parse(process.argv);
