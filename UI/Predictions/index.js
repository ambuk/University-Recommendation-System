let collegeData = []

function getOption(e) {
	e.preventDefault();

	//	document.getElementById("heading").classList.add("classToBeAdded");
	document.getElementById("heading").style.visibility = "visible"

	control = document.getElementById('control')
	control = control.options[control.selectedIndex].text;
	region = document.getElementById('region')
	region = region.options[region.selectedIndex].text;
	type = document.getElementById('type')
	type = type.options[type.selectedIndex].text;
	// reading = document.getElementById('reading').options[reading.selectedIndex].text;
	// writing = document.getElementById('writing').options[writing.selectedIndex].text;
	// math = document.getElementById('math').options[math.selectedIndex].text;
	//Store a list of promises
	let promiseList = []
	//Append the promises
	promiseList.push(getESData("salariesbyregion", universityByRegion(region)))
	promiseList.push(getESData("salariesbycollegetype", universityByType(type)))
	promiseList.push(getESData("collegetuitiondata", universityByTuitionAndSATAndControlByInstitution(30000,
		15000, 500, 500, 500, control
	)))
	//Collect the results
	Promise.all(promiseList).then(([regionData, typeData, tuitionData]) => {
		//console.log(regionData)
		// console.log(typeData)
		//console.log(tuitionData)
		//var indexes = [2, 3, 4, 5, 7, 8, 9];
		var indexes = [2, 3, 4];
		//var indexes = [2, 3, 4, 5];
		//loopThrough(JSON.parse(tuitionData).aggregations, indexes, 0);
		var myObject = {
			colData: [],
			temp: []
		}
		match = []
		match = getRegionAndTypeData(regionData, typeData, myObject)

		//getTuitionData(tuitionData, match, tuitionObject)
		//console.log(match)
		populateOverallOverview(match)
		// //console.log(typeData)
		// console.log(collegeData)
		// var region

		//loopThrough(JSON.parse(typeData).aggregations, indexes, 0);
		//console.log(collegeData)

	}).catch((error) => {
		console.log(error)
	})
}

function parseQueryResult(e) {
	e.preventDefault();
	//var fs = require('fs');
	//var data = fs.readFileSync('result3.json', 'utf8');
	var words = JSON.parse(`{
		"_shards": {
			"failed": 0,
			"skipped": 0,
			"successful": 1,
			"total": 1
		},
		"aggregations": {
			"2": {
				"buckets": [
					{
						"3": {
							"buckets": [
								{
									"4": {
										"buckets": [
											{
												"5": {
													"buckets": [
														{
															"7": {
																"buckets": [
																	{
																		"8": {
																			"buckets": [
																				{
																					"9": {
																						"buckets": [
																							{
																								"doc_count": 1,
																								"key": 0
																							}
																						],
																						"doc_count_error_upper_bound": 0,
																						"sum_other_doc_count": 0
																					},
																					"doc_count": 1,
																					"key": 0
																				}
																			],
																			"doc_count_error_upper_bound": 0,
																			"sum_other_doc_count": 0
																		},
																		"doc_count": 1,
																		"key": 0
																	}
																],
																"doc_count_error_upper_bound": 0,
																"sum_other_doc_count": 0
															},
															"doc_count": 1,
															"key": 30193
														}
													],
													"doc_count_error_upper_bound": 0,
													"sum_other_doc_count": 0
												},
												"doc_count": 1,
												"key": "Pennsylvania"
											}
										],
										"doc_count_error_upper_bound": 0,
										"sum_other_doc_count": 0
									},
									"doc_count": 1,
									"key": "Pennsylvania College of Technology"
								},
								{
									"4": {
										"buckets": [
											{
												"5": {
													"buckets": [
														{
															"7":{
																"buckets": [
																	{
																		"8": {
																			"buckets": [
																				{
																					"9": {
																						"buckets": [
																							{
																								"doc_count": 1,
																								"key": 485
																							}
																						],
																						"doc_count_error_upper_bound": 0,
																						"sum_other_doc_count": 0
																					},
																					"doc_count": 1,
																					"key": 490
																				}
																			],
																			"doc_count_error_upper_bound": 0,
																			"sum_other_doc_count": 0
																		},
																		"doc_count": 1,
																		"key": 470
																	}
																],
																"doc_count_error_upper_bound": 0,
																"sum_other_doc_count": 0
															},
															"doc_count": 1,
															"key": 30150
														}
													],
													"doc_count_error_upper_bound": 0,
													"sum_other_doc_count": 0
												},
												"doc_count": 1,
												"key": "Pennsylvania"
											}
										],
										"doc_count_error_upper_bound": 0,
										"sum_other_doc_count": 0
									},
									"doc_count": 1,
									"key": "Pennsylvania State University-Penn State Schuylkill"
								}
							],
							"doc_count_error_upper_bound": 0,
							"sum_other_doc_count": 0
						},
						"doc_count": 2,
						"key": "Public"
					}
				],
				"doc_count_error_upper_bound": 0,
				"sum_other_doc_count": 0
			}
		},
		"hits": {
			"hits": [],
			"max_score": null,
			"total": {
				"relation": "eq",
				"value": 2
			}
		},
		"timed_out": false,
		"took": 5
	}`);
	//	console.log(words.aggregations[2].buckets)
	var indexes = [2, 3, 4, 5, 7, 8, 9];
	loopThrough(tuitionData.aggregations, indexes, 0);

	// for (var i = 0; i < words.aggregations[2].buckets.length; i++) {
	// 	console.log(words.aggregations[2].buckets[i])
	// 	result = words.aggregations[2].buckets[i];
	// 	console.log(result[3].buckets)
	// }
	//var data = JSON.parse()
}
function populateOverallOverview(result) {
	var table = document.getElementById("firstTabOverall");

	// helper function        
	// function addCell(tr, text) {
	// 	var td = tr.insertCell();
	// 	td.textContent = text;
	// 	return td;
	// }

	// create header 
	// var thead = table.createTHead();
	// var headerRow = th.insertRow();
	// addCell(headerRow, 'Category');
	// addCell(headerRow, 'Best selling month');
	// addCell(headerRow, 'Amount');

	// insert data
	document.getElementById("firstTabOverall").innerHTML = "";
	var t = "";
	var count = 0;
	result = result.splice(0, 10)
	result.forEach(function (item, i) {

		var tr = "<tr>";
		tr += "<td>" + item[0] + "</td>";
		tr += "<td>" + item[3] + "</td>";
		tr += "<td>" + item[1] + "</td>";
		tr += "<td>" + item[2] + "</td>";
		tr += "</tr>";
		t += tr;
	});
	document.getElementById("firstTabOverall").innerHTML += t;
	// var row = table.insertRow();
	// addCell(row, item[0]);
	// addCell(row, item[3]);
	// addCell(row, item[1]);
	// addCell(row, item[2]);
	//});
}
function getRegionAndTypeData(regionData, typeData, myObject) {
	var indexes = [2, 3, 4];
	loopThrough(JSON.parse(regionData).aggregations, indexes, 0, myObject);
	var regionResult = myObject.colData;
	//console.log(regionResult)
	// collegeData = []
	// tmp = []
	var result = []
	var tuitionObject = {
		colData: [],
		temp: []
	}
	loopThrough(JSON.parse(typeData).aggregations, indexes, 0, tuitionObject);
	var typeResult = tuitionObject.colData;
	//console.log(typeResult)
	for (var i = 0; i < regionResult.length; i++) {
		var arr = regionResult[i];
		for (var j = 0; j < typeResult.length; j++) {
			var typeArr = typeResult[j];
			if (arr[1] === typeArr[1]) {
				// var temp=[];
				// temp.push(arr);
				// temp.push(typeArr);
				result.push([...new Set([...arr, ...typeArr])]);
			}
		}
	}
	//console.log(result)
	return result;

}
function getTuitionData(tuitionData, match, tuitionObject) {
	var indexes = [2, 3, 4, 5, 7, 8, 9];
	collegeData = []
	tmp = []
	//console.log(tuitionData)
	loopThrough(JSON.parse(tuitionData).aggregations, indexes, 0, tuitionObject);
	var tuitionResult = tuitionObject.colData;
	var result = []
	// console.log(tuitionResult)
	// console.log(match)
	for (var i = 0; i < tuitionResult.length; i++) {
		var arr = tuitionResult[i];
		//console.log(arr);
		for (var j = 0; j < match.length; j++) {
			var typeArr = match[j];

			console.log(typeArr[1], " , ", arr[1], " : ", TrigramIndex([typeArr[1]]).find(arr[1]));
			if (typeArr[1].match(arr[1])) {
				// var temp=[];
				// temp.push(arr);
				// temp.push(typeArr);
				result.push([...new Set([...arr, ...typeArr])]);
			}
		}
	}
	console.log(result)
	return result;

}
let tmp = []
function loopThrough(content, indexes, index, myObject) {
	if (index === 4) {
		//	console.log(content[index].key);
		// console.log(content[index]);

	}
	// console.log("index: " + index)

	if (index == indexes.length) {

		myObject.colData.push(myObject.temp)

		myObject.temp = [myObject.temp[0]]
		return;

	}


	for (var i = 0; i < content[indexes[index]].buckets.length; i++) {
		//console.log(content[index].buckets[i])
		result = content[indexes[index]].buckets[i];

		// console.log(result.key)
		myObject.temp.push(result.key)
		// collegeData[i] = [...collegeData[i], result.key]

		loopThrough(result, indexes, index + 1, myObject)

	}
}
// function loopThrough(content, indexes, index) {
// 	// if (index === 4) {
// 	// 	console.log(content[index].key);
// 	// 	console.log(content[index]);
// 	// }
// 	//console.log("index: " + index)
// 	// if (index === 6) {
// 	// 	return;
// 	// 	//	index = index + 1;
// 	// 	//console.log("index : " + index);
// 	// }
// 	if (typeof content[index] === 'undefined' || content[index] === null)
// 		return;
// 	// for(var index =0;index<indexes.length;index++){

// 	// }

// 	for (var i = 0; i < content[index].buckets.length; i++) {
// 		//console.log(content[index].buckets[i])
// 		result = content[index].buckets[i];

// 		console.log(result.key)


// 		// while (typeof content[index] === 'undefined' || content[index] === null)
// 		// 	index++;
// 		if (index === 5) {
// 			index = index + 1;
// 			//console.log("index : " + index);
// 		}
// 		loopThrough(result, indexes, index + 1)

// 	}
// }

LevenshteinDistance = function (a, b) {
	if (a.length == 0) return b.length;
	if (b.length == 0) return a.length;

	var matrix = [];

	// increment along the first column of each row
	var i;
	for (i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	// increment each column in the first row
	var j;
	for (j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= b.length; i++) {
		for (j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) == a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
					Math.min(matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1)); // deletion
			}
		}
	}

	return matrix[b.length][a.length];
};

TrigramIndex = function (inputPhrases) {
	function asTrigrams(phrase, callback) {
		var rawData = "  ".concat(phrase, "  ");
		for (var i = rawData.length - 3; i >= 0; i = i - 1)
			callback.call(this, rawData.slice(i, i + 3));
	};

	var instance = {
		phrases: [],
		trigramIndex: [],

		index: function (phrase) {
			if (!phrase || phrase === "" || this.phrases.indexOf(phrase) >= 0) return;
			var phraseIndex = this.phrases.push(phrase) - 1;
			asTrigrams.call(this, phrase, function (trigram) {
				var phrasesForTrigram = this.trigramIndex[trigram];
				if (!phrasesForTrigram) phrasesForTrigram = [];
				if (phrasesForTrigram.indexOf(phraseIndex) < 0) phrasesForTrigram.push(phraseIndex);
				this.trigramIndex[trigram] = phrasesForTrigram;
			});
		},

		find: function (phrase) {
			var phraseMatches = [];
			var trigramsInPhrase = 0;
			asTrigrams.call(this, phrase, function (trigram) {
				var phrasesForTrigram = this.trigramIndex[trigram];
				trigramsInPhrase += 1;
				if (phrasesForTrigram)
					for (var j in phrasesForTrigram) {
						phraseIndex = phrasesForTrigram[j];
						if (!phraseMatches[phraseIndex]) phraseMatches[phraseIndex] = 0;
						phraseMatches[phraseIndex] += 1;
					}
			});
			var result = [];
			for (var i in phraseMatches)
				result.push({ phrase: this.phrases[i], matches: phraseMatches[i] });

			result.sort(function (a, b) {
				var diff = b.matches - a.matches;
				return diff;// == 0 ? a.phrase.localeCompare(b.phrase) : diff;
			});
			return result;
		}
	};
	for (var i in inputPhrases)
		instance.index(inputPhrases[i]);
	return instance;
};