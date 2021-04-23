"use strict";

var cs142MakeMultiFilter = function (originalArr) {
  var currentArr = originalArr;
  var arrayFilterer = function (filterCritiria, callback) {
    if (typeof filterCritiria !== "function") {
      return currentArr;
    }
    currentArr = currentArr.filter(filterCritiria);

    if (typeof callback === "function") {
      callback.call(originalArr, currentArr);
    }
    return arrayFilterer;
  };
  return arrayFilterer;
};
