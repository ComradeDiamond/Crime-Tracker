//Creates the crime stats - Eventually when we find a serverside hosting website, we can AJAX the crimeStatArray instead of manual input
//Once we find a serverside hosting we'll probably AJAX the thing
//Hopefully we can expand this in the next few years

function CrimeStat(date, crimeStatArray, felonyCount) //crimeStats and felonyCount are from NYPD Website
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

//Array of the crimes, whcih we will use later in the graph
const crimeArray = 
[
	"Murder", "Rape", "Robbery", "Felony Assault", "Burglary", "Grand Larcenry", "Grand Theft Auto",
	"Transit", "Housing", "Small Larcenry", "Misdemeanor Assault", "UCR Rape", "Sex Crime", "Shooting (Victim)", "Shooting (Incident)"
]

//Array of all the General Crime Months
crimeMonthArray = [];