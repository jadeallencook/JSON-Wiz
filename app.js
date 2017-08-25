// cache dom elements
var btnsWrapper = document.getElementById('btns-wrapper'),
  btns = document.getElementsByClassName('btn'),
  userInput = document.getElementById('user-input'),
  resetBtn = document.getElementById('reset-btn'),
  inputWrapper = document.getElementById('input-wrapper'),
  userInput = document.getElementById('user-input'),
  helpMsg = document.getElementById('help-msg'),
  availableKeys = document.getElementById('available-keys'),
  returnedRecord = document.getElementById('returned-record'),
  nextBtn = document.getElementById('next-btn');

// app build info
var currentMethod = 'find-max';

// adds {} keys to dropdown
function displayAvailableKeys() {
  // add available keys to dropdown
  if (collection.length) var availableKeysArray = Object.keys(collection[0]);
  else var availableKeysArray = Object.keys(collection);
  availableKeys.innerHTML = '';
  for (var i = 0, max = availableKeysArray.length; i < max; i++) {
    var keyOption = document.createElement('option');
    keyOption.innerHTML = availableKeysArray[i];
    keyOption.id = availableKeysArray[i];
    availableKeys.appendChild(keyOption);
  }
}

// resets app and cleans vars
function resetAndGoHome() {
  inputWrapper.style.display = 'none';
  helpMsg.innerHTML = 'What can I help you with?';
  returnedRecord.innerHTML = '';
  userInput.value = '';
  userInput.setAttribute('type', 'text');
  btnsWrapper.style.display = 'block';
  resetBtn.addEventListener('click', false);
}

// displays record to html
function showRecord(record) {
  // cahce {} keys in []
  if (collection.length) var availableKeysArray = Object.keys(collection[0]);
  else var availableKeysArray = Object.keys(collection);
  // converts obj to html
  function displayObject(obj) {
    for (var x = 0, max = availableKeysArray.length; x < max; x++) {
      returnedRecord.innerHTML = returnedRecord.innerHTML += '"' + availableKeysArray[x] + '": ' + obj[availableKeysArray[x]] + '<br />';
    }
  }
  // if record is an [] of {}s
  if (record && record.length > 1) {
    // iterate over each {} and display it
    for (var x = 0, max = record.length; x < max; x++) {
      displayObject(record[x]);
      returnedRecord.innerHTML = returnedRecord.innerHTML += '<br />';
    }
    helpMsg.innerHTML = 'Here\'s what I could find containing your term!';
  } else if (record && record.length !== 0) {
    console.log(record.length);
    // display one record
    displayObject(record);
    helpMsg.innerHTML = 'Here\'s that record you requested!';
  } else {
    helpMsg.innerHTML = 'Oops, looks like we can\'t find any records!';
  }
  // init view
  nextBtn.style.display = 'none';
  userInput.style.display = 'none';
  availableKeys.style.display = 'none';
}

// get methods to change views

function getUserInputForMax() {
  userInput.setAttribute('placeholder', 'Enter Key');
  helpMsg.innerHTML = 'Select a key and I will find the max!';
  userInput.style.display = 'none';
  availableKeys.style.display = 'block';
  displayAvailableKeys();
}

function getUserInputForFindById() {
  userInput.setAttribute('placeholder', 'Enter ID');
  helpMsg.innerHTML = 'Enter the record ID and I\'ll see what we have!<br /><br /><b>Example:</b> 11';
  userInput.setAttribute('type', 'number');
}

function getUserInputForSearch() {
  userInput.setAttribute('placeholder', 'Enter Term');
  helpMsg.innerHTML = 'What term do you want to search?<br /><br /><b>Example:</b> smith';
  availableKeys.style.display = 'block';
  displayAvailableKeys();
}

function getUserInputForRecordGet() {
  helpMsg.innerHTML = 'Let\'s get some new data!<br />';
  userInput.setAttribute('placeholder', 'ID (Optional)');
  userInput.setAttribute('type', 'number');
}

// retrieve user response
function getUserInput(method) {
  // reset view
  nextBtn.style.display = 'block';
  userInput.style.display = 'block';
  btnsWrapper.style.display = 'none';
  availableKeys.style.display = 'none';
  // get correct info based off method selction
  if (method === 'find-max') getUserInputForMax();
  else if (method === 'find-record') getUserInputForFindById();
  else if (method === 'search-records') getUserInputForSearch();
  else if (method === 'get-records') getUserInputForRecordGet();
  currentMethod = method;
  inputWrapper.style.display = 'block';
}

// add event listeners to menu
for (var i = 0, max = btns.length; i < max; i++) {
  btns[i].addEventListener('click', function() {
    getUserInput(this.id);
  });
}

// reset btn
resetBtn.addEventListener('click', function() {
  // reset view and user input
  resetAndGoHome();
});

// bind next btn
nextBtn.addEventListener('click', function() {
  if (currentMethod === 'find-max') {
    availableKeys.style.display = 'none';
    showRecord(findMax(availableKeys.value));
  } else if (currentMethod === 'find-record') {
    showRecord(findRecord(userInput.value));
  } else if (currentMethod === 'search-records') {
    showRecord(searchRecords(availableKeys.value, userInput.value))
  } else if (currentMethod === 'get-records') {
    getRecord(userInput.value).catch(function() {
      alert('Looks like there was an error with your request, please try again!');
    }).then(function(response) {
      collection = JSON.parse(response);
      showRecord(collection);
    });
  }
});
