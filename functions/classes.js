//Serverside CrimeStat class for API to export JSON
function CrimeStat(date, crimeStatArray, felonyCount)
{
	this.date = date;
	this.murder = crimeStatArray[0];
	this.rape = crimeStatArray[1];
	this.robbery = crimeStatArray[2];
	this.felonyAssault = crimeStatArray[3];
	this.burglary = crimeStatArray[4];
	this.grandLarcenry = crimeStatArray[5];
	this.carTheft = crimeStatArray[6]; //NYPD calls this "GLA"
	this.transit = crimeStatArray[7];
	this.housing = crimeStatArray[8];
	this.smallLarcenry = crimeStatArray[9]; //AKA petite larcenry
	this.misdAssult = crimeStatArray[10]; //Misdemeanor Assault
	this.ucrRape = crimeStatArray[11]; //Rape + attempt to rape
	this.sexCrime = crimeStatArray[12];
	this.shootingVic = crimeStatArray[13];
	this.shootingInc = crimeStatArray[14];
	this.felonyCount = felonyCount;
	this.array = crimeStatArray;
}

function Link(area, link) //Creates a link class so we can easily put the things inside the array
{
	this.downloadOptions = {directory: "../Crime Statistics/ExcelFiles", filename: `${area}.xlsx`};

	if (link == undefined)
	{
		this.link = `https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-${area.substring(area.indexOf(" ")+1)}pct.xlsx`;
	}
	else
	{
		this.link = link;
	}
}

//Array of the crimes, whcih we will use later in the graph
const crimeArray = 
[
	"Murder", "Rape", "Robbery", "Felony Assault", "Burglary", "Grand Larcenry", "Grand Theft Auto",
	"Transit", "Housing", "Small Larcenry", "Misdemeanor Assault", "UCR Rape", "Sex Crime", "Shooting (Victim)", "Shooting (Incident)"
]

//Array of all the General Crime Months
crimeMonthArray = [];

module.exports.Link = Link;
module.exports.CrimeStat = CrimeStat;