export default {
	title: 'SNCF.JS',
	description: 'a JavaScript library that allows you to easily use the ©SNCF api.',
	base: '/SNCF.js/',
	logo: '/favicon.ico',
	outDir: '../docs/',
	srcDir: './',
	lang: 'en-US',
	lastUpdated: true,
	markdown: { attrs: { disable: true } },
	themeConfig: {
		lastUpdatedText: 'Updated Date',
		search: {
			provider: 'local'
		},
		editLink: {
			pattern: 'https://github.com/Alexis06030631/SNCF.js/edit/main/docs-src/:path',
			text: 'Edit this page on GitHub'
		},
		sidebar: [
			{
				text: 'Propreties',
				items: [
					{ text: 'Client', link: '/api/sncf.js.client.html' }
				],
			},
			{
				text: 'Managers',
				items: [
					{ text: 'SearchManager', link: '/api/sncf.js.searchmanager.html' },
					{ text: 'DisruptionManager', link: '/api/sncf.js.disruptionmanager.html' },
					{ text: 'JourneyManager', link: '/api/sncf.js.journeymanager.html' },
					{ text: 'LineManager', link: '/api/sncf.js.linemanager.html' },
					{ text: 'PlacesManager', link: '/api/sncf.js.placesmanager.html' },
				],
			},
			{
				text: 'Structures',
				items: [
					{ text: 'AdministrativeRegion', link: '/api/sncf.js.administrativeregion.html' },
					{ text: 'Arrival', link: '/api/sncf.js.arrival.html' },
					{ text: 'Calendar', link: '/api/sncf.js.calendar.html' },
					{ text: 'Departure', link: '/api/sncf.js.departure.html' },
					{ text: 'Disruption', link: '/api/sncf.js.disruption.html' },
					{ text: 'Journey', link: '/api/sncf.js.journey.html' },
					{ text: 'Line', link: '/api/sncf.js.line.html' },
					{ text: 'Route', link: '/api/sncf.js.route.html' },
					{ text: 'Step', link: '/api/sncf.js.step.html' },
					{ text: 'StopArea', link: '/api/sncf.js.stoparea.html' },
					{ text: 'StopStep', link: '/api/sncf.js.stopstep.html' },
					{ text: 'StopTime', link: '/api/sncf.js.stoptime.html' },
					{ text: 'Vehicle', link: '/api/sncf.js.vehicle.html' }
				],
			}
		],
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/Alexis06030631/SNCF.js/',
			},
			{
				icon: 'instagram',
				link: 'https://www.instagram.com/leko_system/',
			}
		],
	},
};
