$(function() {

	console.log($) // JQUERY IS WORKING!
	console.log(_) // UNDERSCORE IS WORKING!
	console.log("Ready to code!");

	var $listContainer = $("#list-container");

	var template = _.template($("#list-template").html());


	// var lists = [
	// 	{
	// 		title: "Greatest Albums of All Time",
	// 		category: "Music",
	// 		itemOne: "Sgt. Pepper's Lonely Hearts Club Band - The Beatles",
	// 		itemTwo: "Pet Sounds - The Beach Boys",
	// 		itemThree: "What’s Going On - Marvin Gaye",
	// 		itemFour: "Enter The Wutang (36 Chamers) - Wu-Tang Clan",
	// 		itemFive: "Thriller - Michael Jackson",
	// 		thumbsUp: 12,
	// 		forks: 6,
	// 		Author: "henryfreel"
	// 	},
	// 	{
	// 		title: "Here is another title",
	// 		category: "some other category",
	// 		itemOne: "Item One",
	// 		itemTwo: "Item Two",
	// 		itemThree: "Item Three",
	// 		itemFour: "Item Four",
	// 		itemFive: "Item Five",
	// 		thumbsUp: 12,
	// 		forks: 6,
	// 		Author: "user's name"
	// 	}
	// ];

	$.ajax({
		url: "http://localhost:3000/api/lists",
		type: "GET",
		success: function(data) {

			_.each(data, function(foundList) {
				$listContainer.append(template(foundList));
			});

		}
	});

});