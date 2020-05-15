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
		  <button class="tablinks" onclick="openTab(event, 'Calendar-tab')">Calendar</button>
		  <button class="tablinks" onclick="openTab(event, 'Variables')">Variables</button>
		  <button class="tablinks" onclick="openTab(event, 'Extensions')">Extensions</button>
		  <button class="tablinks" onclick="openTab(event, 'Coleman')">Coleman</button>

		</div>

		<!-- Tab content -->
		<div id="Main" class="tabcontent">
		  <h3>Control Panel</h3>
		  <p>Lets set stuff up.</p>
		  <div id='history'></div>
		</div>

		<div id="Calendar-tab" class="tabcontent">
		  <div id="menu">
            <span id="menu-navi">
              <button type="button" class="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
              <button type="button" class="btn btn-default btn-sm move-day" data-action="move-prev">
                <i class="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm move-day" data-action="move-next">
                <i class="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
              </button>
            </span>
            <span id="renderRange" class="render-range"></span>
          </div>

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

        <div id="Coleman" class="tabcontent">
		  <h3>Coleman</h3>
		  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" class="app-icon app-icon--medium" data-identifyElement="248">
		    <g fill="#FF5959" fill-rule="evenodd" data-identifyElement="249">
		      <path fill-opacity=".3" stroke="#FF5959" stroke-width="4.56" d="M56 29.693c0-14.691-11.864-26.6-26.5-26.6S3 15.002 3 29.693c0 14.692 11.864 26.6 26.5 26.6S56 44.385 56 29.693" data-identifyElement="250"></path>
		      <path fill-rule="nonzero" d="M16.327 41.214c6.283-8.392 20.063-8.392 26.346 0a2.286 2.286 0 01-.451 3.192 2.266 2.266 0 01-3.18-.453c-4.466-5.964-14.618-5.964-19.083 0a2.266 2.266 0 01-3.18.453 2.286 2.286 0 01-.452-3.192z" data-identifyElement="251"></path>
		      <path d="M43.696 23.9c0-2.624-2.117-4.75-4.732-4.75-2.612 0-4.732 2.126-4.732 4.75 0 2.622 2.12 4.75 4.732 4.75 2.615 0 4.732-2.128 4.732-4.75m-18.928 0c0-2.624-2.118-4.75-4.732-4.75-2.612 0-4.732 2.126-4.732 4.75 0 2.622 2.12 4.75 4.732 4.75 2.614 0 4.732-2.128 4.732-4.75" data-identifyElement="252"></path>
		    </g>
		  </svg>
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
var calendar_scripts = ['https://cdn.jsdelivr.net/gh/Sestrin/teal-clientside-versioning@latest/cal/tui-calendar.min.js'];
var calendar_styles = ['https://cdn.jsdelivr.net/gh/Sestrin/teal-clientside-versioning@latest/cal/tui-calendar.min.css'];
var custom_theme = {

	// common attributes
	'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#333',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

    // month header 'dayname'

    'month.dayname.height': '42px',
    'month.dayname.borderLeft': 'none',
    'month.dayname.paddingLeft': '8px',
    'month.dayname.paddingRight': '0',
    'month.dayname.fontSize': '13px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': '#bbb',
    'month.dayExceptThisMonth.color': '#bbb',
    'month.weekend.backgroundColor': '#fafafa',
    'month.day.fontSize': '16px',

    // month schedule style
    'month.schedule.borderRadius': '5px',
    'month.schedule.height': '18px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '10px',
    'month.schedule.marginRight': '10px',

    // month more view
    'month.moreView.boxShadow': 'none',
    'month.moreView.paddingBottom': '0',
    'month.moreView.border': '1px solid #9a935a',
    'month.moreView.backgroundColor': '#f9f3c6',
    'month.moreViewTitle.height': '28px',
    'month.moreViewTitle.marginBottom': '0',
    'month.moreViewTitle.backgroundColor': '#f4f4f4',
    'month.moreViewTitle.borderBottom': '1px solid #ddd',
    'month.moreViewTitle.padding': '0 10px',
    'month.moreViewList.padding': '10px'
  };

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
        	defaultView: 'month',
        	theme: custom_theme
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

