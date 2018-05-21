var months = [
	{ name: "January", 	length: 31 },
	{ name: "February", length: 28 },
	{ name: "March", 	length: 31 },
	{ name: "April", 	length: 30 },
	{ name: "May", 		length: 31 },
	{ name: "June", 	length: 30 },
	{ name: "July", 	length: 31 },
	{ name: "August", 	length: 31 },
	{ name: "September",length: 30 },
	{ name: "October", 	length: 31 },
	{ name: "November", length: 30 },
	{ name: "December", length: 31 }
];


function createMonths (inputDate, daysNum) {
	var resultMonths = "";
	var validDays = 0;
	var daysCounter = inputDate.getDate();

	//daysNum = 1;
	
	var i=0;


	//while (validDays < daysNum) {
		// Hasta que no hayan más números por cubrir
	while (i < 2) {
		//inputDate

		var monthIndex = inputDate.getMonth();

		monthIndex = monthIndex > 11 ? 0 : monthIndex;

		resultMonths += "<tr>"+
							"<td colspan='7'>"+ (i+1) + ": "+ months[ monthIndex ].name+"</td>"+
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
	    		resultMonths += "<td class='invalid-day'>-</td>";
	    	} else if (validDays < daysNum) {
	    		resultMonths += "<td class='valid-day'>"+daysCounter+"</td>";
	    		daysCounter++;
	    		validDays++;
	    	} else {
	    		resultMonths += "<td class='invalid-day'>-</td>";
	    	}
	    }
		resultMonths += "</tr>";
		//return resultMonths;


		while (validDays < daysNum && daysCounter<=months[monthIndex].length) { // Queden días por escribir Y No se haya terminado el mes
		
			for (var i=0; i<7; i++) {
				if (validDays < daysNum) {
		    		resultMonths += "<td class='valid-day'>"+daysCounter+"</td>";
		    		daysCounter++;
		    		validDays++;
		    	} else {
		    		resultMonths += "<td class='invalid-day'>-</td>";
		    	}
				//resultMonths += "<td class='invalid-day'>X</td>";
			}
			resultMonths += "</tr>";

		}
		return resultMonths;


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



		resultMonths += "<tr class='month-jump'></tr>";
			
		monthIndex++;
		i++;
	}


	return resultMonths;
}


function createCalendar () {
	var daysNames = ["S", "M", "T", "W", "T", "F", "S"];
	var inputDate = new Date("08-15-2008"); // Cambiar luego por usuario
	//var inputDate = new Date("05-07-2018");

	var daysNum = 17;
	

	var resultCalendar = "<table border='1'>"+
		"<tr>"+
			"<th>"+daysNames[0]+"</th>"+
			"<th>"+daysNames[1]+"</th>"+
			"<th>"+daysNames[2]+"</th>"+
			"<th>"+daysNames[3]+"</th>"+
			"<th>"+daysNames[4]+"</th>"+
			"<th>"+daysNames[5]+"</th>"+
			"<th>"+daysNames[6]+"</th>"+
		"</tr>"+
		createMonths(inputDate, daysNum)+
	"</table>";

	//console.log(resultCalendar);
	document.getElementById("calendar").innerHTML = resultCalendar;


	//alert(inputDate.getMonth());


}