'use strict';
const fs = require('fs');
const readline = require('readline');
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({'input': rs, 'output': {} });
const prefectureDataMap = new Map();
rl.on('line', lineString => {
  const columes = lineString.split(',');
  const year = parseInt(columes[0]);
  const prefecture = columes[2];
  const popu = parseInt(columes[7]);
  if (year === 2010 || year == 2015) {
    let value = prefectureDataMap.get(prefecture);
    if (!value) {
      value = {
        popu10: 0,
        popu15: 0,
        change: null
      };
    }
    if (year === 2010) {
      value.popu10 += popu;
    }
    if (year === 2015) {
      value.popu15 += popu;
    }
    prefectureDataMap.set(prefecture, value);
  }
});

rl.on('close', () => {
  for (let [key, value] of prefectureDataMap) {
    value.change = value.popu15 / value.popu10;
  }
  console.log(prefectureDataMap);
});
