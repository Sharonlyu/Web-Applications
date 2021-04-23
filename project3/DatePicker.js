"use strict";
class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
  }

  render(date) {
    let body = document.getElementById(this.id);
    let table = document.createElement("table");

    //first row:  < month year >
    let monthYearRow = table.insertRow(0);
    //preArrow -- <
    let pre = monthYearRow.insertCell(0);
    pre.innerHTML = "<";
    pre.setAttribute("id", "preArrow");
    pre.addEventListener("click", () => {
      if (date.getMonth() === 1) {
        date.setMonth(12);
        date.setYear(date.getFullYear() - 1);
      } else {
        date.setMonth(date.getMonth() - 1);
      }
      table.remove();
      this.render(date);
    });

    let monthYearCell = monthYearRow.insertCell(1);
    let monthsOfYear = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    monthYearCell.innerHTML =
      monthsOfYear[date.getMonth()] + " " + date.getFullYear();
    monthYearCell.setAttribute("id", "monthYearCell");
    monthYearCell.setAttribute("colspan", 5);

    //nextArrow >
    let next = monthYearRow.insertCell(2);
    next.innerHTML = ">";
    next.setAttribute("id", "nextArrow");
    next.addEventListener("click", () => {
      if (date.getMonth() === 12) {
        date.setMonth(1);
        date.setYear(date.getFullYear() + 1);
      } else {
        date.setMonth(date.getMonth() + 1);
      }
      table.remove();
      this.render(date);
    });

    //second row: days of the week
    let daysRow = table.insertRow(1);
    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let k = 0; k < 7; k++) {
      let cell = daysRow.insertCell(k);
      cell.innerHTML = daysOfWeek[k];
    }
    daysRow.setAttribute("id", "daysRow");

    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let cursor = new Date(firstDay.getTime());
    cursor.setDate(-firstDay.getDay() + 1);

    let i = 2; //index of row
    while (i > 1) {
      let row = table.insertRow(i);
      for (let j = 0; j < 7; j++) {
        let cell = row.insertCell(j);
        cell.innerHTML = cursor.getDate();
        if (cursor.getMonth() !== date.getMonth()) {
          cell.setAttribute("class", "otherMonth");
        } else {
          cell.setAttribute("class", "curMonth");
          //find the fixedDate and set the attribute
          if (cursor.getDate() === date.getDate()) {
            cell.setAttribute("id", "fixedDate");
          }
          //only dates on the current month are clickable
          cell.addEventListener("click", () => {
            let today = {
              month: date.getMonth() + 1,
              day: cell.innerHTML,
              year: date.getFullYear(),
            };
            this.callback(this.id, today);
          });
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      i++;
      if (cursor.getMonth() !== date.getMonth()) {
        break;
      }
    }
    body.appendChild(table);
  }
}
