//NEW Versions Tool
//Author: Kale Man Porkins
(function(a, b, c, d) {
    a = '//momentjs.com/downloads/moment.js';
    b = document;
    c = 'script';
    d = b.createElement(c);
    d.src = a;
    d.type = 'text/java' + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
})();
(function(a, b, c, d) {
    a = '//code.jquery.com/jquery-3.2.1.slim.min.js';
    b = document;
    c = 'script';
    d = b.createElement(c);
    d.src = a;
    d.type = 'text/java' + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
})();
(function(a, b, c, d) {
    a = "https://tags.tiqcdn.com/utag/services-coleman-perkins/main/prod/utag.105.js?cb="+Math.floor(Math.random()*10000);
    b = document;
    c = 'script';
    d = b.createElement(c);
    d.src = a;
    d.type = 'text/java' + c;
    d.async = true;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a);
})();

function addClass(elem, cls) {
    elem.className += " " + cls;
};

function addCss(rule, load) {
    if (!load) {
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
//prod,qa,dev,custom,custom,custom
var colors= {"prod":"#349AEA","qa":"#FFC300","dev":"#D6573A","custom":"#B66DFA","custom":"#8E25F1"};
let new_envObj = JSON.parse(JSON.stringify(window.opener.utui.targets.getAliasList()));
for (var i in new_envObj){
    for (var x in colors){
        if(x===i){
            new_envObj[i]["color"] = colors[x];
            delete colors[x];
        }
        else if((x!=="dev"&&x!=="qa"&&x!=="prod")&&(i!=="dev"&&i!=="qa"&&i!=="prod")){
            new_envObj[i]["color"] = colors[x];
            delete colors[x]
        }
    }
}
var tool_name = 'Versions Tool';
var page_HTML =`
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
      <div id="lnb">
         <div id="lnb-calendars" class="lnb-calendars">
               <div class="lnb-calendars-item">
                  <label>
                  <input class="tui-full-calendar-checkbox-square" type="checkbox" value="all" checked="">
                  <span></span>
                  <strong>View all</strong>
                  </label>
               </div>
            <div id="calendarList" class="lnb-calendars-d1">
            </div>
         </div>
      </div>
      <div id="right">
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
#menu {
    padding: 16px;
}
.tui-full-calendar-month-more-list {
    background-color: hsl(208, 100%, 97%);
}
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
#calendar {
    font-family: 'Noto Sans';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    top: 44px;
}
#menu {
 padding-top: 16px;
 padding-bottom: 16px;
}
.lnb-calendars-item{
padding-top: 6px;
 padding-bottom: 6px;
}
#lnb {
    font-family: 'Noto Sans';
    position: absolute;
    width: auto;
    top: 67px;
    bottom: 0;
    border-right: 1px solid hsl(0, 0%, 84%);
    padding: 12px 10px;
    background: hsl(0, 0%, 98%);
}
.lnb-calendars > div {
    padding-bottom: 12px;
    padding-top: 12px;
    border-bottom: 1px solid hsl(0, 0%, 90%);
    font-weight: normal;
    font-size: 13px;
}
#right {
    font-family: 'Noto Sans';
    position: absolute;
    left: 165px;
    top: 50px;
    right: 0;
    bottom: 0;
}
.move-today{
    vertical-align: bottom;
    height: 20px;
}
#renderRange{
    padding-left: 15px;
    vertical-align: bottom;
}
input[type='checkbox'].tui-full-calendar-checkbox-round + span {
    width: 10px !important;
    height: 10px !important;
        margin-left: 8px;
}
.fake-button{
    background-color: hsl(0, 0%, 98%);
    border: 1px outset hsl(0, 0%, 85%);
    line-height: 16px;
    padding-right: 6px;
    width: auto;
    border-radius: 5px;
    margin-right: 12px;
    cursor: pointer;
}
`
function refreshScheduleVisibility() {
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render(true);

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }
function currentCalendarDate(format) {
    var currentDate = moment([cal.getDate().getFullYear(), cal.getDate().getMonth(), cal.getDate().getDate()]);
    return currentDate.format(format);
}

function getDataAction(target) {
    return target.dataset ? target.dataset.action : target.getAttribute('data-action');
}

function getCalendarNumber(env) {
    var env_string = "";
    for(i in env) env_string += env[i].toString();
    switch(env_string) {
        case "0000":
            return 0;
        case "0001":
            return 1;
        case "0010":
            return 2;
        case "0100":
            return 3;
        case "1000":
            return 4;
        case "1001":
            return 5;
        case "1010":
            return 6;
        case "1100":
            return 7;
        case "0101":
            return 8;
        case "0110":
            return 9;
        case "0011":
            return 10;
        case "1110":
            return 11;
        case "1101":
            return 12;
        case "1011":
            return 13;
        case "0111":
            return 14;
        case "1111":
            return 15;
    }
}
function getCalendarList(env) {
    var calList = [];
    if(env[0] == 1) {
        calList = calList.concat([4,5,6,7,11,12,13,15]);
    }
    if(env[1] == 1) {
        calList = calList.concat([3,7,8,9,11,12,14,15]);
    }
    if(env[2] == 1) {
        calList = calList.concat([2,6,9,10,11,13,14,15]);
    }
    if(env[3] == 1) {
        calList = calList.concat([1,5,8,10,11,12,13,15]);
    }
    return calList;
}

function getEnvList(status, names) {
    env = [0,0,0,0];
    for(i in names) {
        if(status && status.indexOf(names[i]) != -1) env[i] = 1;
    }
    return env;
}

function setRenderRangeText() {
    var renderRange = document.getElementById('renderRange');
    var options = cal.getOptions();
    var viewName = cal.getViewName();

    var html = [];
    if (viewName === 'day') {
        html.push(currentCalendarDate('YYYY.MM.DD'));
    } else if (viewName === 'month' &&
        (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
        html.push(currentCalendarDate('YYYY.MM'));
    } else {
        html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
        html.push(' ~ ');
        html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
    }
    renderRange.innerHTML = html.join('');
}

function onClickNavi(e) {
    var action = getDataAction(e.target);

    switch (action) {
        case 'move-prev':
            cal.prev();
            break;
        case 'move-next':
            cal.next();
            break;
        case 'move-today':
            cal.today();
            break;
        default:
            return;
    }

    setRenderRangeText();
    //setSchedules();
}
    function onChangeCalendars(e) {
        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;

        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function(input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            CalendarList.forEach(function(calendar) {
                calendar.checked = checked;
            });
        } else {
            findCalendar(calendarId).checked = checked;

            allCheckedCalendars = calendarElements.every(function(input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        refreshScheduleVisibility();
    }
    function onClickDiff(e) {
        debugger;
    }
function setEventListener() {
        $('#menu-navi').on('click', onClickNavi);
        $('.tui-full-calendar-popup-edit').on('click', onClickDiff);
        $('#lnb-calendars').on('change', onChangeCalendars);
        //$('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
}


var calendar_scripts = ['https://uicdn.toast.com/tui.code-snippet/latest/tui-code-snippet.js',
    'https://uicdn.toast.com/tui.dom/v3.0.0/tui-dom.js',
    'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js',
    'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js',
    'https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js',
    'https://nhn.github.io/tui.calendar/latest/dist/tui-calendar.js'
];
var calendar_styles = ['https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css',
    'https://nhn.github.io/tui.calendar/latest/examples/css/icons.css',
    'https://nhn.github.io/tui.calendar/latest/dist/tui-calendar.css',
    'https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css',
    'https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css',
    "https://fonts.googleapis.com/css?family=Noto+Sans"
]

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
    if (tab_name === "Calendar-tab") {

        setEventListener();

        setTimeout(function() {
            var c_history = window.opener.utui.data.publish_history;
            var today = new Date();
            var date = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + today.getDate() + ("0" + today.getMinutes()).slice(-2) + ("0" + today.getSeconds()).slice(-2);
            var status;
            for (var save in c_history) {
                if (+save >= (+date - 1000000)) {
                    if(typeof c_history[save][save].status != "undefined") {
                        status = c_history[save][save].status;
                    } else {
                        status = "saves";
                    }
                    var env_list = getEnvList(status, env_names);
                    var calendar_list = getCalendarList(env_list);
                    for(i in calendar_list) {
                        cal.createSchedules([{
                            id: save,
                            isReadOnly: false,
                            calendarId: calendar_list[i],
                            title: "Version " + save,
                            body: status,
                            dueDateClass: '',
                            category: "time",
                            start: moment(save, "YYYYMMDDhhmm").format(),
                            //end: moment(save + 1500, "YYYYMMDDhhmm").format()
                        }]) 
                    }

                }
            }
        setRenderRangeText()
        }, 150);
    }
}

if (document.title != tool_name) {
    document.write(page_HTML);
    addCss(style_sheet);
    document.title = tool_name;
    window.status = tool_name;

    function createButton(env,color){
        var calendar_List = document.querySelector("#calendarList"); 
        var env_button = document.createElement("div");
        env_button.innerHTML = `<div class="fake-button"><div class="lnb-calendars-item"><label><input type="checkbox" class="tui-full-calendar-checkbox-round" value="1" checked=""><span style="border-color: ${color}; background-color: ${color};"></span><span>${env}</span></label></div></div>`
        calendar_List.appendChild(env_button);
    }
    for (var i in new_envObj){
        let env = new_envObj[i];
        if (env.alias_name.length > 0){
            createButton(env.alias_name,env.color);
        }
        else{
            createButton(env.display_name,env.color);
        }
    }

    for (i in calendar_scripts) {
        var body = document.getElementsByTagName("body")[0];
        var c_script = document.createElement("script");
        c_script.src = calendar_scripts[i];
        body.insertBefore(c_script, body.firstElementChild);
    }
    for (i in calendar_styles) {
        addCss(calendar_styles[i], true);
    }
    var cal;
    setTimeout(function() {
    	cal = new tui.Calendar('#calendar', {
        	defaultView: 'month',
        	theme: custom_theme,
        	useDetailPopup:true,
        	disableClick:true,
        	isReadOnly:false,
        	usageStatistics: false
    	});
        cal.on({
            'clickSchedule': function(e) {
                console.log('clickSchedule', e);
            },
            'beforeUpdateSchedule': function(e) {
                console.log('beforeUpdateSchedule', e);
            }
        })
    },1000);
}
var env_names = ['dev', 'qa', 'prod', 'custom'];
var env_calendars;

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
getAggregateChanges(prev, post)

for (test in historyBlob) {
    for (test2 in historyBlob[test])
        appendData(test2);
}
console.log(c_history);