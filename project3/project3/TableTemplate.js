"use strict";

class TableTemplate {
  static fillIn(id, dict, columnName) {
    let table = document.getElementById(id);
    let tbody = table.tBodies[0];
    if (tbody.rows.length !== 0) {
      let firstRow = tbody.rows[0];
      let newfirstRow = new Cs142TemplateProcessor(firstRow.innerHTML).fillIn(
        dict
      );
      firstRow.innerHTML = newfirstRow;

      //find matched cols
      let colIndexArr = [];
      if (columnName !== undefined) {
        for (let k = 0; k < firstRow.cells.length; k++) {
          if (firstRow.cells[k].innerHTML === columnName) {
            colIndexArr.push(k);
          }
        }
      } else {
        for (let k = 0; k < firstRow.cells.length; k++) {
          colIndexArr.push(k);
        }
      }

      //replace values
      for (let i = 1; i < tbody.rows.length; i++) {
        let rowi = tbody.rows[i];
        for (let j = 0; j < colIndexArr.length; j++) {
          let cell = rowi.cells[colIndexArr[j]];
          let newCell = new Cs142TemplateProcessor(cell.innerHTML).fillIn(dict);
          cell.innerHTML = newCell;
        }
      }
      //set visibility
      if (table.style.visibility === "hidden") {
        table.style.visibility = "visible";
      }
    }
  }
}
