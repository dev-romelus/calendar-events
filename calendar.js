((root) => {

	const divEvents = document.querySelector('.events');

	const calendar = events => {
		let allEvents = [];

		/* 
		 *	Itérations sur une liste d'événement
		 *	Ajout de nouvele propriété et valeur
		 */
		for (let i = 0, l = events.length; i < l; i++) {
			let event = events[i];
			let start = event.start.split(':');
			let startTime = +start.join('');

			event.start = startTime;
			event.end = startTime + event.duration
			event.top = event.start;
			event.left = 0;
			event.width = parent.innerWidth;
			event.collisions = [];

			allEvents.push(event);
		}

		/*
		 *	Recherche des évenement qui se chevauchent
		 * 	Itération infini pour testé tous les cas de collision
		 *	
		 */
		while (allEvents.length > 0) {
			let event = allEvents.pop();

			for (let j = 0; j < allEvents.length; j++) {
				let otherEvent = allEvents[j];

				if (collidesWith(event, otherEvent)) {
					event.collisions.push(otherEvent);
					otherEvent.collisions.push(event);
				}
			}
		}

		// tri des évévenement du plus petit au plus grand
		let sortedEvents = _.sortBy(events, (event) => {
			return event.collisions.length;
		});

		// Calculer la largeur et la position gauche de l'événement en fonction du nombre de collisions.
		while (sortedEvents.length > 0) {
			// itération des événement les élevés 
			let event = sortedEvents.pop();

			/* 
			 *	Calcule de la largeur de chaque événement
			 *	Si un événement a est en collision a 1 un autre événement il sera divisé par 2 de la largeur de l'écran
			 */
			event.width = parent.innerWidth / (event.collisions.length + 1);
			let otherLeft = event.width;

			// Itération des événement rentrant en collision
			_.each(event.collisions, otherEvent => {
				otherEvent.width = event.width;
				otherEvent.left = otherLeft;
				otherLeft += event.width;

				// Trouver les événements qui se chevauche
				findEvent(sortedEvents, otherEvent.id);
			});
		}

		return events;
	};

	// Retire l'ID de l'événement dans sa propre liste de collision
	const findEvent = (events, id) => {
		for (let i = 0, l = events.length; i < l; i++) {
			if (events[i].id == id) {
				events.splice(i, 1);
				break;
			}
		}
	};


	const collidesWith = (event1, event2) => {

		// Test pour savoir si certain événememt se chevauche 
		if ((event1.start <= event2.start && event1.end >= event2.start) ||
			(event1.start <= event2.end && event1.end >= event2.end)) {
			return true;
		}

		return false;
	};

	let container = createDiv('div');

	const renderEvent = (id, top, left, height, width) => {
		let event = $(`<div id=${id}>#${id}</div>`).addClass('event').css({
			top: top,
			left: left,
			height: height,
			width: width
		});
		container.append(event);
	};

	// Fonction permettant d'afficher les événement dans le navigateur
	const renderEvents = () => {
		divEvents.innerHTML = container.html();
	};

	function createDiv(name) {
		//document.createElement('').appendChild(doc.createElement('b'));
		return $(document.createElement(name));
	};

	root.app = {
		calendar: calendar,
		renderEvent: renderEvent,
		renderEvents: renderEvents
	};

})(this);

(() => {

	const events = [{
			"id": 1,
			"start": "17:00",
			"duration": 60
		},
		{
			"id": 2,
			"start": "17:00",
			"duration": 120
		},
		{
			"id": 3,
			"start": "19:40",
			"duration": 10
		},
		{
			"id": 4,
			"start": "15:00",
			"duration": 20
		},
		{
			"id": 5,
			"start": "18:00",
			"duration": 60
		},
		{
			"id": 6,
			"start": "10:25",
			"duration": 35
		},
		{
			"id": 7,
			"start": "10:45",
			"duration": 30
		},
		{
			"id": 8,
			"start": "17:00",
			"duration": 60
		},
		{
			"id": 9,
			"start": "10:00",
			"duration": 30
		},
		{
			"id": 10,
			"start": "11:50",
			"duration": 20
		},
		{
			"id": 11,
			"start": "19:00",
			"duration": 60
		},
		{
			"id": 12,
			"start": "09:00",
			"duration": 45
		},
		{
			"id": 13,
			"start": "14:45",
			"duration": 60
		},
		{
			"id": 14,
			"start": "19:20",
			"duration": 10
		},
		{
			"id": 15,
			"start": "11:50",
			"duration": 30
		},
		{
			"id": 16,
			"start": "11:40",
			"duration": 40
		},
		{
			"id": 17,
			"start": "14:00",
			"duration": 30
		}
	];

	window.onload = (() => {

		app.calendar(events).forEach(event => {
			app.renderEvent(+event.id, +event.top, +event.left, +event.duration, +event.width);
		});

		app.renderEvents();

	});

})();
