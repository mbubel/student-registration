$(document).ready(() => {
  // Variables
  // let table;
  // // eslint-disable-next-line prefer-const
  // let dateEditor;
  // Adding new class to database on click

  let defineStudioId = 0;

  $("#registerClass").on("click", e => {
    e.preventDefault();
    // eslint-disable-next-line prefer-const

    // Grab the studio name (string) that was registered when the class was created.
    // Then convert it to a studio_id (integer) so that the students table can be linked to the studios table.
    // eslint-disable-next-line prettier/prettier
    let studioName = $("#studio").find(":selected").text().trim();

    switch (studioName) {
      case "La Mesa":
        defineStudioId = 1;
        break;
      case "Santee":
        defineStudioId = 2;
        break;
      case "Bonita":
        defineStudioId = 3;
    }

    const postData = {
      studio: defineStudioId,
      day: $("#day")
        .find(":selected")
        .text()
        .trim(),
      start_time: $("#start_time")
        .find(":selected")
        .text()
        .trim(),
      end_time: $("#end_time")
        .find(":selected")
        .text()
        .trim(),
      teacher: $("#teacher")
        .find(":selected")
        .text()
        .trim()
    };
    $.ajax("/api/classes", {
      type: "POST",
      data: postData
    }).then(() => {
      location.reload();
      //alert("we figgured it out");
    });
  });

      // Getting data
      function getClassTable() {
        $.get("/api/classes", data => {
          // Calls function to add the data to table
          addToTabulatorTable(data);
        });
      }

      // Adding data to page using Tabulator
      function addToTabulatorTable(tableData) {
        table = new Tabulator("#classes-table", {
          data: tableData, //load row data from array
          layout: "fitColumns", //fit columns to width of table
          columns: [
            {
              title: "Studio",
              field: "Studio.studio_name",
              editor: "select",
              editorParams: {
                "La Mesa": "La Mesa",
                // eslint-disable-next-line prettier/prettier
                "Santee": "Santee",
                // eslint-disable-next-line prettier/prettier
                "Bonita": "Bonita"
              }
            },
            {
              title: "Day of the Week",
              field: "day_of_week",
              editor: "select",
              editorParams: {
                "Monday": "Monday",
                "Tuesday": "Tuesday",
                "Wednesday": "Wednesday",
                "Thursday": "Thursday",
                "Friday": "Friday",
                "Saturday": "Saturday"
              }
            },
            {
              title: "Start Time",
              field: "start_time",
            },
            {
              title: "End Time",
              field: "end_time",
            },
            {
              title: "Teacher",
              field: "teacher",
            },
            {
              formatter:"buttonCross",
              width:30,
              hozAlign:"center",
              cellClick: deleteRow}
          ]
        });
      }

      // If save button is clicked, compare data
      $("#save").on("click", () => {
        // eslint-disable-next-line prefer-const
        let newData = table.getData();

        $.get("/api/classes", data => {
          // Updates current saved data
          // eslint-disable-next-line prefer-const
          let currentData = data;

          for (let i = 0; i < newData.length; i++) {
            if (
              newData[i].day_of_week !== currentData[i].day_of_week || newData[i].Studio.studio_name !== currentData[i].Studio.studio_name
            ) {
              switch (newData[i].Studio.studio_name) {
                case "La Mesa":
                  newData[i].Studio.id = 1;
                  newData[i].studio_id = 1;
                  break;
                case "Santee":
                  newData[i].Studio.id = 2;
                  newData[i].studio_id = 2;
                  break;
                case "Bonita":
                  newData[i].Studio.id = 3;
                  newData[i].studio_id = 3;
              }
              updateData(newData[i]);
            }
          }
        });
      });

      // Update data
      function updateData(row) {
        $.ajax({
          method: "PUT",
          url: "/api/classes",
          data: row
        }).then(() => {
          location.reload();
        });
      }

      //Deleting
      function deleteRow(e, cell) {
        let cellId = cell.getRow().getData().id;
        $.ajax({
          method: "DELETE",
          url: "/api/classes/" + cellId
        }).then(() => {
          location.reload();
        });
      }


      // Show table on page load
      getClassTable();
});
