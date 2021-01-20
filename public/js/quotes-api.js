//Function for adding a random quote to the page
function addQuote() {
  $.ajax({
    async: true,
    crossDomain: true,
    url: "https://type.fit/api/quotes",
    method: "GET"
  }).then(response => {
    const data = JSON.parse(response);
    const pickQuote = Math.floor(Math.random() * data.length);

    if (data[pickQuote].author === null) {
      addQuote();
    } else {
      //Add to html
      console.log(`${data[pickQuote].text} -${data[pickQuote].author}`);
      $("#login-quote").html(`"${data[pickQuote].text}"`);
      $("#login-author").html(`-${data[pickQuote].author}`);
      $("#signup-quote").html(`"${data[pickQuote].text}"`);
      $("#signup-author").html(`-${data[pickQuote].author}`);
    }
  });
}

addQuote();
