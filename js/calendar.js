function createMonths (inputDate, daysNum) {

	// Length of months, february may change
	var months = [
		{ name: "January", length: 31 },
		{ name: "February", length: 28 },
		{ name: "March", length: 31 },
		{ name: "April", length: 30 },
		{ name: "May", length: 31 },
		{ name: "June", length: 30 },
		{ name: "July", length: 31 },
		{ name: "August", length: 31 },
		{ name: "September", length: 30 },
		{ name: "October", length: 31 },
		{ name: "November", length: 30 },
		{ name: "December", length: 31 }
	]; 

	// Result calendar
	var resultMonths = "";
	
	// Valid days found counter (weekdays and weekends)
	var validDays = 0;

	// Date to print
	var daysCounter = inputDate.getDate();
	
	// Valid days found in current month, used to update input date for next month
	var validDaysInMonth = 0;

	// Until there are not more days to print
	while (validDays < daysNum) {

		var monthIndex = inputDate.getMonth();
		monthIndex = monthIndex > 11 ? 0 : monthIndex; // To fix 0-11

		// Build month header
		resultMonths += "<tr>"+
							"<td colspan='7' class='month-name'>"+ months[ monthIndex ].name+" "+inputDate.getFullYear()+"</td>"+
						"</tr>";

		// Get first day of current month
	    var firstDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
	    var startingDay = firstDay.getDay();				

	    // February duration arrangement if leapfrogged
	    if (monthIndex == 1) { // 0: January, 1: February
	        if ((inputDate.getFullYear() % 4 == 0 && inputDate.getFullYear() % 100 != 0) || inputDate.getFullYear() % 400 == 0) {
	            // Leapfrogged
	            months[1].length = 29;
	        } else {
	        	// Not leapfrogged
	        	months[1].length = 28;
	        }
	    }


	    // Build days before the first day of the month (invalid days)
	    resultMonths += "<tr>";
	    for (var i=0; i<7; i++) {

	    	// Where to start to print valid days
	    	if (i<startingDay) {
	    		resultMonths += "<td class='invalid-day'></td>";
	    	} else if (validDays < daysNum) {

	    		// Class for weekends
	    		var dateType = isWeekend( new Date(inputDate.getFullYear(), monthIndex, daysCounter) ) ? " weekend" : "";
	    		dateType += isHoliday(daysCounter, monthIndex+1) ? " holiday" : "";

	    		resultMonths += "<td class='valid-day"+dateType+"'>"+daysCounter+"</td>";
	    		daysCounter++;
	    		validDays++;
	    		validDaysInMonth++;
	    	} else { // If first week in current month is the last week and it has invalid days
	    		resultMonths += "<td class='invalid-day'></td>";
	    	}
	    }
		resultMonths += "</tr>";

		// For the remaining days, while remains days to print and length of month isn't over
		while (validDays < daysNum && daysCounter<=months[monthIndex].length) {
			resultMonths += "<tr>";
		
			for (var i=0; i<7; i++) {
				if (validDays < daysNum && daysCounter<=months[monthIndex].length) {

					// Class for weekends
					var dateType = isWeekend( new Date(inputDate.getFullYear(), monthIndex, daysCounter) ) ? " weekend" : "";
		    		dateType += isHoliday(daysCounter, monthIndex+1) ? " holiday" : "";

		    		resultMonths += "<td class='valid-day "+dateType+"'>"+daysCounter+"</td>";
		    		daysCounter++;
		    		validDays++;
		    		validDaysInMonth++;
		    	} else {
		    		resultMonths += "<td class='invalid-day'></td>";
		    	}
			}
			resultMonths += "</tr>";
		}

		daysCounter = 1; // "1" For printing it on next month
		resultMonths += "<tr class='month-jump'></tr>"; // Months margin			
		inputDate = addDays(inputDate, validDaysInMonth); // Update current date for next month 
		validDaysInMonth = 0;
	}

	return resultMonths;
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addErrorClass() {
    var element, name, arr;
    element = document.getElementById("calendar");
    name = "errors";
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
        element.className += " " + name;
    }
}

function removeErrorClass() {
    var element = document.getElementById("calendar");
    element.className = element.className.replace(/\berrors\b/g, "");
}

function isWeekend (date) {
	var day = date.getDay();
	return( (day == 6)||(day == 0) );
}

function isHoliday (date, month) {
	var usaHolidays = [
		{
			name: "New Year’s Day",
			date: "1",
			month: "1"
		},
		{
			name: "Birthday of Martin Luther King, Jr.",
			date: "15",
			month: "1"
		},
		{
			name: "Washington’s Birthday",
			date: "19",
			month: "2"
		},
		{
			name: "Memorial Day",
			date: "28",
			month: "5"
		},
		{
			name: "Independence Day",
			date: "4",
			month: "7"
		},
		{
			name: "Labor Day",
			date: "3",
			month: "9"
		},
		{
			name: "Columbus Day",
			date: "8",
			month: "10"
		},
		{
			name: "Veterans Day",
			date: "12",
			month: "11"
		},
		{
			name: "Thanksgiving Day",
			date: "22",
			month: "11"
		},
		{
			name: "Christmas Day",
			date: "25",
			month: "12"
		},
	];

	for (var i=0; i<usaHolidays.length; i++) {
		if (date == usaHolidays[i].date && month == usaHolidays[i].month)
			return true;
		// If holidays are sorted by month from highest to lowest
		if (month < usaHolidays[i].month)
			return false;		
	}

	return false;	
}

function checkErrorMessages (errors) {

	var resultWrapper = document.getElementById("calendar");
	resultWrapper.innerHTML = "";

	// If errors exist in array then this displays the errors in the results wrapper
	if (Boolean(errors.length)) {
		addErrorClass(); // For errors styling
		
		var message = "";
		// Show errors
		for (var i=0; i<errors.length; i++) {
			message += "<p>"+errors[i]+"</p>";
		}
		resultWrapper.innerHTML = message;

		return true;
	} else {
		removeErrorClass(); // For errors styling
		return false;
	}
	
	/* Returns:
	 true: with errors
	 false: valid inputs
	*/
}

function createCalendar () {

	// Getting inputs data
	var inputDate = document.getElementById("dateInput").value.trim();
	var daysNumberInput = document.getElementById("daysNumberInput").value.trim();
	var countryCodeInput = document.getElementById("countryCodeInput").value.trim();

	// For timezone problems with local time
	inputDate = convertUTCDateToLocalDate(new Date(inputDate));
	
	// For errors handling
	var errorMessages = [];

	// Validate empty date
	if ( !Boolean(inputDate) ) {
		errorMessages.push("Date missing");
	} 

	// Validate empty number of days and valid number
	if ( !Boolean(daysNumberInput) ) {
		errorMessages.push("Number of days missing");
	} else if( isNaN(daysNumberInput) ) {
		errorMessages.push("Number of days must be a valid number");
	}

	// Validate empty country code 
	if ( !Boolean(countryCodeInput) ) {
		errorMessages.push("Country code missing");
	}

	// Cancel calendar creation when there are errors
	if ( checkErrorMessages(errorMessages) ) return;

	// Days initial names
	var daysNames = ["S", "M", "T", "W", "T", "F", "S"];

	// Results legend
	var resultCalendar = "<p>Results for:</p>"+
							"<ul>"+
								"<li><b>Start Date:</b> "+inputDate.getMonth()+"/"+inputDate.getDate()+"/"+inputDate.getFullYear()+"</li>"+
								"<li><b>Number of days:</b> "+daysNumberInput+"</li>"+
								"<li><b>Country Code:</b> "+countryCodeInput+"</li>"+
							"</ul>";

	// Contruction of days names and months					
	resultCalendar += "<table border='1'>"+
		"<tr>"+
			"<th>"+daysNames[0]+"</th>"+
			"<th>"+daysNames[1]+"</th>"+
			"<th>"+daysNames[2]+"</th>"+
			"<th>"+daysNames[3]+"</th>"+
			"<th>"+daysNames[4]+"</th>"+
			"<th>"+daysNames[5]+"</th>"+
			"<th>"+daysNames[6]+"</th>"+
		"</tr>"+
		createMonths(new Date(inputDate), daysNumberInput)+
	"</table>";

	// Result
	document.getElementById("calendar").innerHTML = resultCalendar;
}

