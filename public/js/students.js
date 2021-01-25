/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable indent */
$(document).ready(() => {
  // Variables
  let table;
  // eslint-disable-next-line prefer-const
  let dateEditor;
  let defineStudioId = 0;
  // Adding new student to database
  $("#registerStudent").on("click", e => {
    e.preventDefault();

    // eslint-disable-next-line prefer-const

    // Grab the studio name (string) that was registered with the student.
    // Then convert it to a studio_id (integer) so that the students table can be linked to the studios table.
    // eslint-disable-next-line prettier/prettier
    let studioName = $("#inputStudio").val();

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

    let postData = {
      lastName: $("#lastName")
        .val()
        .trim(),
      firstName: $("#firstName")
        .val()
        .trim(),
      birthdate: $("#birthdate")
        .val()
        .trim(),
      inputStatus: $("#inputStatus")
        .find(":selected")
        .text(),
      inputLevel: $("#inputLevel")
        .find(":selected")
        .text(),
      inputStudio: defineStudioId,
      classId: $("#classId")
        .find(":selected")
        .val()
    };

    $.ajax("/api/students", {
      type: "POST",
      data: postData
    }).then(() => {
      location.reload();
      //alert("we figgured it out");
    });
  });

  // Getting data
  function getStudentTable() {
    $.get("/api/students", data => {
      // Calls function to add the data to table
      addToTabulatorTable(data);
    });
  }

  // Adding data to page using Tabulator
  function addToTabulatorTable(tableData) {
    table = new Tabulator("#student-table", {
      data: tableData, //load row data from array
      layout: "fitColumns", //fit columns to width of table
      pagination: "local", //paginate the data
      paginationSize: 10, //allow 10 rows per page of data
      columns: [
        {
          title: "First Name",
          field: "first_name",
          editor: "input",
          validator: ["required", "string"]
        },
        {
          title: "Last Name",
          field: "last_name",
          editor: "input",
          validator: ["required", "string"]
        },
        {
          title: "Date of Birth",
          field: "date_of_birth",
          editor: dateEditor,
          validator: "required"
        },
        {
          title: "Status",
          field: "student_status",
          editor: "select",
          editorParams: {
            Intro: "Intro",
            // eslint-disable-next-line prettier/prettier
            "Current Student": "Current Student",
            "On a Break": "On a Break",
            // eslint-disable-next-line prettier/prettier
            Done: "Done"
          }
        },
        {
          title: "Progress Level",
          field: "student_level",
          editor: "select",
          editorParams: {
            Pastels: "Pastels",
            Watercolors: "Watercolors",
            Oils: "Oils"
          }
        },
        {
          title: "Studio",
          field: "Studio.studio_name",
          editor: "select",
          editorParams: {
            "La Mesa": "La Mesa",
            // eslint-disable-next-line prettier/prettier
            Santee: "Santee",
            // eslint-disable-next-line prettier/prettier
            Bonita: "Bonita",
          }
        }
      ]
    });
  }

  // If save button is clicked, compare data
  $("#save").on("click", () => {
    // eslint-disable-next-line prefer-const
    let newData = table.getData();

    $.get("/api/students", data => {
      // Updates current saved data
      // eslint-disable-next-line prefer-const
      let currentData = data;

      for (let i = 0; i < newData.length; i++) {
        if (
          newData[i].last_name !== currentData[i].last_name ||
          newData[i].first_name !== currentData[i].first_name ||
          newData[i].date_of_birth !== currentData[i].date_of_birth ||
          newData[i].student_status !== currentData[i].student_status ||
          newData[i].student_level !== currentData[i].student_level ||
          newData[i].Studio.studio_name !== currentData[i].Studio.studio_name
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
      url: "/api/students",
      data: row
    }).then(() => {
      //location.reload();
    });
  }

  // Create Date Editor (taken from tabulator docs)
  dateEditor = function(cell, onRendered, success, cancel) {
    //create and style input
    // eslint-disable-next-line no-var
    var cellValue = moment(cell.getValue(), "YYYY-MM-DD").format("YYYY-MM-DD"),
      input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    // eslint-disable-next-line prefer-arrow-callback
    onRendered(function() {
      input.focus();
      input.style.height = "100%";
    });

    function onChange() {
      // eslint-disable-next-line eqeqeq
      if (input.value != cellValue) {
        success(moment(input.value, "YYYY-MM-DD").format("YYYY-MM-DD"));
      } else {
        cancel();
      }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    return input;
  };

  // Show table on page load
  getStudentTable();
});
