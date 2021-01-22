let newDate = new Date();
let dayOfWeek = newDate.getDay();
let today;
function formatDate() {
  month = newDate.getMonth() + 1;
  date = newDate.getDate();
  year = newDate.getFullYear();
  today = `${month}/${date}/${year}`;
}
function formatDayOfWeek() {
  switch (dayOfWeek) {
    case 0:
      dayOfWeek = "Sunday";
      break;
    case 1:
      dayOfWeek = "Monday";
      break;
    case 2:
      dayOfWeek = "Tuesday";
      break;
    case 3:
      dayOfWeek = "Wednesday";
      break;
    case 4:
      dayOfWeek = "Thursday";
      break;
    case 5:
      dayOfWeek = "Friday";
      break;
    case 6:
      dayOfWeek = "Saturday";
      break;
    default:
      console.log("error");
  }
}
formatDayOfWeek();
formatDate();

console.log(today);
console.log(dayOfWeek);
