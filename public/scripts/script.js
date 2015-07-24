$(function() {

	var $listsContainer = $("#list-container");

	// Tooltips
	$('[data-toggle="tooltip"]').tooltip()

	$("#logged-in-success").addClass('hide');
	$("#logged-out-warning").addClass('hide');
	$("#signed-in-success").addClass('hide');

	var listTemplate = _.template($("#list-template").html());

	$("#sign-up-email").prop('required', true);
	$("#sign-up-username").prop('required', true);
	$("#sign-up-password").prop('required', true);

	$("#log-in-email").prop('required', true);
	$("#log-in-password").prop('required', true);

	$("#list-title").prop('required',true);
	$("#list-genre-select").prop('required',true);
	$("#item-one-input").prop('required',true);
	$("#item-two-input").prop('required',true);
	$("#item-three-input").prop('required',true);
	$("#item-four-input").prop('required',true);
	$("#item-five-input").prop('required',true);

	var editId;

	// Check if user is logged in

	// $.get('/api/me', function(data) {
	// 	console.log(data);
	// })

	var loggedOut = function () {

		$("#username").text("");
		$("#sign-up-button").removeClass('hide');
		$("#log-in-button").removeClass('hide');
		$("#log-out-button").addClass('hide');
		$("#new-list-button").attr( "disabled", "disabled" );
		$("#logged-out-help").hide();
		
	}

	var loggedIn = function () {

		$("#sign-up-button").addClass('hide');
		$("#log-in-button").addClass('hide');
		$("#log-out-button").removeClass('hide');
		$("#new-list-button").attr( "disabled", false );
		$("#logged-out-help").addClass('hide');
	}

	// - - - - - - - - - - PAGE LOAD - - - - - - - - - - //

	$.ajax({
		url: "/api/lists",
		type: "GET",
		success: function(data) {

			_.each(data, function(foundList) {
				$listsContainer.prepend(listTemplate(foundList));
			});

			checkUser();

		}
	});

	var checkUser = function() {

		$.ajax({
			url: '/api/me',
			type: "GET",
			success: function (data) {

				console.log("--> this should be the logded in user:");
				console.log(data);

				if (data) {

					for (i = 0; i < $(".edit-list-button").length; i++) {

						var pencil = $(".edit-list-button")[i];

						$(pencil).addClass('hide');

						var panel = pencil.closest(".panel");
						var panelId = $(panel).data("id");

						if (data.lists.indexOf(panelId) > -1) {
							$(pencil).removeClass('hide');
						}

					}

					$("#username").text(data.username);

					loggedIn();

				} else {

					for (i = 0; i < $(".edit-list-button").length; i++) {

						$($(".edit-list-button")[i]).addClass('hide');
					}

					loggedOut();
				}

			},
			error: function () {

				console.log("Error, could not GET username");
			}
		});

	}

	// - - - - - - - - - - SIGN UP - - - - - - - - - - //

	// Sign Up Modal Show
	$("#sign-up-modal").on("shown.bs.modal", function () {
		$("#sign-up-email").focus();
	});

	// Sign Up Modal Hide
	$("#sign-up-modal").on('hidden.bs.modal', function(){
	    $(this).find('form')[0].reset();
	});

	// Sign Up Submit
	$("#sign-up-form").on("submit", function (event) {
		event.preventDefault();

		var newUserObj = {
			email: $("#sign-up-email").val(),
			username: $("#sign-up-username").val(),
			password: $("#sign-up-password").val()
		}

		console.log(newUserObj);

		$("#sign-up-modal").modal("hide");

		$.ajax({
			url: "/api/users",
			type: "POST",
			data: newUserObj,
			success: function (data) {
				
				console.log("--> this is new signed up user")
				console.log(data);

				for (i = 0; i < $(".edit-list-button").length; i++) {

					var pencil = $(".edit-list-button")[i];

					$(pencil).addClass('hide');

					var panel = pencil.closest(".panel");
					var panelId = $(panel).data("id");

					if (data.lists.indexOf(panelId) > -1) {
						$(pencil).removeClass('hide');
					}

				}

				$("#username").text(data.username);

				$("#signed-in-success").removeClass('hide');
				loggedIn();

				$("#username").text(data.username);
				loggedIn();
			},
			error: function () {
				console.log("Error, could not post new User!");
			}
		});

	});

	// - - - - - - - - - - LOG IN - - - - - - - - - - //

	// Sign Up Modal Show
	$("#log-in-modal").on("shown.bs.modal", function () {
		$("#log-in-email").focus();
	});

	// Sign Up Modal Hide
	$("#log-in-modal").on('hidden.bs.modal', function(){
	    $(this).find('form')[0].reset();
	});

	$("#log-in-form").on('submit', function (event) {
		event.preventDefault();

		var loginUserObj = {
			email: $("#log-in-email").val(),
			password: $("#log-in-password").val()
		}

		$("#log-in-modal").modal("hide");

		$.ajax({
			url: '/login',
			type: "POST",
			data: loginUserObj,
			success: function (data) {

				console.log("--> this is logged in user")
				console.log(data);

				for (i = 0; i < $(".edit-list-button").length; i++) {

					var pencil = $(".edit-list-button")[i];

					$(pencil).addClass('hide');

					var panel = pencil.closest(".panel");
					var panelId = $(panel).data("id");

					if (data.lists.indexOf(panelId) > -1) {
						$(pencil).removeClass('hide');
					}

				}

				$("#username").text(data.username);

				$("#logged-in-success").removeClass('hide');

				loggedIn();

			},
			error: function () {
				console.log("Error, could not log in");
			}
		});
	});

	// - - - - - - - - - - LOG OUT - - - - - - - - - - //

	$("#log-out-button").on('click', function (event) {
		event.preventDefault();

		console.log("you clicked the button!")

		$.ajax({
			url: '/logout',
			type: 'GET',
			success: function (data) {

				for (i = 0; i < $(".edit-list-button").length; i++) {

					$($(".edit-list-button")[i]).addClass('hide');
				}

				$("#logged-out-warning").removeClass('hide');
				loggedOut();

			},
			error: function () {

			}
		});

	});

	// - - - - - - - - - - NEW LIST - - - - - - - - - - //

	// On New List Modal Show
	$("#add-list-modal").on("shown.bs.modal", function () {
		$("#list-title").focus();
	})

	// On New List Modal Hide
	$("#add-list-modal").on("hidden.bs.modal", function () {
		$(this).find('form')[0].reset();
	})

	$("#new-list-form").on("submit", function(event) {
		event.preventDefault();

		if (!$("#list-genre-select").val()) {

			$("#list-genre-group").addClass("has-error");
			$('#genre-error.collapse').collapse("show")

		} else {

			$("#add-list-modal").modal("hide");

			// Temporary variables
			var listTitleVal = $("#list-title").val();
			var listGenreVal = $("#list-genre-select").val();
			var itemOneVal = $("#item-one-input").val();
			var itemTwoVal = $("#item-two-input").val();
			var itemThreeVal = $("#item-three-input").val();
			var itemFourVal = $("#item-four-input").val();
			var itemFiveVal = $("#item-five-input").val();

			var date = new Date().toLocaleString();

			var currentUser;

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
				author: "author on the client side"
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

				$("#edit-list-title").val(data.title);
				$("#edit-list-genre-select").val(newGenre);
				$("#edit-item-one-input").val(data.itemOne);
				$("#edit-item-two-input").val(data.itemTwo);
				$("#edit-item-three-input").val(data.itemThree);
				$("#edit-item-four-input").val(data.itemFour);
				$("#edit-item-five-input").val(data.itemFive);

			},
				error: function() {
					alert("Error!");
			}
		});

	});


	$("#edit-list-form").on("submit", function (event) {
		event.preventDefault();

		$("#edit-list-modal").modal("hide");

		var editDate = "editted on " + new Date().toLocaleString();

		// find the post
		var $editNewList = ($("#list-" + editId)[0]);

		// find the name
		var $editListNewTitle = ($("> .panel-heading > .panel-title > .list-title", $editNewList));
		$editListNewTitle.text($("#edit-list-title").val());

		// find the genre
		var $editListNewGenre = ($("> .panel-heading > .panel-title > .list-genre", $editNewList));
		$editListNewGenre.text($("#edit-list-genre-select").val());

		// find the date
		var $editNewListDate = ($("> .panel-heading > .list-date", $editNewList));
		$editNewListDate.text(editDate);

		// find the items
		var $editNewListItemOne = ($("> .list-group > .list-item-one-content", $editNewList));
		$editNewListItemOne.text($("#edit-item-one-input").val());

		var $editNewListItemTwo = ($("> .list-group > .list-item-two-content", $editNewList));
		$editNewListItemTwo.text($("#edit-item-two-input").val());

		var $editNewListItemThree = ($("> .list-group > .list-item-three-content", $editNewList));
		$editNewListItemThree.text($("#edit-item-three-input").val());

		var $editNewListItemFour = ($("> .list-group > .list-item-four-content", $editNewList));
		$editNewListItemFour.text($("#edit-item-four-input").val());

		var $editNewListItemFive = ($("> .list-group > .list-item-five-content", $editNewList));
		$editNewListItemFive.text($("#edit-item-five-input").val());

		var editListObj = {
			title: $("#edit-list-title").val(),
			genre: $("#edit-list-genre-select").val(),
			date: editDate,
			itemOne: $("#edit-item-one-input").val(),
			itemTwo: $("#edit-item-two-input").val(),
			itemThree: $("#edit-item-three-input").val(),
			itemFour: $("#edit-item-four-input").val(),
			itemFive: $("#edit-item-five-input").val()
		}

		$.ajax({
			url: "/api/lists/" + editId,
			type: "PUT",
			data: editListObj,
			success: function (returnedData) {

				

			},
			error: function () {
				console.log("Error, could not PUT new list")
			}
		});

	});

	$("#delete-list").on("click", function (event) {

		// hide the modal
		$("#edit-list-modal").modal("hide");

		$.ajax({
			url: "/api/lists/" + editId,
			type: "DELETE",
			success: function(data) {

				// remove deleted phrase from view
		        $('#list-' + editId).remove();
			},
				error: function() {
					alert("Error!");
			}
		});

	});



});





















