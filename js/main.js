let database = [];

let newsfeed = [
    {
        username:"tobias",
        newsfeed:"bla bla bla"
    },
    {
        username:"bob",
        newsfeed:"tee teee teeee"
    },
    {
        username:"admin",
        newsfeed:"I am the admin"
    }
];

function isUserValid(username, password){
    let db = JSON.parse(localStorage.getItem('database'));
    console.log(db);
    if(db !== null){
        for (let i=0; i < db.length; i++) {
            if(db[i].username === username && db[i].password === password) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }

}

// for (var i=0; i < newsfeed.length; i++) {
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

function signIn(username, password){
    if(isUserValid(username, password)){
        for (let i=0; i < newsfeed.length; i++) {
            if (newsfeed[i].username !== username) {
                let paragraph = document.getElementById("newsfeed");

                let entry = document.createElement('p');

                entry.innerHTML = newsfeed[i].username + ': ' + newsfeed[i].newsfeed;
                paragraph.appendChild(entry);
            }
        }
        return false;
    } else {
        alert("Wrong username or password!!!");
    }

}

function isUserExist(username, password, mail){
    for (let i=0; i < database.length; i++) {
        if(database[i].username === username || database[i].mail === mail) {
            return true;
        }
    }
    return false;
}

function RegIn(username, password, mail){
    if(isUserExist(username, password, mail)){
        console.log("exesetiert");
    } else {

        //wird in database geschrieben
        let user = {};
        user.username = username;
        user.mail = mail;
        user.password = password;

        database.push(user);

        localStorage.setItem('database', JSON.stringify(database));

        let usernamePromt = prompt("What is your username?");
        let passwordPromt = prompt("What is your password?");

        signIn(usernamePromt, passwordPromt);
    }

}

/*-- Player Game --*/
const player = document.getElementsByClassName("player")[0];
const button_top = document.querySelector("#move_top");
const button_bottom = document.querySelector("#move_bottom");
const button_left = document.querySelector("#move_left");
const button_right = document.querySelector("#move_right");

console.log(player);

button_top.addEventListener("click", () => {
    let valueX = getTranslateXValue(player.style.transform);
    let valueY = getTranslateYValue(player.style.transform);

    let total = valueY - 50;

    player.style.transform = "translate(" + valueX +"px, "+ total +"px)";

    console.log(total);
    console.log(player.style.transform);
});

button_bottom.addEventListener("click", () => {
    let valueX = getTranslateXValue(player.style.transform);
    let valueY = getTranslateYValue(player.style.transform);

    let total = valueY + 50;
    player.style.transform = "translate(" + valueX +"px, "+ total +"px)";

    console.log(total);
    console.log(player.style.transform);
});

button_left.addEventListener("click", () => {
    let valueX = getTranslateXValue(player.style.transform);
    let valueY = getTranslateYValue(player.style.transform);

    let total = valueX - 50;
    player.style.transform = "translate(" + total +"px, "+ valueY +"px)";

    console.log(total);
    console.log(player.style.transform);
});

button_right.addEventListener("click", () => {
    let valueX = getTranslateXValue(player.style.transform);
    let valueY = getTranslateYValue(player.style.transform);

    let total = valueX + 50;
    player.style.transform = "translate(" + total +"px, "+ valueY +"px)";

    console.log(total);
    console.log(player.style.transform);
});


function getTranslateXValue(translateString){

    let n = translateString.indexOf("(");
    let n1 = translateString.indexOf(",");

    let res = parseInt(translateString.slice(n+1,n1-2));

    return res;
}
function getTranslateYValue(translateString){

    let n = translateString.indexOf(",");
    let n1 = translateString.indexOf(")");

    let res = parseInt(translateString.slice(n+1,n1-1));

    return res;
}

/*-- Draggeble Div--*/

dragElement(document.getElementById("player"));

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt) {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        console.log(e.clientX);
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
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

let myVar = false;

function myFunc(myElement) {
	let ele = myElement;

	myVar = !myVar;
	if (myVar) {
		document.addEventListener('mousemove', myHandler, false);
	} else {
		document.removeEventListener('mousemove', myHandler, false);
	}
}

function myHandler(e) {
	let p1 = e.clientX;
	let p2 = e.clientY;

	let node = document.createElement("div");

	let miniNode1 = document.createElement("div");
	let miniNode2 = document.createElement("div");

	function randomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	let randomSize = Math.floor(Math.random() * Math.floor(20));

	function add(node) {
		if (node === miniNode1 || node === miniNode2) {
			node.style.height = randomSize + "px";
			node.style.width = randomSize + "px";
			node.style.top = p2 - p2 + 50 + "px";
			node.style.left = p1 - p1 + 50 + "px";
			node.style.position = "absolute";
			node.style.borderRadius = "0px";
			node.style.backgroundColor = randomColor().toString();
			//node.style.backgroundImage = `url('${setImg()}')`;

			setTimeout(function(){
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

			setTimeout(function(){
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

	setTimeout(() => document.querySelector("body").removeChild(node) , 500);
}

document.onkeypress = (key) => {
    if (key.charCode === 13) {
        let popDiv = document.getElementsByClassName('popDiv');
        let arrayPopDiv = Array.from(popDiv);

        for (let i = 0; i < arrayPopDiv.length; i++) {
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

let cube = document.querySelector('.cube');
let radioGroup = document.querySelector('.radio-group');
let currentClass = '';

function changeSide() {
	let checkedRadio = radioGroup.querySelector(':checked');
	let showClass = 'show-' + checkedRadio.value;
	if ( currentClass ) {
		cube.classList.remove( currentClass );
	}
	cube.classList.add( showClass );
	currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener( 'change', changeSide );

/**
 *
 * Color Picker bg change
 *
 * **/

function bgColorPick() {
    let wert = document.getElementById("color-picker").value;
    let body = document.body;

    body.style.backgroundColor = wert;
}

/**
 *
 * Get img from api and put them in the side
 *
 * **/
console.log("help");
let count = 0;

function setImg() {

	if (count <= 0) {
		let globalDiv = document.querySelector(".imgReload");
		let container = document.createElement("div");
		container.style.display = "flex";
		container.style.flexWrap = "wrap";

		let button = document.createElement("button");
		button.classList.add("btn");
		button.classList.add("btn-primary");
		button.innerHTML = "Mehr laden";
		button.addEventListener('click', setImg);
		fetch('https://jsonplaceholder.typicode.com/photos')
			.then(function(response) {
				if (response.ok)
					return response.json();
				else
					throw new Error(`IMG's konnte nicht geaden werden`);
			})
			.then(imgs =>  {


				imgs.filter(id => id.id <= 8).map(x => {
					count++;
					let img = x.thumbnailUrl.replace(/\/150/g, "/50");

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

					console.log(img);
				});

			})
			.catch(function(err) {
				console.log("Error")
			});
	} else{
		fetch('https://jsonplaceholder.typicode.com/photos')
			.then(function(response) {
				if (response.ok)
					return response.json();
				else
					throw new Error(`IMG's konnte nicht geaden werden`);
			})
			.then(imgs =>  {
				let totalCount = count + 8;

				imgs.filter(id => id.id + count <= totalCount).map(x => {
					count++
					let img = x[x + count].thumbnailUrl.replace(/\/150/g, "/50");
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

			})
			.catch(function(err) {
				console.log("Error")
			});
		console.log(count);
	}
}

setImg();






