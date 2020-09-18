//Serverside CrimeStat class for API to export JSON
function CrimeStat(date, crimeStatArray)
{
	this.date = date;
	this.murder = crimeStatArray[0];
	this.rape = crimeStatArray[1];
	this.robbery = crimeStatArray[2];
	this.felonyAssault = crimeStatArray[3];
	this.burglary = crimeStatArray[4];
	this.grandLarcenry = crimeStatArray[5];
	this.carTheft = crimeStatArray[6]; //NYPD calls this "GLA"
	this.transit = crimeStatArray[8];
	this.housing = crimeStatArray[9];
	this.smallLarcenry = crimeStatArray[10]; //AKA petite larcenry
	this.misdAssult = crimeStatArray[11]; //Misdemeanor Assault
	this.ucrRape = crimeStatArray[12]; //Rape + attempt to rape
	this.sexCrime = crimeStatArray[13];
	this.shootingVic = crimeStatArray[14];
	this.shootingInc = crimeStatArray[15];
	this.felonyCount = crimeStatArray[7];

	crimeStatArray.splice(7,1);
	this.array = crimeStatArray;
}

function SubCrimeStat(date, crimeStatArray, precindict)
{
	this.precindict = precindict;
	this.date = date;
	this.felonyCount = crimeStatArray[7];

	crimeStatArray.splice(7,1);
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

module.exports.Link = Link;
module.exports.CrimeStat = CrimeStat;
module.exports.SubCrimeStat = SubCrimeStat;