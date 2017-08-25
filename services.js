// highest value in key
function findMax(key) {
  var values = collection.map(function(obj) {
    // if string, return it's length
    if (isNaN(obj[key])) return obj[key].length;
    else return obj[key];
  });
  // check for max and return {} from collection
  var max = Math.max.apply(Math, values);
  return collection[values.indexOf(max)];
}

// record from id
function findRecord(id) {
  return collection.filter(function(obj) {
    return obj.id == id;
  })[0];
}

// all records with term in key
function searchRecords(key, term) {
  return collection.map(function(obj) {
    // convert to lowercase for better search results
    if (typeof obj[key] === 'string') var objModified = obj[key].toLowerCase();
    else var objModified = obj[key].toString();
    if (typeof term === 'string') term = term.toLowerCase();
    else term = term.toString();
    // check if string contains term
    if (objModified.indexOf(term) > -1) return obj;
  }).filter(function(obj) {
    // remove undefined results
    return obj != undefined
  });
}

// query api for new data
function getRecord(id) {
  // config url for api call
  var url = 'https://jsonplaceholder.typicode.com/posts/';
  if (id > 0) var url = url += id;
  // return promise for request
  return new Promise(function(resolve, reject) {
    // xhr request
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) resolve(req.response);
    };
    req.send();
  });
}
