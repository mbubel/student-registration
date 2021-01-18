$(document).ready(() => {
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
        .text(),
    };
    $.ajax("/api/students", {
      type: "POST",
      data: postData,
    }).then(() => {
      alert("we figgured it out");
    });
  });
});
