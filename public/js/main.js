"use strict";

var database = [];
var newsfeed = [{
  username: "tobias",
  newsfeed: "bla bla bla"
}, {
  username: "bob",
  newsfeed: "tee teee teeee"
}, {
  username: "admin",
  newsfeed: "I am the admin"
}];

function isUserValid(username, password) {
  var db = JSON.parse(localStorage.getItem('database'));
  console.log(db);

  if (db !== null) {
    for (var i = 0; i < db.length; i++) {
      if (db[i].username === username && db[i].password === password) {
        return true;
      }
    }

    return false;
  } else {
    return false;
  }
} // for (var i=0; i < newsfeed.length; i++) {
// 	if (newsfeed[i].username === username) {
// 		console.log(newsfeed[i].newsfeed);
// 	} else {
// 		var newsfeedPromt = prompt("New Newsfeed:");
// 		var newsfeedInput = {};
// 		newsfeedInput.username = username;
// 		newsfeedInput.newsfeed = newsfeedPromt;
//
// 		newsfeed.push(newsfeedInput);
//
// 		for (var i=0; i < newsfeed.length; i++) {
// 			if (newsfeed[i].username === username) {
// 				console.log(newsfeed[i].newsfeed);
// 				return false;
// 			}
// 		}
// 	}
// }


function signIn(username, password) {
  if (isUserValid(username, password)) {
    for (var i = 0; i < newsfeed.length; i++) {
      if (newsfeed[i].username !== username) {
        var paragraph = document.getElementById("newsfeed");
        var entry = document.createElement('p');
        entry.innerHTML = newsfeed[i].username + ': ' + newsfeed[i].newsfeed;
        paragraph.appendChild(entry);
      }
    }

    return false;
  } else {
    alert("Wrong username or password!!!");
  }
}

function isUserExist(username, password, mail) {
  for (var i = 0; i < database.length; i++) {
    if (database[i].username === username || database[i].mail === mail) {
      return true;
    }
  }

  return false;
}

function RegIn(username, password, mail) {
  if (isUserExist(username, password, mail)) {
    console.log("exesetiert");
  } else {
    //wird in database geschrieben
    var user = {};
    user.username = username;
    user.mail = mail;
    user.password = password;
    database.push(user);
    localStorage.setItem('database', JSON.stringify(database));
    var usernamePromt = prompt("What is your username?");
    var passwordPromt = prompt("What is your password?");
    signIn(usernamePromt, passwordPromt);
  }
}
/*-- Player Game --*/


var player = document.getElementsByClassName("player")[0];
var button_top = document.querySelector("#move_top");
var button_bottom = document.querySelector("#move_bottom");
var button_left = document.querySelector("#move_left");
var button_right = document.querySelector("#move_right");
console.log(player);
button_top.addEventListener("click", function () {
  var valueX = getTranslateXValue(player.style.transform);
  var valueY = getTranslateYValue(player.style.transform);
  var total = valueY - 50;
  player.style.transform = "translate(" + valueX + "px, " + total + "px)";
  console.log(total);
  console.log(player.style.transform);
});
button_bottom.addEventListener("click", function () {
  var valueX = getTranslateXValue(player.style.transform);
  var valueY = getTranslateYValue(player.style.transform);
  var total = valueY + 50;
  player.style.transform = "translate(" + valueX + "px, " + total + "px)";
  console.log(total);
  console.log(player.style.transform);
});
button_left.addEventListener("click", function () {
  var valueX = getTranslateXValue(player.style.transform);
  var valueY = getTranslateYValue(player.style.transform);
  var total = valueX - 50;
  player.style.transform = "translate(" + total + "px, " + valueY + "px)";
  console.log(total);
  console.log(player.style.transform);
});
button_right.addEventListener("click", function () {
  var valueX = getTranslateXValue(player.style.transform);
  var valueY = getTranslateYValue(player.style.transform);
  var total = valueX + 50;
  player.style.transform = "translate(" + total + "px, " + valueY + "px)";
  console.log(total);
  console.log(player.style.transform);
});

function getTranslateXValue(translateString) {
  var n = translateString.indexOf("(");
  var n1 = translateString.indexOf(",");
  var res = parseInt(translateString.slice(n + 1, n1 - 2));
  return res;
}

function getTranslateYValue(translateString) {
  var n = translateString.indexOf(",");
  var n1 = translateString.indexOf(")");
  var res = parseInt(translateString.slice(n + 1, n1 - 1));
  return res;
}
/*-- Draggeble Div--*/


dragElement(document.getElementById("player"));

function dragElement(elmnt) {
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (elmnt) {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    console.log(e.clientX); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/**
 *
 * Mous Move effect
 *
 **/


var myVar = false;

function myFunc(myElement) {
  var ele = myElement;
  myVar = !myVar;

  if (myVar) {
    document.addEventListener('mousemove', myHandler, false);
  } else {
    document.removeEventListener('mousemove', myHandler, false);
  }
}

function myHandler(e) {
  var p1 = e.clientX;
  var p2 = e.clientY;
  var node = document.createElement("div");
  var miniNode1 = document.createElement("div");
  var miniNode2 = document.createElement("div");

  function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  var randomSize = Math.floor(Math.random() * Math.floor(20));

  function add(node) {
    if (node === miniNode1 || node === miniNode2) {
      node.style.height = randomSize + "px";
      node.style.width = randomSize + "px";
      node.style.top = p2 - p2 + 50 + "px";
      node.style.left = p1 - p1 + 50 + "px";
      node.style.position = "absolute";
      node.style.borderRadius = "0px";
      node.style.backgroundColor = randomColor().toString(); //node.style.backgroundImage = `url('${setImg()}')`;

      setTimeout(function () {
        node.classList.add('rotate');
        node.style.height = randomSize + "px";
        node.style.width = randomSize + "px";
      }, 50);
    } else {
      node.style.height = randomSize + "px";
      node.style.width = randomSize + "px";
      node.style.top = p2 + "px";
      node.style.left = p1 + "px";
      node.style.position = "absolute";
      node.style.borderRadius = "0px";
      node.style.backgroundColor = randomColor().toString();
      setTimeout(function () {
        node.classList.add('rotate');
        node.style.height = randomSize + "px";
        node.style.width = randomSize + "px";
      }, 50);
    }
  }

  add(node);
  add(miniNode1);
  add(miniNode2);
  node.classList.add("popDiv");
  node.appendChild(miniNode1);
  node.appendChild(miniNode2);
  document.querySelector("body").appendChild(node);
  setTimeout(function () {
    return document.querySelector("body").removeChild(node);
  }, 500);
}

document.onkeypress = function (key) {
  if (key.charCode === 13) {
    var popDiv = document.getElementsByClassName('popDiv');
    var arrayPopDiv = Array.from(popDiv);

    for (var i = 0; i < arrayPopDiv.length; i++) {
      arrayPopDiv[i].parentNode.removeChild(arrayPopDiv[i]);
    }
  } else {
    return false;
  }
};
/**
 *
 *
 * 3D-Modules
 *
 * **/


var cube = document.querySelector('.cube');
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

function changeSide() {
  var checkedRadio = radioGroup.querySelector(':checked');
  var showClass = 'show-' + checkedRadio.value;

  if (currentClass) {
    cube.classList.remove(currentClass);
  }

  cube.classList.add(showClass);
  currentClass = showClass;
} // set initial side


changeSide();
radioGroup.addEventListener('change', changeSide);
/**
 *
 * Color Picker bg change
 *
 * **/

function bgColorPick() {
  var wert = document.getElementById("color-picker").value;
  var body = document.body;
  body.style.backgroundColor = wert;
}
/**
 *
 * Get img from api and put them in the side
 *
 * **/


console.log("help");
var count = 0;

function setImg() {
  if (count <= 0) {
    var globalDiv = document.querySelector(".imgReload");
    var container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    var button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerHTML = "Mehr laden";
    button.addEventListener('click', setImg);
    fetch('https://jsonplaceholder.typicode.com/photos').then(function (response) {
      if (response.ok) return response.json();else throw new Error("IMG's konnte nicht geaden werden");
    }).then(function (imgs) {
      imgs.filter(function (id) {
        return id.id <= 8;
      }).map(function (x) {
        count++;
        var img = x.thumbnailUrl.replace(/\/150/g, "/50");
        var link = document.createElement("a");
        link.href = "".concat(img);
        var node = document.createElement("div");
        node.style.height = "50px";
        node.style.width = "50px";
        node.style.backgroundImage = "url('".concat(img, "')");
        link.appendChild(node);
        container.appendChild(link);
        globalDiv.appendChild(container);
        globalDiv.appendChild(button);
        console.log(img);
      });
    }).catch(function (err) {
      console.log("Error");
    });
  } else {
    fetch('https://jsonplaceholder.typicode.com/photos').then(function (response) {
      if (response.ok) return response.json();else throw new Error("IMG's konnte nicht geaden werden");
    }).then(function (imgs) {
      var totalCount = count + 8;
      imgs.filter(function (id) {
        return id.id + count <= totalCount;
      }).map(function (x) {
        count++;
        var img = x[x + count].thumbnailUrl.replace(/\/150/g, "/50");
        /*
        let link = document.createElement("a");
        link.href = `${img}`;
        let node = document.createElement("div");
        node.style.height = "50px";
        node.style.width = "50px";
        node.style.backgroundImage = `url('${img}')`;
        link.appendChild(node);
        container.appendChild(link);
        globalDiv.appendChild(container);
        globalDiv.appendChild(button);
        */

        console.log(img);
      });
    }).catch(function (err) {
      console.log("Error");
    });
    console.log(count);
  }
}

setImg();