import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { StyleSheet } from 'react-native'; 



 
const DayColumn = ({ column }: { column: string }) => {
    return (
        <View style={styles.column}>
            <Text style={[styles.text]}>
                {column}
            </Text>
        </View>
    );
};




const DaysHeader = ({ columns }: { columns: string[] }) => {

    return (
        <View style={styles.columns}>
            {
                columns.map((column, index) =>

                    <DayColumn
                        key={index}
                        column={column} />

                )
            }
        </View>
    );
};





const TimetableHeader = () => {

    const columns = ["LUN", "MAR", "MER", "JEU", "VEND", "SAM", "DIM"];

    return (
        <View style={styles.container}>
            <DaysHeader columns={columns} />
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



