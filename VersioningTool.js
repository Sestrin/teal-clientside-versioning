//NEW Versions Tool
//Author: Kale Man Porkins


function addClass(elem, cls) {
	elem.className += " " + cls;
};
function addCss(rule, load) {
	if(!load) {
		let css = document.createElement("style");
		css.type = "text/css";
		if (css.styleSheet) css.styleSheet.cssText = rule;
		else css.appendChild(document.createTextNode(rule));
		document.getElementsByTagName("head")[0].appendChild(css);
	} else {
	    var cssNode = document.createElement("link");
	    cssNode.setAttribute("rel", "stylesheet");
	    cssNode.setAttribute("type", "text/css");
	    cssNode.setAttribute("href", rule);
	    document.getElementsByTagName("head")[0].appendChild(cssNode);
	}
}

var tool_name = 'Versions Tool';
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
		  <div id='history'></div>
		</div>

		<div id="Calendar" class="tabcontent">
		  <!-- DONT HARDCODE THIS -->
		  <div id="calendar"></div>
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
// Im not sure which ones are necessary yet
var calendar_scripts = ['https://uicdn.toast.com/tui.code-snippet/latest/tui-code-snippet.js',
                        'https://uicdn.toast.com/tui.dom/v3.0.0/tui-dom.js',
                        'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js',
                        'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js',
                        'https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js'];
var calendar_styles = ['https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css',
                       'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css',
                       'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css'];
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
if(document.title != tool_name) {
	document.write(page_HTML);
	addCss(style_sheet);
	document.title = tool_name;
	window.status = tool_name;
	
	for(i in calendar_scripts) {
		var body = document.getElementsByTagName("body")[0];
		var c_script = document.createElement("script");
		c_script.src = calendar_scripts[i];
		body.insertBefore(c_script, body.firstElementChild);
	}
	for(i in calendar_styles) {
        addCss(calendar_styles[i], true);
    }
    var cal;
    setTimeout(function() {
    	cal = new tui.Calendar('#calendar', {
        	defaultView: 'month'
    	});
    },1000);
}




var c_history = window.opener.utui.data.publish_history;
prev = 202003031545; //any version without periods
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

function appendData(data) {
	var hist_div = document.getElementById("history");
	var div = document.createElement("div");
	div.innerHTML = 'Version: ' + data;
	hist_div.appendChild(div);

}
getAggregateChanges(prev,post)

for (test in historyBlob) {
	for(test2 in historyBlob[test])
 		appendData(test2);
}
console.log(c_history);