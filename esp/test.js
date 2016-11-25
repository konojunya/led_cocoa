var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa('noteiprs7bq4.mlkcca.com');
var led = milkcocoa.dataStore('led');

led.push({red:150,green:100,blue:0});
