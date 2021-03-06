/**
 * This object contains all of the route definitions
 */
var Routes = function(main) {
	routes = {

		// This is the index page view route
		index: function(data) {
			view = main.store.getByName($('.search').val(), function(posts) {
				return new HomeView(main, posts).render().el;
			});

			$('body').html(view);

			snapHandler();
			searchHandler(main);

			$('.refresh').on('click', function() {
				main.store.posts = main.store._reload(true);
			});
		},

		// this is the post page route
		post: function(data) {
			id = Number(data.route.match[1]);
			
			var p;
			view = main.store.getById(id, function(post){
				v =  new PostView(main, post).render().el;
				p = post;
				return v;
			});

			$('body').html(view);

			snapHandler();
			searchHandler(main);

			$('.share').on('click', function() {
				var message = {
					text: '"' + p.title + '" by ' + p.author,
					url: p.permalink, 
					image: p.thumbnail
				};

				window.socialmessage.send(message);
			});
		},

		// This is the route for the gallery view
		gallery: function(data) {
			view = new GalleryView(main, []).render().el;
			$('body').html(view);

			snapHandler();
			searchHandler(main);
			
			$('#slides img').load(function() {
				$('#slides').slidesjs({
					navigation: {
							active: false
						},
						pagination: {
							active: false
						}
				});
			});
			
		}
	};

	return routes;
};

// Code that controls snap.js
function snapHandler() {
	// Snap js stuff
	var snapper = new Snap({
		element: document.getElementById('content'),
		minDragDistance: 50,
		disable: 'right',
		flickThreshold: 5,
		dragger: document.getElementById('slide-region')
	});

	$('#open').on('click', function() {
		if (snapper.state().state == "left") {
			snapper.close();
		} else {
			snapper.open('left');
		}
	});

	$('#close').on('click', function() {
		snapper.close();
	});
}

// Handle the search bar and it's functionality
function searchHandler(main) {
	$('.search').on('change', function() {
		if(window.location.hash == "") {
			main.updateContent();
		} else {
			window.location.hash = "";
		}
	});
}