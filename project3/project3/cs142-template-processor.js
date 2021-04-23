"use strict";
function Cs142TemplateProcessor(template) {
  this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
  let temp = this.template;
  let found = null;
  let re = /{{(.*?)}}/;
  while ((found = temp.match(re)) !== null) {
    if(found[1] === "" || !dictionary[found[1]] || dictionary[found[1]] === ""){
      temp = temp.replace(found[0], "");
    }else{
      temp = temp.replace(found[0], dictionary[found[1]]);
    }
  }
  temp = temp.replace(/{{\s+}}/g, "");
  return temp;
};


