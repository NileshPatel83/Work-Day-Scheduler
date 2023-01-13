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

//Visit rows in text area.
const visibleRows = 3;

//Attribute used to get index of time block.
const dataIndex = 'data-index';

//Standard working hours time array.
const standardWorkHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];

$(function () {

  //Displays current date in specific format.
  displayCurrentDate();

  //Adds time block for standard working hours.
  addTimeBlocks();

  //TODO
  //Display activities from local storage.



});

// //Event handler for time block container and then get button target.
// timeBlockContainerEl.on('click', '.saveBtn', processDayScheduler);

// function processDayScheduler(event){
//     event.preventDefault();

//     let schIndex = parseInt($(this).attr(dataIndex));

//     let time = timeBlockContainerEl.children().eq(schIndex).children('div').text();
    
//     let schedule = timeBlockContainerEl.children().eq(schIndex).children('textarea').val();
    
// }


//Adds time block for standard working hours.
function addTimeBlocks(){

  //Loops through each standard working hour.
  for (let i = 0; i < standardWorkHours.length; i++){

    let stdHour = standardWorkHours[i];

    //Converts standard working hour to 24 hour format.
    let hour = getHour(stdHour);

    //Gets all classes including past, present or future for time element.
    let className = getClassName(hour);

    //Creates a div element, sets the id and time block classes.
    //This element represent the row for each time block.
    let blockDivEl = $('<div>');
    // blockDivEl.attr('id', stdHour);
    blockDivEl.addClass(className);

    //Creates a div element, sets the value standard time and classes.
    //This element represents the first column which shows the time.
    let timeEl = $('<div>');
    timeEl.text(stdHour);
    timeEl.addClass(timeElClasses.join(' '));
    
    //Creates text area element and sets classes and attribute (row height to 3).
    //This element presents the text area for user to type the acticity.
    let textAreaEl = $('<textarea>');
    textAreaEl.addClass(textAreaElClasses.join(' '));
    textAreaEl.attr('rows', visibleRows);

    //Creates a button element and sets classes and attributes.
    //Data-index attribure will be used when user click save button indenitfy which row of time block is clicked.
    //Using this index, parent row block element can be obtained from main contaier which then can be used to get time and activitt text to be saved to local storage.
    //This element represents as save button.
    let saveBtnEl = $('<button>');
    saveBtnEl.addClass(saveBtnElClasses.join(' '));
    saveBtnEl.attr('aria-label', 'save');
    saveBtnEl.attr(dataIndex, i);

    //Creates an iamge element for save button element and sets classes and attributes.
    //Adds the image element to save button element.
    let saveImageEl = $('<i>');
    saveImageEl.addClass(saveImageElClasses.join(' '));
    saveImageEl.attr('aria-hidden', 'true');
    saveBtnEl.append(saveImageEl);

    //Append all columns (time, text area and save button) to time block row element.
    blockDivEl.append(timeEl, textAreaEl, saveBtnEl);

    //Adds the time block row element to main time display container element.
    timeBlockContainerEl.append(blockDivEl);
  }
}

//Gets all classes including past, present or future for time element.
function getClassName(hour){

  //Sets the default value to present class.
  let className = presentClass;

  //Gets current time in 24 hour format.
  let currentHour = dayjs().format('H');

  //If time block is less thant current time then sets the class as past.
  if(hour < currentHour){
    className = pastClass;

  //If time block is more than current time, sets the class to future.
  } else if (hour > currentHour){
    className = futureClass;
  }

  //Adds this class to time block class array.
  timeBlockElClasses.push(className);

  //Returns the class as string separated by space.
  return timeBlockElClasses.join(' ');
}

//Converts standard working hour to 24 hour format.
function getHour(stdHour){

  //Gets time value from standard working hour (e.g. Gets 9 from 9AM and 11 from 11AM).
  let timeValue = stdHour.substr(0, stdHour.length - 2);

  //Gets the time format e.g. AM/ PM.
  let timeFormat = stdHour.substr(stdHour.length - 2);

  //Converts time to number.
  let hour = parseInt(timeValue, 10);

  //If the time number is either 12 or time format is PM, then adds 12 to get 24 hour time number.
  //e.g. 9am = 9, 12pm = 12, 2pm = 14.
  if(timeFormat === 'PM' && hour !== 12) hour += 12;

  return hour;
}

//Displays current date in specific format.
function displayCurrentDate(){
  let currentDay = dayjs().format('dddd, MMMM DD, YYYY');
  currentDateEl.text(currentDay);
}