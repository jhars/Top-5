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

	// Edit List Variables
	var $editListButton = $(".edit-list-buttom")
	var $editListModal = $("#edit-list-modal");
	var $editListForm = $("#edit-list-form");
	var $editListTitle = $("#edit-list-title");
	var $editListGenre = $("#edit-list-genre-select");
	var $editItemOneInput = $("#edit-item-one-input");
	var $editItemTwoInput = $("#edit-item-two-input");
	var $editItemThreeInput = $("#edit-item-three-input");
	var $editItemFourInput = $("#edit-item-four-input");
	var $editItemFiveInput = $("#edit-item-five-input");
	var $deleteList = $("#delete-list");

	var editId;

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

			$("#list-genre-group").addClass("has-error");
			$('#genre-error.collapse').collapse("show")

		} else {

			$addListModal.modal("hide");

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

			$.ajax({
				type: "POST",
				url: "/api/lists",
				data: listData,
				success: function(returnedData) {

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

	// On Edit List Button [pencil glyphicon] Clicked
	$listsContainer.on("click", ".edit-list-button", function (event) {
		event.preventDefault();

		editId = $(this).closest(".panel").data("id")

		$.ajax({
			url: "/api/lists/" + editId,
			type: "GET",
			success: function(data) {

				var newGenre = data.genre.toLowerCase();

				$editListTitle.val(data.title);
				$editListGenre.val(newGenre);
				$editItemOneInput.val(data.itemOne);
				$editItemTwoInput.val(data.itemTwo);
				$editItemThreeInput.val(data.itemThree);
				$editItemFourInput.val(data.itemFour);
				$editItemFiveInput.val(data.itemFive);

			},
				error: function() {
					alert("Error!");
			}
		});

	});


	$editListForm.on("submit", function (event) {
		event.preventDefault();

		$editListModal.modal("hide");

		var editDate = "editted on " + new Date().toLocaleString();

		// find the post
		var $editNewList = ($("#list-" + editId)[0]);

		// find the name
		var $editListNewTitle = ($("> .panel-heading > .panel-title > .list-title", $editNewList));
		$editListNewTitle.text($editListTitle.val());

		// find the genre
		var $editListNewGenre = ($("> .panel-heading > .panel-title > .list-genre", $editNewList));
		$editListNewGenre.text($editListGenre.val());

		// find the date
		var $editNewListDate = ($("> .panel-heading > .list-date", $editNewList));
		$editNewListDate.text(editDate);

		// find the items
		var $editNewListItemOne = ($("> .list-group > .list-item-one", $editNewList));
		$editNewListItemOne.text($editItemOneInput.val());

		var $editNewListItemTwo = ($("> .list-group > .list-item-two", $editNewList));
		$editNewListItemTwo.text($editItemTwoInput.val());

		var $editNewListItemThree = ($("> .list-group > .list-item-three", $editNewList));
		$editNewListItemThree.text($editItemThreeInput.val());

		var $editNewListItemFour = ($("> .list-group > .list-item-four", $editNewList));
		$editNewListItemFour.text($editItemFourInput.val());

		var $editNewListItemFive = ($("> .list-group > .list-item-five", $editNewList));
		$editNewListItemFive.text($editItemFiveInput.val());

		var editListObj = {
			title: $editListTitle.val(),
			genre: $editListGenre.val(),
			date: editDate,
			itemOne: $editItemOneInput.val(),
			itemTwo: $editItemTwoInput.val(),
			itemThree: $editItemThreeInput.val(),
			itemFour: $editItemFourInput.val(),
			itemFive: $editItemFiveInput.val()
		}

		$.ajax({
			url: "/api/lists/" + editId,
			type: "PUT",
			data: editListObj,
			success: function (data) {

			},
			error: function () {
				console.log("Error, could not PUT new list")
			}
		});

	});

	$deleteList.on("click", function (event) {

		

	});



});





















