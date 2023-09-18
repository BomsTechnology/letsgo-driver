import React, { Component, LegacyRef } from 'react'; 
import {
	View,
	ScrollView,
	Text,
} from 'react-native';
import moment from 'moment';
import { setLocale, assignColor, genTimeBlock } from '../../utils/utils';

import { Dimensions, StyleSheet } from 'react-native';
import { TimetableEntry } from './TimetableEntry';
import TimetableEntryList, { ROW_HEIGHT } from './TimetableEntryList';
import TimetableHeader from './TimetableHeader';



const { width: SCREEN_WIDTH } = Dimensions.get('window');


export type TimetableViewProps = {

	scrollViewRef: LegacyRef<ScrollView> | undefined;

	pivotDate?: Date,
	pivotTime: number,
	pivotEndTime: number,
	locale: string, 
	dateHeaderFormat?: string,
	entries: TimetableEntry[],
	onEventPress?: (entry: TimetableEntry) => void
}


export const TimetableView: React.FC<TimetableViewProps> = (props) => {

	const currentDate = props.pivotDate;
	const { pivotTime, pivotEndTime } = props;
	let calendar = null;
	setLocale(props.locale);



	const genTimes = (pivotTime: number, endPivotTime: number) => {

		const times = [];
		for (let i = pivotTime; i < 24; i += 1) {
			times.push(i);
		}

		for (let i = 0; i < pivotTime; i += 1) {
			times.push(i);
		}

		return times;
	};

	const times = genTimes(pivotTime, pivotEndTime);
	const events = assignColor(props.entries);

	// const dates = this.prepareDates(currentMoment, nDays);
	const date = moment(currentDate);
	return (
		<View style={styles.container}>
			 
			<View style={styles.header}>
 				<TimetableHeader/>
			</View>

			<ScrollView ref={props.scrollViewRef}>

				<View style={styles.scrollViewContent}>

					<View style={styles.timeColumn}>
						{times.map(time => (
							<View key={time} style={styles.timeLabel}>
								<Text style={styles.timeText}>{time} h</Text>
							</View>
						))}
					</View>


					<View
						style={styles.eventsContainer}
					>
						<TimetableEntryList
							pivotTime={pivotTime}
							times={times}
							selectedDate={date.toDate()} 
							onEntryPress={props.onEventPress}
							entries={events}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollViewContent: {
		flexDirection: 'row',
	},
	header: {
		height: 42,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeLabel: {
		flex: -1,
		height: ROW_HEIGHT,
	},
	timeText: {
		fontSize: 13,
		textAlign: 'center',
		padding: 5,
	},
	timeColumn: {
		paddingTop: 4,
	},
	eventsContainer: {
		flex: 1, 
		width: SCREEN_WIDTH - 50,
	},
});

