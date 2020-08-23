//Numbers
let july27_august2 = [7,32,296,472,244,706,220,24,95,1617,734,57,73,54,48];
let august3_august9 = [6,26,275,426,278,683,222,25,102,1584,609,46,84,57,41];
let august10_august16 = [14,30,266,443,299,710,239,32,109,1931,669,50,90,78,63];

//JSON of the crime statistics, organized
const august2020 =
{
	name: "August 2020",
	crimeData: [
		new CrimeStat("7/27 - 8/2", july27_august2, 1977),
		new CrimeStat("8/3 - 8/9", august3_august9, 1916),
		new CrimeStat("8/10 - 8/16", august10_august16, 2001)
	]
}

//Maybe in the future we can sort the name of the JSONs by date
crimeMonthArray.push(august2020);