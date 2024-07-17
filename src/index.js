import { parseString } from 'xml2js';
import axios from 'axios';
import _ from 'lodash';

(async () => {
	const foxRaceWayUrl = 'https://americanmotocrossresults.com/xml/mx/events/M2405SchedRes.xml';
	const { data: xmlResult } = await axios.get(foxRaceWayUrl);

	parseString(xmlResult, { mergeAttrs: true, explicitArray: false }, (err, result) => {
		if (err) {
			console.error(err);
			return;
		}

		const eventData = {
			raceName: result.A.B.E,
			date: result.A.B.C.D,
			trackName: result.A.B.T,
			trackLocation: result.A.B.L,
			events: _.map(result.A.B.C.F, (event) => ({
				name: event.S,
				className: event.CLSNAME,
				links: _.map(event.R, (link) => ({
					name: link.FN,
					url: link.L,
				})),
			})),
		};

		console.log(JSON.stringify(eventData));
	});
})();