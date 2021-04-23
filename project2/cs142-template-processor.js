"use strict";
function Cs142TemplateProcessor(template) {
  this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
  let temp = this.template;
  let found = null;
  let re = /{{(.*?)}}/;
  while ((found = temp.match(re)) !== null) {
    if(!dictionary[found[1]] || dictionary[found[1]] === ""){
      temp = temp.replace(found[0], "");
    }else{
      temp = temp.replace(found[0], dictionary[found[1]]);
    }
  }
  temp = temp.replace(/{{\s+}}/g, "");
  return temp;
};

var template = 'My favorite month is {{month}} but not the day {{day}} or the year {{}}';
var dateTemplate = new Cs142TemplateProcessor(template);


//Case: property doesn't exist in dictionary
// var dictionary2 = {day:'', year: '2016'};
// var str = dateTemplate.fillIn(dictionary2);
var dictionary2 = {day: '', year: '2016'};
var str = dateTemplate.fillIn(dictionary2);
console.log(str);
//assert(str === 'My favorite month is  but not the day 1 or the year 2016');
