//NEW Versions Tool
//Author: Kale Man Porkins


function addClass(elem, cls) {
	elem.className += " " + cls;
};
function addCss(rule) {
	let css = document.createElement("style");
	css.type = "text/css";
	if (css.styleSheet) css.styleSheet.cssText = rule;
	else css.appendChild(document.createTextNode(rule));
	document.getElementsByTagName("head")[0].appendChild(css);
}

var page_HTML = 
`
<html>
	<head>
		<title>Versions Tool</title>
	</head>
	<body>
		<!-- Tab links -->
		<div class="tab">
		  <button class="tablinks" onclick="openTab(event, 'Main')">Main</button>
		  <button class="tablinks" onclick="openTab(event, 'Calendar')">Calendar</button>
		  <button class="tablinks" onclick="openTab(event, 'Variables')">Variables</button>
		  <button class="tablinks" onclick="openTab(event, 'Extensions')">Extensions</button>

		</div>

		<!-- Tab content -->
		<div id="Main" class="tabcontent">
		  <h3>Control Panel</h3>
		  <p>Lets set stuff up.</p>
		</div>

		<div id="Calendar" class="tabcontent">
		  <h3>Calendar</h3>
		  <p>Displays a calendar and shit.</p>
		</div>

		<div id="Variables" class="tabcontent">
		  <h3>Variables</h3>
		  <p>Variables hold values. Sometimes they change, lets see when.</p>
		</div>

		<div id="Extensions" class="tabcontent">
		  <h3>Extensions</h3>
		  <p>Extensions extend your usefullness.</p>
		</div>
	</body>
</html>
`
var style_sheet = 
`
.tab {
	overflow: hidden;
	border: 1px solid #ccc;
	background-color: #f1f1f1;
}
.tab button {
	background-color: inherit;
	float: left;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 14px 16px;
	transition: 0.3s;
}
.tab button:hover {
	background-color: #ddd;
}
.tab button.active {
	background-color: #ccc;
}
.tabcontent {
	display: none;
	padding: 6px 12px;
	border: 1px solid #ccc;
	border-top: none;
}
`
function openTab(evt, tab_name) {
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tab_name).style.display = "block";
	evt.currentTarget.className += " active";
}

document.write(page_HTML);
addCss(style_sheet);
document.title = 'Versions Tool';
window.status = 'Versions Tool';




var c_history = window.opener.utui.data.publish_history;
prev = 201909091545; //any version without periods
post = 202005061643; //any later version without periods
var historyBlob = {
	dev: {},
	qa: {},
	prod: {}
};
var getAggregateChanges = function(prev, post) {
	for (var env in historyBlob) {
		for (var x in c_history) {
			if (c_history[x].publishState.saved >= prev && c_history[x].publishState.saved <= post) {
				if (c_history[x].publishState[env].length > 0) {
					historyBlob[env][x] = JSON.parse(c_history[+x][+x].history);
				}
			}
		}
	}
}
var main_tab = document.getElementById("Main");
main_tab.innerHTML += "<div id='history'></div>"
function appendData(data) {
	var mainContainer = document.getElementById("history");

	var div = document.createElement("div");
	div.innerHTML = 'Version: ' + data;
	mainContainer.appendChild(div);

}
getAggregateChanges(prev,post)

for (test in historyBlob) {
	for(test2 in historyBlob[test])
 		appendData(test2);
}
console.log(c_history);