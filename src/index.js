import { parseString } from 'xml2js';
import axios from 'axios';
import _ from 'lodash';

(async () => {
	const foxRaceWayUrl = 'https://americanmotocrossresults.com/xml/mx/events/M2405SchedRes.xml';
	const raceScheduleUrlPath = 'xml/mx/events/RACE_ID/schedule.pdf';
	const motocrossResultsBaseUrl = 'https://americanmotocrossresults.com';

	const raceIds = ['M2405'];

	const { data: xmlResult } = await axios.get(foxRaceWayUrl);

	const SeriesMap = Object.freeze({
		M: 'mx',
		S: 'sx',
	});

	const GeneralReportsMap = Object.freeze({
		SCHD: { LABEL: 'Schedule', PATH: 'schedule' },
		TMAP: { LABEL: 'Track Map', PATH: 'trackmap' },
		SUPP: { LABEL: 'Supplementary Regulations', PATH: 'suppregs' },
		TLOG: { LABEL: 'Tech Log', PATH: 'techlog' },
	});

	parseString(xmlResult, { mergeAttrs: true, explicitArray: false }, (err, result) => {
		if (err) {
			console.error(err);
			return;
		}

		const raceClasses = _(result.A.B.C.F)
			.map((event) => ({ name: event.CLSNAME, id: event.CLSID, cls: event.CLS }))
			.filter((raceClass) => raceClass.cls !== 'ZZ')
			.uniqBy('id')
			.value();

		const raceId = result.A.B.SANC;
		const series = SeriesMap[raceId.charAt(0)];
		const eventData = {
			raceId,
			raceName: result.A.B.E,
			date: result.A.B.C.D,
			trackName: result.A.B.T,
			trackLocation: result.A.B.L,
			generalReports: _(result.A.B).pick(_.keys(GeneralReportsMap)).map((value, key) => ({
				label: GeneralReportsMap[key].LABEL,
				url: parseInt(value) ? `${motocrossResultsBaseUrl}/xml/${series}/events/${raceId}/${GeneralReportsMap[key].PATH}.pdf` : '',
			})).value(),
			entryLists: _.map(raceClasses, (raceClass) => ({
				className: raceClass.name,
				url: `${motocrossResultsBaseUrl}/xml/${series}/events/${raceId}/${raceClass.cls}ENTRYLIST.PDF`,
			})),
			classes: raceClasses,
			events: _.map(result.A.B.C.F, (event) => ({
				name: event.S,
				className: event.CLSNAME,
				classId: event.CLSID,
				time: event.T,
				links: _.map(event.R, (link) => ({
					name: link.FN,
					url: `${motocrossResultsBaseUrl}/${link.L}`,
				})),
			})),
		};

		console.log(JSON.stringify(eventData));
	});
})();