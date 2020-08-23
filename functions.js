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

function fillSelectOptions() //Creates select options for all the possible graph options
{
	createBlankOption(document.getElementById("chartMonthHTML"));

	for (var monthName of crimeMonthArray) //Month in Weekly Crime Stat
	{
		let tempOption = document.createElement("option");
		tempOption.value = monthName.name.replace(" ", "").toLowerCase();
		tempOption.text = monthName.name;

		document.getElementById("chartMonthHTML").appendChild(tempOption);
	}
}

function displayWeek(monthArrayName) //Displays the week in the week option
{
	if (monthArrayName)
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
			tempOption.value = c;
			tempOption.text = monthArray.crimeData[c].date;

			document.getElementById("chartWeekHTML").appendChild(tempOption);
		}
	}
}