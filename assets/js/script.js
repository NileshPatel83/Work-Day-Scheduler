// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.




//DOM elements.
let currentDateEl = $('#currentDay');
let timeBlockContainerEl = $('#time-block-container');

//Class names for DOM elements.
let timeBlockElClasses = ['row', 'time-block'];
const timeElClasses = ['col-2', 'col-md-1', 'hour', 'text-center', 'py-3'];
const textAreaElClasses = ['col-8', 'col-md-10', 'description'];
const saveBtnElClasses = ['btn', 'saveBtn', 'col-2', 'col-md-1'];
const saveImageElClasses = ['fas', 'fa-save'];
const pastClass = 'past';
const presentClass = 'present';
const futureClass = 'future';

//Constants
const visibleRows = 3;
const standardWorkHours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];

$(function () {

  //Displays current date in specific format.
  displayCurrentDate();

  //Adds time block for standard working hours.
  addTimeBlocks();


});

//Adds time block for standard working hours.
function addTimeBlocks(){

  standardWorkHours.forEach(stdHour =>{

    //Converts standard working hour to 24 hour format.
    let hour = getHour(stdHour);

    //Gets all classes including past, present or future for time element.
    let className = getClassName(hour);

    

    

    // let blockDivEl = $('<div>');

    // let timeEl = $('<div>');
    // timeEl.text(stdHour);
    // timeEl.addClass(className);

   
  });
}

function getClassName(hour){

  let className = presentClass;

  let currentHour = dayjs().format(H);

    if(hour < currentHour){
      className = pastClass;
    } else if (hour > currentHour){
      className = futureClass;
    }

    timeBlockElClasses.push(className);

    return timeBlockElClasses.join(' ');
}

//Converts standard working hour to 24 hour format.
function getHour(stdHour){

  let array = stdHour.split(' ');
  let hour = parseInt(array[0], 10);
  let format = array[1];

  if(format === 'PM' && hour !== 12)
  hour += 12;

  return hour;
}

//Displays current date in specific format.
function displayCurrentDate(){
  let currentDay = dayjs().format('dddd, MMMM DD, YYYY');
  currentDateEl.text(currentDay);
}