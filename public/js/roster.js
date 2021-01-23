/* eslint-disable indent */
/* eslint-disable prefer-const */
$(document).ready(() => {
  // Function to get current date to display on roster page.
  function displayCurrentDate() {
    const currentDay = findCurrentDay();
    const tdate = new Date();
    const dd = tdate.getDate(); //yields day
    const MM = tdate.getMonth(); //yields month
    const yyyy = tdate.getFullYear(); //yields year
    const currentDate = currentDay + " " + (MM + 1) + "/" + dd + "/" + yyyy;
    $("#displayDate").append(`<p> Today is: ${currentDate}</p>`);
  }

  // Function to convert day of the week (number) from moment.js to text. E.g. 4 = Thursday.
  function findCurrentDay() {
    let dayOfWeek;
    let m = moment().day();
    switch (m) {
      case 0:
        dayOfWeek = "Sunday";
        break;
      case 1:
        dayOfWeek = "Monday";
        break;
      case 2:
        dayOfWeek = "Tuesday";
        break;
      case 3:
        dayOfWeek = "Wednesday";
        break;
      case 4:
        dayOfWeek = "Thursday";
        break;
      case 5:
        dayOfWeek = "Friday";
        break;
      case 6:
        dayOfWeek = "Saturday";
    }
    console.log("we are in the switch");
    console.log(dayOfWeek);
    return dayOfWeek;
  }

  // On click event waiting for user to click on the find class rosters button
  $("#classRoster").on("click", e => {
    e.preventDefault();

    //Define object that holds the class times for the studio and class day the user wants to see.
    const sortedClassDay = {
      studioName: $("#studio")
        .find(":selected")
        .val()
        .trim(),
      classDay: $("#day")
        .find(":selected")
        .val()
        .trim()
    };

    // AJAX GET request to get rosters the for the day and studio entered by the user.
    $.ajax({
      url:
        "/api/roster?studioName=" +
        sortedClassDay.studioName +
        "&classDay=" +
        sortedClassDay.classDay,
      type: "GET"
    }).then(classesForDay => {
      // location.reload();
      addToTabulatorRosterTable(classesForDay);
    });
  });

  // Function (AJAX GET request) to display classes for the current day for all studios. Before the user selects the studio and day they want to see.
  function setRostersCurrentDay() {
    const dayofweek = findCurrentDay();
    console.log("We are in set urrent asdfas");
    console.log(dayofweek);
    $.ajax({
      url: "/api/currentRoster?classDay=" + dayofweek,
      type: "GET"
    }).then(classesForDay => {
      // location.reload();
      addToTabulatorRosterTable(classesForDay);
    });
  }

  // Adding roster data to page using Tabulator and nested tables.
  // The main table (table) is the class details table.
  // The nested table (subTable) is the table containing the student details who are in that particular class.
  function addToTabulatorRosterTable(tableData) {
    console.log("This is the tabledata");
    console.log(tableData);

    table = new Tabulator("#roster-table", {
      height: "auto",
      layout: "fitColumns",
      // resizableColumns: false,
      data: tableData, //load row data from array
      layout: "fitColumns", //fit columns to width of table
      columns: [
        {
          title: "Studio",
          field: "Studio.studio_name"
        },
        {
          title: "Class Day",
          field: "day_of_week"
        },
        {
          title: "Start Time",
          field: "start_time"
        },
        {
          title: "End Time",
          field: "end_time"
        },
        {
          title: "Teacher",
          field: "teacher"
        }
      ],
      rowFormatter: function(row) {
        //create and style holder elements
        const holderEl = document.createElement("div");
        const tableEl = document.createElement("div");

        holderEl.style.boxSizing = "border-box";
        holderEl.style.padding = "10px 30px 10px 10px";
        holderEl.style.borderTop = "1px solid #333";
        holderEl.style.borderBotom = "1px solid #333";
        holderEl.style.background = "#ddd";

        tableEl.style.border = "1px solid #333";

        holderEl.appendChild(tableEl);

        row.getElement().appendChild(holderEl);

        subTable = new Tabulator(tableEl, {
          layout: "fitColumns",
          data: row.getData().Students,
          columns: [
            {
              title: "Student's Last Name",
              field: "last_name"
            },
            {
              title: "Student's First Name",
              field: "first_name"
            },
            {
              title: "Student Progress Level",
              field: "student_level"
            }
          ]
        });
      }
    });
  }
  // Call function to get and display curreny day/date on the roster page
  displayCurrentDate();

  // Call function to display class rosters on the screen for the current day
  setRostersCurrentDay();
});
