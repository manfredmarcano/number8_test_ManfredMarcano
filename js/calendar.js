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

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function createMonths (inputDate, daysNum) {
	var resultMonths = "";
	var validDays = 0;
	var daysCounter = inputDate.getDate();
	var validDaysInMonth = 0;

	//daysNum = 1;
	
	var j=0;


	//while (validDays < daysNum) {
		// Hasta que no hayan más números por cubrir
	//while (j < 2) {
	while (validDays < daysNum) {


		//console.log(i);
		//inputDate

		/*
		if(i==1){
			console.log("Nueva fecha: ", inputDate);
			return;
		}
		*/

		var monthIndex = inputDate.getMonth();
		console.log(inputDate);
		console.log(typeof inputDate);

		monthIndex = monthIndex > 11 ? 0 : monthIndex;

		resultMonths += "<tr>"+
							"<td colspan='7' class='month-name'>"+ months[ monthIndex ].name+" "+inputDate.getFullYear()+"</td>"+
						"</tr>";

		// Obtener el primer día del mes / Get first day of month
	    var firstDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
	    var startingDay = firstDay.getDay();				
	    console.log("Month starting day: ", startingDay);

	    // find number of days in month
	    //var monthLength = cal_days_in_month[this.month];

	    // To compensate for leap year
	    if (monthIndex == 1) { // 1 = February
	        if ((inputDate.getFullYear() % 4 == 0 && inputDate.getFullYear() % 100 != 0) || inputDate.getFullYear() % 400 == 0) {
	            months[1].length = 29;
	        } else {
	        	months[1].length = 28;
	        }
	    }


	    // INICIO DE MES
	    resultMonths += "<tr>";
	    for (var i=0; i<7; i++) {

	    	if (i<startingDay) {
	    		resultMonths += "<td class='invalid-day'></td>";
	    	} else if (validDays < daysNum) {
	    		var dateType = isWeekend( new Date(inputDate.getFullYear(), monthIndex, daysCounter) ) ? " weekend" : "";

	    		resultMonths += "<td class='valid-day"+dateType+"'>"+daysCounter+"</td>";
	    		
	    		daysCounter++;
	    		validDays++;
	    		validDaysInMonth++;
	    	} else {
	    		resultMonths += "<td class='invalid-day'>-</td>";
	    	}
	    }
		resultMonths += "</tr>";
		//return resultMonths;


		// Queden días por escribir Y No se haya terminado el mes
		while (validDays < daysNum && daysCounter<=months[monthIndex].length) { 
		
			for (var i=0; i<7; i++) {
				if (validDays < daysNum && daysCounter<=months[monthIndex].length) {
					var dateType = isWeekend( new Date(inputDate.getFullYear(), monthIndex, daysCounter) ) ? " weekend" : "";
		    		resultMonths += "<td class='valid-day "+dateType+"'>"+daysCounter+"</td>";
		    		daysCounter++;
		    		validDays++;
		    		validDaysInMonth++;
		    	} else {
		    		resultMonths += "<td class='invalid-day'></td>";
		    	}
				//resultMonths += "<td class='invalid-day'>X</td>";
			}
			resultMonths += "</tr>";

		}
		//return resultMonths;




		/*
		var k = 0;
		while (k < 4) { // Mientras existan dias de ese mes por poner
			resultMonths += "<tr>";

			for (var j=0; j<7; j++) {
				resultMonths += "<td class='invalid-day'>X</td>";
			}

			resultMonths += "</tr>";
			k++;
		}
		*/


		daysCounter = 1;
		resultMonths += "<tr class='month-jump'></tr>";
			
		//monthIndex++;
		inputDate = addDays(inputDate, validDaysInMonth); 
		console.log("Nueva fecha: ", inputDate);
		//return;
		j++; // Borrar luego
		console.log(i);


		validDaysInMonth = 0;
	}


	return resultMonths;
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

function checkErrorMessages (errors) {

	//console.log("-->", Boolean(errors.length));
	var resultWrapper = document.getElementById("calendar");
	resultWrapper.innerHTML = "";

	// Errors exists
	if (Boolean(errors.length)) {
		addErrorClass();
		var message = "";
		for (var i=0; i<errors.length; i++) {
			message += "<p>"+errors[i]+"</p>";
		}
		resultWrapper.innerHTML = message;

		return true;
	} else {
		removeErrorClass();
		return false;
	}
	
}

function createCalendar () {

	var inputDate = document.getElementById("dateInput").value;
	var daysNumberInput = document.getElementById("daysNumberInput").value;
	var countryCodeInput = document.getElementById("countryCodeInput").value;
	var errorMessages = [];

	if ( !Boolean(inputDate.trim()) ) {
		errorMessages.push("Date missing");
	} 
	if ( !Boolean(daysNumberInput.trim()) ) {
		errorMessages.push("Number of days missing");
	} 
	if ( !Boolean(countryCodeInput.trim()) ) {
		errorMessages.push("Country code missing");
	}

	console.log(errorMessages);
	//return

	// Block creating when exists errors
	if ( checkErrorMessages(errorMessages) ) return;
	// TRUE: Errores
	// FALSE: Valido


	//alert(inputDate+"-"+daysNumberInput+"-"+countryCodeInput);
	//return;

	console.log("1: ", inputDate);
	//var  = new Date();
	//var n = d.getDate();
	//var timezone = new Date(inputDate).getTimezoneOffset() / -60;


	//var str = "How are you doing today?";
	//var res = inputDate.split("-");

	
	var splitDate = inputDate.split("-");
	//var fixedDate = splitDate[1]+"-"+splitDate[2]+"-"+splitDate[0];


	console.log(splitDate[1]+"-"+splitDate[2]+"-"+splitDate[0]);
	//console.log( new Date(inputDate).getTimezoneOffset() );

	//console.log("2: ", new Date(getDate()+"-21-2018") );
	//return;


	var daysNames = ["S", "M", "T", "W", "T", "F", "S"];
	//var inputDate = new Date("08-15-2008"); // Cambiar luego por usuario
	//var inputDate = new Date("05-07-2018");
	//var inputDate = new Date("02-13-2008"); // Estudio de bisiestos
	//var inputDate = new Date("05-21-2018");

	var daysNum = daysNumberInput; // Probar con 17 que es cuando justo termina el mes 
	
	var resultCalendar = "<p>Results for:</p>"+
							"<ul>"+
								"<li><b>Start Date:</b> "+inputDate+"</li>"+
								"<li><b>Number of days:</b> "+daysNumberInput+"</li>"+
								"<li><b>Country Code:</b> "+countryCodeInput+"</li>"+
							"</ul>";

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
		createMonths(new Date(inputDate), daysNum)+
	"</table>";

	//console.log(resultCalendar);
	document.getElementById("calendar").innerHTML = resultCalendar;


	//alert(inputDate.getMonth());


}