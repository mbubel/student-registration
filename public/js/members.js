$(document).ready(() => {

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  //Add random artwork image
  function addImage() {
    let imageDiv = $("#added-artwork");

    let randomNumber = Math.floor(Math.random() * (12))+1;

    imageDiv.css("background-image", `url(./assets/images/art${randomNumber}.jpg)`);
  }

  addImage();

});
