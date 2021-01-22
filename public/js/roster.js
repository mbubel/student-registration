// Getting data
function getRosterTable() {
  $.get("/api/students", (data) => {
    // Calls function to add the data to table
    addToTabulatorTable(data);
  });
}

// Adding data to page using Tabulator
function addToTabulatorTable(tableData) {

  table = new Tabulator("#roster-table", {
    data: tableData, //load row data from array
    layout: "fitColumns", //fit columns to width of table
    columns: [
      {
        title: "Class Day",
        field: "AvailableClass.day_of_week"
      },
      {
        title: "Start Time",
        field: "AvailableClass.start_time"
      },
      {
        title: "End Time",
        field: "AvailableClass.end_time"
      },
      {
        title: "Teacher",
        field: "AvailableClass.teacher"
      },
      {
        title: "Student's First Name",
        field: "first_name",
        headerSort:false
      },
      {
        title: "Student's Last Name",
        field: "last_name",
        headerSort:false
      }
    ]
  });
}

getRosterTable();