const express = require('express');
const router = express.Router();
var xlsx = require('node-xlsx').default;

const download = require("download-file");
const apiKey = require("./APIKey.js");

const classes = require("../classes.js"); //Serverside classes
Link = classes.Link;
CrimeStat = classes.CrimeStat;
SubCrimeStat = classes.SubCrimeStat;

//Initialize the items needed to download all the excel data files -------------------------
const downloadDirectory = {directory: "../Crime Statistics/ExcelFiles"};

/*Puts all the precindict file data inside downloadLinkArray given their start and end number. 
The array catches numbers that are not part of the consequtive number loops
Zero String dictates how much 0s to put in front of the incremented number*/
function inputArray(areaName, startNum, endNum, zeroString, exceptionArray) 
{
	for (var i=startNum; i<=endNum; i++)
	{
		if (exceptionArray.indexOf(i) == -1)
		{
			downloadLinkArray.push(new Link(`${areaName} ${zeroString}${i}`));
		}
	}
}

//The array itself yes
downloadLinkArray = [
	new Link("Overall", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-city.xlsx"),
	new Link("Bronx", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbbx.xlsx"),
];

//Adds Bronx Precindict to the downloadLinkArray
inputArray("Bronx", 40, 52, "0", [51]);

//Adds Brooklyn South precindict to downloadLinkArray
downloadLinkArray.push(new Link("BrooklynSouth", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbbs.xlsx"));
inputArray("BrooklynSouth", 60, 78, "0", [64,65,73,74,75,77]);

//Adds Brooklyn North precindict 
downloadLinkArray.push(new Link("BrooklynNorth", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbbn.xlsx"));
inputArray("BrooklynNorth", 73, 94, "0", [74,76,78,80,82,85,86,87,89,91,92,93]);

//Adds Manhattan South
downloadLinkArray.push(new Link("ManhattanSouth", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbms.xlsx"));
inputArray("ManhattanSouth", 1, 9, "00", [2,3,4,8]);
inputArray("ManhattanSouth", 10, 18, "0", [11,12,15,16]);

//Add Manhattan North
downloadLinkArray.push(new Link("ManhattanNorth", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbmn.xlsx"));
inputArray("ManhattanNorth", 19, 34, "0", [21,27,29,31]);

//Adds Queens South
downloadLinkArray.push(new Link("QueensSouth", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbqs.xlsx"));
inputArray("QueensSouth", 100, 107, "", [4])
downloadLinkArray.push(new Link("QueensSouth 113", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-113pct.xlsx"))

//Adds Queens North
downloadLinkArray.push(new Link("QueensNorth", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbqn.xlsx"));
inputArray("QueensNorth", 104, 115, "", [105,106,107,113]);

//Adds Jersey City
downloadLinkArray.push(new Link("StatenIsland", "https://www1.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-pbsi.xlsx"));
inputArray("StatenIsland", 120, 123, "", []);

//------------------------------------------------

//Downloads the weekly excel crime data files
router.get("/downloadFiles", async (request, response) => {
	var query = request.query.key;

	if (query == undefined)
	{
		response.send("GeorgeNotFound - wait sorry I mean API Key not Found");
	}
	else
	{
		if (query == apiKey.apiKey) //If the APIKey Matches, bombs away
		{
			let successBoolean = true;
			for (var i in downloadLinkArray) //Download all the things
			{
				await download(downloadLinkArray[i].link, downloadLinkArray[i].downloadOptions, (err) =>{
					if (err)
					{
						successBoolean = false;
					}
				});
			}

			//Reports to the user whether the action was successful
			if (successBoolean)
			{
				response.send("Success!");
			}
			else
			{
				response.send("An error occured");
			}
		}
		else
		{
			response.send("API Key Is Not Correct")
		}
	}
})

router.get("/parseExcel", (request, response) => {
	var query = request.query.key;

	if (query == undefined)
	{
		response.send("I would split the query string, but I just can't divide by zero!");
	}
	else
	{
		if (query == apiKey.apiKey2)
		{
			try
			{
				//Parses all the spreadsheets and return a JSON with all the data

				//Start with citywide and go from there
				var pA = xlsx.parse("../Crime Statistics/ExcelFiles/Overall.xlsx")[0].data;

				var crimeArray = [
				pA[13][2], pA[14][2], pA[15][2], pA[16][2], pA[17][2], pA[18][2], pA[19][2], 
				pA[20][2], pA[21][2], pA[22][2], pA[23][2], pA[24][2], pA[25][2], pA[26][2], pA[27][2], pA[28][2]
				];

				let majorData = new CrimeStat("9/7/20 - 9/13/20", crimeArray);
				majorData.subData = [];

				for (var i=1; i<downloadLinkArray.length; i++)
				{
					var filename = downloadLinkArray[i].downloadOptions.filename;
					var pA = xlsx.parse(`../Crime Statistics/ExcelFiles/${filename}`)[0].data;
					var crimeArray = [
					pA[13][2], pA[14][2], pA[15][2], pA[16][2], pA[17][2], pA[18][2], pA[19][2], 
					pA[20][2], pA[21][2], pA[22][2], pA[23][2], pA[24][2], pA[25][2], pA[26][2], pA[27][2], pA[28][2]
					];
					//Add extra JSON thing to new object that incorporates filename
					majorData.subData.push(new SubCrimeStat("9/7/20 - 9/13/20", crimeArray, filename));
				}
				response.send(majorData);
			}
			catch(err)
			{
				console.log(err);
				response.send(err);
			}
		}
		else
		{
			response.send("API Key is not Correct");
		}
	}
})

router.use((request, response) => {
	response.send("404 Error: In the beginning, there was silence");
})

module.exports = router;