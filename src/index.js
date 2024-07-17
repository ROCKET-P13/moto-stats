import { xml2js } from 'xml-js';
import axios from 'axios';
import _ from 'lodash';

(async () => {
	const AttributeMap = Object.freeze({
		B: {
			dataKey: 'raceData',
			attributes: {
				E: 'raceName',
				T: 'trackName',
				L: 'location',
				D: 'date',
			},
		},
		C: { dataKey: 'raceData' },
		F: {
			dataKey: 'event',
			dataType: 'array',
			attributes: {
				S: 'eventName',
			},
		},
		R: {
			dataKey: 'eventData',
			dataType: 'object',
			attributes: {
				FN: 'linkLabel',
				L: 'link',
			},
		},
	});
	const foxRaceWayUrl = 'https://americanmotocrossresults.com/xml/mx/events/M2405SchedRes.xml';
	const { data: xmlResult } = await axios.get(foxRaceWayUrl);

	const jsonFromXml = xml2js(xmlResult, {
		elementNameFn: (val) => {
			if (_.some(AttributeMap[val])) {
				return AttributeMap[val].dataKey;
			} else {
				return val;
			}
		},
	});

	function flatten (array) {
		let result = [];
		array.forEach((element) => {
			result.push(element);
			if (Array.isArray(element.elements)) {
				result = result.concat(flatten(element.elements));
			}
		});

		return result;
	}

	const result = flatten(jsonFromXml.elements);
})();