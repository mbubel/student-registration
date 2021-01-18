$(document).ready(() => {
  // Current Table Data
  let table;
 
  // Adding new student to database
  $("#registerStudent").on("click", () => {
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
      inputStudio: $("#inputStudio")
        .find(":selected")
        .text()
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
    $.get("/api/students", function(data) {
      // Calls function to add the data to table
      addToTabulatorTable(data);
    })
  }

  // Adding data to page using Tabulator
  function addToTabulatorTable(tableData) {

    table = new Tabulator("#example-table", {
      data:tableData, //load row data from array
      layout:"fitColumns", //fit columns to width of table
      columns:[
          {title:"First Name", field:"first_name", editor:"input", validator:["required","string"]},
          {title:"Last Name", field:"last_name", editor:"input", validator:["required","string"]},
          {title:"Date of Birth", field:"date_of_birth", editor:dateEditor, validator:"required"},
          {title:"Status", field:"student_status", editor:"select", editorParams:{"Intro":"Intro", "Current Status": "Current Status", "On a Break":"On a Break", "Done":"Done"}},
          {title:"Studio", field:"studio", editor:"select", editorParams:{"La Mesa":"La Mesa", "Santee": "Santee", "Bonita":"Bonita"}}
      ]
    });
  }

  // If save button is clicked, compare data
  $("#save").on("click", () => {
    let newData = table.getData();
    
    $.get("/api/students", function(data) {
      // Updates current saved data
      let currentData = data;

      for (let i = 0; i < newData.length; i++){
        if(newData[i].last_name !== currentData[i].last_name || newData[i].first_name !== currentData[i].first_name || newData[i].date_of_birth !== currentData[i].date_of_birth || newData[i].student_status !== currentData[i].student_status || newData[i].studio !== currentData[i].studio) {
          updateData(newData[i]);
        }
      }
    });

  })

  // Update data
  function updateData(row){

    $.ajax({
      method: "PUT",
      url: "/api/students",
      data: row
    })
      .then(function() {
        location.reload();
      });
  }

  // Create Date Editor (taken from tabulator docs)
  var dateEditor = function(cell, onRendered, success, cancel){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = moment(cell.getValue(), "YYYY-MM-DD").format("YYYY-MM-DD"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        if(input.value != cellValue){
            success(moment(input.value, "YYYY-MM-DD").format("YYYY-MM-DD"));
        }else{
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
