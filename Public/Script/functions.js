blank = [];
crimeStat = ["Bronx", "Bronx 040", "Bronx 041", "Bronx 042", "Bronx 043", "Bronx 044", "Bronx 045", "Bronx 046", "Bronx 047", "Bronx 048", "Bronx 049", "Bronx 050", "Bronx 052", "BrooklynSouth", "BrooklynSouth 060", "BrooklynSouth 061", "BrooklynSouth 062", "BrooklynSouth 063", "BrooklynSouth 066", "BrooklynSouth 067", "BrooklynSouth 068", "BrooklynSouth 069", "BrooklynSouth 070", "BrooklynSouth 071", "BrooklynSouth 072", "BrooklynSouth 076", "BrooklynSouth 078", "BrooklynNorth", "BrooklynNorth 073", "BrooklynNorth 075", "BrooklynNorth 077", "BrooklynNorth 079", "BrooklynNorth 081", "BrooklynNorth 083", "BrooklynNorth 084", "BrooklynNorth 088", "BrooklynNorth 090", "BrooklynNorth 094", "ManhattanSouth", "ManhattanSouth 001", "ManhattanSouth 005", "ManhattanSouth 006", "ManhattanSouth 007", "ManhattanSouth 009", "ManhattanSouth 010", "ManhattanSouth 013", "ManhattanSouth 014", "ManhattanSouth 017", "ManhattanSouth 018", "ManhattanNorth", "ManhattanNorth 019", "ManhattanNorth 020", "ManhattanNorth 022", "ManhattanNorth 023", "ManhattanNorth 024", "ManhattanNorth 025", "ManhattanNorth 026", "ManhattanNorth 028", "ManhattanNorth 030", "ManhattanNorth 032", "ManhattanNorth 033", "ManhattanNorth 034", "QueensSouth", "QueensSouth 100", "QueensSouth 101", "QueensSouth 102", "QueensSouth 103", "QueensSouth 104", "QueensSouth 105", "QueensSouth 106", "QueensSouth 107", "QueensSouth 113", "QueensNorth", "QueensNorth 104", "QueensNorth 108", "QueensNorth 109", "QueensNorth 110", "QueensNorth 111", "QueensNorth 112", "QueensNorth 114", "QueensNorth 115", "StatenIsland", "StatenIsland 120", "StatenIsland 121", "StatenIsland 122", "StatenIsland 123"];

function getDates(array)
{
	let dateArray = [];

	for (var i in array)
	{
		dateArray.push(array[i].date);
	}

	return dateArray;
}

function createChart(canvas, title, chartType, chartLabels, labelArray, dataArray)
{
	//If labelArray and dataArray are not 1-1, it's not a valid graph; return it
	if (labelArray.length != dataArray.length)
	{
		console.log("Not a valid graph");
		return;
	}

	crimeChart = new Chart(canvas, {
		type: chartType,
		data: {
			labels: labelArray,
			datasets: [{
				label: chartLabels,
				data: dataArray,
				backgroundColor: [ //Enough to cover the felonies. Misdemeanors are going to be in grey
					'rgba(255, 99, 132, 0.2)',
                	'rgba(54, 162, 235, 0.2)',
                	'rgba(255, 206, 86, 0.2)',
                	'rgba(75, 192, 192, 0.2)',
                	'rgba(153, 102, 255, 0.2)',
                	'rgba(255, 159, 64, 0.2)',
                	'rgba(66, 245, 245, 0.2)'
            	],
            	borderColor: [
            		'rgba(255, 99, 132, 1)',
                	'rgba(54, 162, 235, 1)',
                	'rgba(255, 206, 86, 1)',
                	'rgba(75, 192, 192, 1)',
                	'rgba(153, 102, 255, 1)',
                	'rgba(255, 159, 64, 1)',
                	'rgba(66, 245, 245, 1)'
            	],
            	pointBackgroundColor: [
            		'rgba(255, 99, 132, 1)',
                	'rgba(54, 162, 235, 1)',
                	'rgba(255, 206, 86, 1)',
                	'rgba(75, 192, 192, 1)',
                	'rgba(153, 102, 255, 1)',
                	'rgba(255, 159, 64, 1)'
            	],
            	borderWidth: 1,
			}]
		},
		options: {
			scales:
			{
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			title:
			{
				display: true,
				text: title
			}
		}
	});
}

//Updates the bar graph data
function updateGraph(canvas, dateIndex)
{
	crimeChart.data.datasets[0].data = dateIndex.array;
	crimeChart.options.title.text = `Crime Chart for Week of ${dateIndex.date}`;
	crimeChart.update();
}

//Updates the bar graph data, but for the weekly bar graphs
function updateWeekData(canvas, element)
{
	if (element.value != "")
	{
		updateGraph(canvas, eval(statForm.chartMonth.value).crimeData[parseInt(element.value)]);
	}
}

//Depending on whether the graph is currently displaying weeks or months, update the week choices or graph respectively
function updateMonthData(element)
{
	//Empty value bad
	if (element.value == "")
	{
		displayWeek("blank");
		return;
	}

	if (statForm.chartType.value == "Weekly Crime Chart")
	{
		displayWeek(element.value);
	}
	else if (statForm.chartType.value == "Monthly Crime Chart")
	{
		let crimeArray = [];
		let monthArray = eval(element.value);

		for (var i=0; i<15; i++)
		{
			var tempNumber = 0;
			
			for (var c in monthArray.crimeData)
			{
				tempNumber += monthArray.crimeData[c].array[i];
			}

			crimeArray.push(tempNumber);
		}

		crimeChart.data.datasets[0].data = crimeArray;
		crimeChart.options.title.text = `Crime Chart for Month of ${monthArray.name} So Far`
		crimeChart.update();
	}
}

//Prepare to initialize different types of graphs
function updateChartData(element)
{
	switch (element.value)
	{
		case "Weekly Crime Chart":
			toggleElementVisibility(true, "chartMonthHTML");
			toggleElementVisibility(true, "chartWeekHTML");
		break;

		case "Monthly Crime Chart":
			toggleElementVisibility(true, "chartMonthHTML");
			toggleElementVisibility(false, "chartWeekHTML");
		break;
	}
}

function toggleElementVisibility(isAppear, elementId) //Show/hide the select element for users to interact with
{
	var currentElement = document.getElementById(elementId);

	if (isAppear)
	{
		statForm.querySelector(`label[for='${elementId}']`).style.display = "inline-block";
		currentElement.style.display = "inline-block";
		currentElement.value = ""; //Resetting values so things don't get buggy
	}
	else
	{
		statForm.querySelector(`label[for='${elementId}']`).style.display = "none";
		currentElement.style.display = "none";
	}
}

function weekGraph(canvas, dateIndex) //Creates a week graph - since we're dealing with many types of graphs, we'll just make a new one
{
	try
	{
		crimeChart.destroy();
	}
	catch
	{
		console.log("First Graph");
	}

	createChart(canvas, `Crime Chart for Week of ${dateIndex.date}`, "bar", "Crime Count", crimeArray, dateIndex.array);
}

//HTML DOM Create blank option for select
function createBlankOption(parent)
{
	var nothingOption = document.createElement("option");
	nothingOption.value = "";
	nothingOption.text = " ";

	parent.appendChild(nothingOption);
}

function fillSelectOptions() //Creates select options for all the months
{
	createBlankOption(document.getElementById("chartMonthHTML"));

	for (var monthArray of firebaseData) //Month in Weekly Crime Stat
	{
		let tempOption = document.createElement("option");
		tempOption.value = monthArray.name.replace(" ", "").toLowerCase();
		tempOption.text = monthArray.name;

		document.getElementById("chartMonthHTML").appendChild(tempOption);
	}
}

function displayWeek(monthArrayName) //Displays the week in the week option
{
	if (statForm.chartType.value == "Weekly Crime Chart")
	{
		//Resets the items inside chartWeek to add later
		statForm.chartWeek.value = "";

		for (var i=(document.getElementById("chartWeekHTML").children.length-1); i>=0; i--)
		{
			document.getElementById("chartWeekHTML").children[i].remove();
		}

		createBlankOption(document.getElementById("chartWeekHTML"));
		let monthArray = eval(monthArrayName);
		for (var c=0; c<monthArray.crimeData.length; c++)
		{
			let tempOption = document.createElement("option");
			tempOption.value = monthArray.crimeData[c].date;
			tempOption.text = monthArray.crimeData[c].date;

			document.getElementById("chartWeekHTML").appendChild(tempOption);
		}
	}
}

function spoopJoin(borough) //Returns a complete array with the combined borough statistics
{
	if (statForm.chartType.value.includes("Monthly"))
	{
		var monthArray = firebaseData.filter((timeframe) => {
			return timeframe == statForm.chartMonth.value;
		})[0];

		var dataStat = monthArray.subData.filter((area) => {
			return ((area == borough + "South") || (area == borough + "North")); //The brklynNorth & south array will be consecutive
		})

		var crimeArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		for (var i=0; i<dataStat.length; i+=2)
		{
			for (var c=0; c<15; c++)
			{
				crimeArray[c] += Number(dataStat[i].array[c]) + Number(dataStat[i+1].array[c]);
			}
		}
	}
	else //Weekly
	{
		var monthArray = firebaseData.filter((timeframe) => {
			return timeframe == statForm.chartMonth.value;
		})[0];

		var dataStat = monthArray.subData.filter((area) => {
			return ((area == borough + "South") || (area == borough + "North")); //The brklynNorth & south array will be consecutive
		});

		var weekArray = dataStat.filter((timeframe) => {
			return timeframe == statForm.chartWeek.value; //We should only get weekArray with 2 items bc brklynNorth + brklynSouth
		});

		var crimeArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		for (var i=0; i<15; i++)
		{
			crimeArray[i] += (Number(weekArray[0][i]) + Number(weekArray[1][i]));
		}

	}

	if (crimeArray == [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) //If there is no crime stat at all on the borough, return err as a safety measure
	{
		return "George Not Found";
	}
	else
	{
		return crimeArray;
	}
}

function spoopMode(boroughHTML) //Enables or disables the precindict select options + Returns the crime month data
{
	//Does stuff
	//Timeframe - statForm.chartMonth.value
}