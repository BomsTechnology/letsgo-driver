import React from 'react';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native'; 




const DayColumn = ({ column, onDayPress, day }: { column: string , day: number,  onDayPress?: (day: number)=> void}) => {
    return (
        <TouchableOpacity  onPress={()=> onDayPress && onDayPress(day)}>
            <View style={styles.column}>
                <Text style={[styles.text]}>
                    {column}
                </Text>
            </View>
        </TouchableOpacity>
    );
};




const DaysHeader = ({ columns, onDayPress }: { columns: string[],  onDayPress?: (day: number)=> void }) => {

    return (
        <View style={styles.columns}>
            {
                columns.map((column, index) =>

                    <DayColumn
                        key={index}
                        onDayPress={onDayPress}
                        column={column} 
                        day={index+1} />

                )
            }
        </View>
    );
};



interface TimetableHeaderProps {

    onDayPress?: (day: number)=> void
}


const TimetableHeader: React.FC<TimetableHeaderProps> = ({onDayPress}) => {

    const columns = ["LUN", "MAR", "MER", "JEU", "VEND", "SAM", "DIM"];

    return (
        <View style={styles.container}>
            <DaysHeader columns={columns} onDayPress={onDayPress} />
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width - 60,
        zIndex: 20,
    },
    columns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 20,
    },
    column: {
        zIndex: 20,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#F8F8F8',
        borderTopWidth: 1,
        borderLeftWidth: 1,
    },
    text: {

        fontSize: 12,
        fontWeight: "700"
    },
});

export default TimetableHeader;



