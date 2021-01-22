$(document).ready(() => {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  //Add random artwork image
  function addImage() {
    // eslint-disable-next-line prefer-const
    let imageDiv = $("#added-artwork");

    // eslint-disable-next-line prefer-const
    let randomNumber = Math.floor(Math.random() * 12) + 1;

    imageDiv.css(
      "background-image",
      `url(./assets/images/art${randomNumber}.jpg)`
    );
  }

  addImage();
});
