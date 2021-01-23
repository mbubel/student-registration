$(document).ready(() => {
  let table;
  let subTable;

  $("#classRoster").on("click", e => {
    e.preventDefault();

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

    console.log(
      "##### Let's see what we have : " +
        sortedClassDay.studioName +
        " " +
        sortedClassDay.classDay
    );

    console.log(sortedClassDay);
    // $.get("/api/roster", sortedClassDay).then(classesForDay => {
    //   // location.reload();
    //   addToTabulatorRosterTable(classesForDay);
    //   alert("I figured it out");
    // });

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
      alert("I figured it out");
    });
  });

  // Getting data
  // function getRosterTable() {
  //   $.get("/api/rosters", data => {
  //     // Calls function to add the data to table
  //     addToTabulatorRosterTable(data);
  //   });
  // }

  // Adding data to page using Tabulator
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
              title: "Student's First Name",
              field: "first_name"
            },
            {
              title: "Student's Last Name",
              field: "last_name"
            }
          ]
        });
      }
    });
  }

  // getRosterTable();
});
