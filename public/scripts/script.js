$(function() {

	var $listsContainer = $("#list-container");

	var listTemplate = _.template($("#list-template").html());

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

	$listTitle.prop('required',true);
	$listGenre.prop('required',true);
	$itemOneInput.prop('required',true);
	$itemTwoInput.prop('required',true);
	$itemThreeInput.prop('required',true);
	$itemFourInput.prop('required',true);
	$itemFiveInput.prop('required',true);

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
		url: "/api/lists",
		type: "GET",
		success: function(data) {

			_.each(data, function(foundList) {
				$listsContainer.prepend(listTemplate(foundList));
			});

		}
	});

	// On New List Modal Show
	$addListModal.on('shown.bs.modal', function () {
		$listTitle.focus();
	})

	$newListForm.on("submit", function(event) {
		event.preventDefault();

		if (!$listGenre.val()) {
			console.log("you need a genre!");

			$("#list-genre-group").addClass("has-error");
			$('#genre-error.collapse').collapse("show")

		} else {

			$addListModal.modal("hide");

			console.log("form submitted");

			// Temporary variables
			var listTitleVal = $listTitle.val();
			var listGenreVal = $listGenre.val();
			var itemOneVal = $itemOneInput.val();
			var itemTwoVal = $itemTwoInput.val();
			var itemThreeVal = $itemThreeInput.val();
			var itemFourVal = $itemFourInput.val();
			var itemFiveVal = $itemFiveInput.val();

			var date = new Date().toLocaleString();

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

			console.log("--> this is the data being sent over to server");
			console.log(listData);

			$.ajax({
				type: "POST",
				url: "/api/lists",
				data: listData,
				success: function(returnedData) {

					console.log("--> this is the returnedData:")
					console.log(returnedData);

					//render on client side
					var $list = $(listTemplate(returnedData));
					$listsContainer.prepend($list);

				},
				error: function() {
					alert("Error, could not post!");
				}

			});

		}

	});

});







