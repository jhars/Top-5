$(function() {

	var $listContainer = $("#list-container");

	var template = _.template($("#list-template").html());

	// Modal Variables
	var $addListModal = $("#add-list-modal");
	var $newListForm = $("#new-list-form");
	var $listTitle = $("#list-title");
	var $listGenre = $("#list-genre-select");
	var $itemOneInput = $("#item-one-input");
	var $itemTwoInput = $("#item-two-input");
	var $itemThreeInput = $("#item-three-input");
	var $itemFourInput = $("#item-four-input");
	var $itemFiveInput = $("#item-five-input");

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

	// On page Load
	$.ajax({
		url: "http://localhost:3000/api/lists",
		type: "GET",
		success: function(data) {

			_.each(data, function(foundList) {
				$listContainer.append(template(foundList));
			});

		}
	});

	// On New List Modal Show
	$addListModal.on('shown.bs.modal', function () {
		$listTitle.focus();
	})

	$newListForm.on("submit", function(event) {
		event.preventDefault();

		$addListModal.modal("hide");

		console.log("form submitted");

		// Temporary variables
		var listTitleVal = $listTitle.val();
		var listGenreVal = $listGenre.val();
		var itemOneVal = $itemOneInput.val();
		var itemTwoVal = $itemTwoInput.val();
		var itemThreeVal = $itemThreeInput.val();
		var itemFourVal = $itemFourInput.val();
		var itemFiveVal = $itemFourInput.val();

		var listData = {
			title: listTitleVal,
			date: date,
			genre: listGenreVal,
			itemOne: itemOneVal,
			itemTwo: itemTwoVal,
			itemThree: itemThreeVal,
			itemFour: itemFourVal,
			itemFive: itemFiveVal,
			thumbsUp: 0,
			forks: 0,
			author: "author name"
		};

	});

});







