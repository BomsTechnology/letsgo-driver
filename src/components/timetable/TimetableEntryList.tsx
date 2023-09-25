import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View } from 'react-native';
import moment from 'moment';
import { StyleSheet } from 'react-native';

 
import TimetableEntryView, { TimetableEntry, TimetableEntryProp } from './TimetableEntry';

const TIME_LABELS_COUNT = 24;
const { width: screenWidth } = Dimensions.get('window');

const GREY_COLOR = '#E9EDF0';
const ROW_HEIGHT = 60;
export { ROW_HEIGHT };
export const CONTENT_OFFSET = 0;

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
const CONTENT_HEIGHT = ROW_HEIGHT * TIME_LABELS_COUNT;
const TIME_LABEL_WIDTH = 60;
const EVENTS_CONTAINER_WIDTH = screenWidth - TIME_LABEL_WIDTH;



export type TimetableEntryListProps = {

	entries: TimetableEntry[], 
	pivotTime: number,
	selectedDate: Date,
	times: number[],
	onEntryPress?: (entry: TimetableEntry) => void,
}





export const TimetableEntryList: React.FC<TimetableEntryListProps> = (props) => {


	const onEntryPress = (entry: TimetableEntry) => {
		if (props.onEntryPress) {
			props.onEntryPress(entry);
		}
	};



	const catEventsByDays = (nDays: number, entries: TimetableEntry[], selectedDate: Date) => {
		// total stores events in each day of nDays
		// example: [[event1, event2], [event3, event4], [event5]], each child array
		// is events for specific day in range
		const total = [];
		let initial = 0;
		
		for (let i = initial; i < (nDays + initial); i += 1) {
			// current date in nDays, calculated from selected date
			const currenDate = moment(selectedDate).add(i, 'd');

			// filter events that have startTime/endTime in current date
			let filteredEvents = entries.filter((item) => {
				return currenDate.isSame(item.startTime, 'day') || currenDate.isSame(item.endTime, 'day');
			});

			filteredEvents = filteredEvents.map((item) => {
				let { startTime } = item;
				// if endTime is in next day, set starDate to begin time of current date (00:00)
				if (!currenDate.isSame(startTime, 'day')) {

					// 1
					startTime = currenDate.startOf('day').toDate();
				}
				return {
					...item,
					startTime,
				};
			});
			total.push(filteredEvents);
		}
		return total;
	};

	const calcEventStyle = (item: TimetableEntry) => {
		/**
		 * TODO: gotta reduce topOffset value in order to pull events upper (it should be go together with left time label)
		 * @type {number}
		 */
		const { pivotTime } = props;
		const startHours = moment(item.startTime).hours() - pivotTime;
		const startMinutes = moment(item.startTime).minutes();
		const totalStartMinutes = (startHours * MINUTES_IN_HOUR) + startMinutes;
		const topOffset = (totalStartMinutes * CONTENT_HEIGHT) / MINUTES_IN_DAY;
		const height = (moment(item.endTime).diff(item.startTime, 'minutes') * CONTENT_HEIGHT) / MINUTES_IN_DAY;
		const width = getEventItemWidth();

		return {
			top: topOffset + CONTENT_OFFSET,
			left: 0,
			height,
			width,
		};
	};



	const adjustEventStyle = (totalEvents: TimetableEntry[][]) => {
		const itemWidth = getEventItemWidth();
		return totalEvents.map((events) => {
			// get position and width for each event
			return events.reduce<TimetableEntryProp[]>((eventsAcc, event, i) => {
				let numberOfDuplicate = 1;
				const style = calcEventStyle(event);
				// check if previous events have the same position or not,
				// start from 0 to current index of event item
				for (let j = 0; j < i; j += 1) {
					const previousEvent = eventsAcc[j];
					// if left and top of previous event collides with current item,
					// move current item to the right and update new width for both
					const foundDuplicate = previousEvent.style.left === style.left
						&& previousEvent.style.top + previousEvent.style.height > style.top;

					if (foundDuplicate) {
						numberOfDuplicate += 1;
						style.left = 5 + (itemWidth / numberOfDuplicate);
						style.width = itemWidth / numberOfDuplicate;
						previousEvent.style.width = itemWidth / numberOfDuplicate;
					}
				}
				eventsAcc.push({
					entry: event,
					style,
				});
				return eventsAcc;
			}, []);
		});
	};



	const getEventItemWidth = () => {
		return EVENTS_CONTAINER_WIDTH / 7;
	};


	const sortEventsByDate = (events: TimetableEntry[]) => {
		return events.slice(0)
			.sort((a, b) => {
				return moment(a.startTime)
					.diff(b.startTime, 'minutes');
			});
	};


 


	const sortedEvents = sortEventsByDate(props.entries);
	let totalEvents = catEventsByDays(7, sortedEvents, props.selectedDate);
	const totalStyleEvents = adjustEventStyle(totalEvents);



	return (
		<View style={styles.container}>
			{props.times.map((time, i) => (
				<View key={i} style={styles.timeRow}>
					<View style={styles.timeLabelLine} />
				</View>
			))}
			<View style={styles.events}>
				{totalStyleEvents.map((eventsInSection, sectionIndex) => (
					<View
						key={sectionIndex}
						style={styles.event}
					>
						{eventsInSection.map(item => (
							<TimetableEntryView 
								entry={item.entry}
								style={item.style}
								onPress={onEntryPress}
							/>
						))}
					</View>
				))}
			</View>
		</View>
	);

}
 




const styles = StyleSheet.create({
	container: {
		paddingTop: CONTENT_OFFSET,
	},
	timeRow: {
		flex: 0,
		height: ROW_HEIGHT,
	},
	timeLabelLine: {
		height: 1,
		backgroundColor: GREY_COLOR,
		position: 'absolute',
		right: 0,
		left: 0,
	},
	event: {
		flex: 1,
		overflow: 'hidden',
		borderColor: GREY_COLOR,
		borderLeftWidth: 1,
	},
	events: {
		position: 'absolute',
		flexDirection: 'row',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		backgroundColor: 'transparent',
	},
});










export default TimetableEntryList;