$(document).ready(() => {
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
      url: "/api/roster",
      type: "GET",
      data: sortedClassDay,
      contentType: "application/json"
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
    table = new Tabulator("#roster-table", {
      data: tableData, //load row data from array
      layout: "fitColumns", //fit columns to width of table
      columns: [
        {
          title: "Studio",
          field: "Studio.studio_name"
        },
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
          headerSort: false
        },
        {
          title: "Student's Last Name",
          field: "last_name",
          headerSort: false
        }
      ]
    });
  }

  // getRosterTable();
});
