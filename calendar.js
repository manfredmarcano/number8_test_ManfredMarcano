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