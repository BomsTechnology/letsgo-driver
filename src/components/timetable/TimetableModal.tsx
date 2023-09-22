import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { TimetableEntry } from './TimetableEntry';
import { Ionicons } from "@expo/vector-icons";
import Colors from '@constants/colors';
import TimePicker from '@components/inputFields/TimePicker';
import { FAB } from 'react-native-paper';

export type TimeEntryModalProps = {

    visible: boolean,
    entries?: TimetableEntry[],
    onDayEntryChange?: (entries: TimetableEntry[]) => void,
    setVisible: (state: boolean) => void

}


export type TimeEntryModalItemProps = {

    entry?: TimetableEntry,
    onEntryChange?: (entry: TimetableEntry) => void,

}



const TimeEntryModalItem: React.FC<TimeEntryModalItemProps> = ({ entry, onEntryChange }) => {


    const [startTime, setStartTime] = useState<Date>(entry?.startTime || new Date());
    const [endTime, setEndTime] = useState<Date>(entry?.endTime || new Date());


    useEffect(() => {

        onEntryChange && onEntryChange({ ...entry!, "startTime": startTime, "endTime": endTime })

    }, [startTime, endTime])


    return (
        <View style={styles.entryContainer}>
            <Text style={{ fontWeight: "700" }}>Heure De Debut </Text>
            <TimePicker bgColor='white' date={startTime} setDate={setStartTime} />
            <Text style={{ fontWeight: "700" }}>Heure De Fin </Text>
            <TimePicker bgColor='white' date={endTime} setDate={setEndTime} />
        </View>
    );
}


const TimeEntryModal: React.FC<TimeEntryModalProps> = (props) => {

    const [entries, setEntries] = useState(props.entries || [])


    const onEntryChange = (entry: TimetableEntry) => {

        setEntries([...entries, entry])
    }

    return (
        <Modal animationType={"slide"} transparent={true} visible={props.visible}>
{/*             <FAB
                icon="plus"
                style={{
                    zIndex: 300,
                    position: 'absolute',
                    margin: 16,
                    right: 10,
                    bottom: 120,
                    backgroundColor: Colors.primaryColor
                }}
                onPress={() => 2 }
            /> */}

            <View style={styles.container}>

                <View style={styles.closeButton}>
                    <TouchableOpacity style={{ zIndex: 50 }}
                        onPress={() => props.setVisible(false)}
                    >
                        <Ionicons name="close" size={30} color={"white"} />
                    </TouchableOpacity>
                </View>


                <View style={styles.timeContainer}>
                    <FlatList
                        data={props.entries}
                        keyExtractor={(itm, index) => index + ""}
                        ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
                        renderItem={(info) => <TimeEntryModalItem
                            key={info.index}
                            entry={info.item}
                            onEntryChange={onEntryChange}
                        />}>
                    </FlatList>
                    <View>
                        <TouchableOpacity style={{
                            zIndex: 150,
                            width: 200,
                            padding: 10,
                            borderRadius: 10,
                            margin: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 4,
                            backgroundColor: Colors.primaryColor
                        }}
                            onPress={() => {
                                props.onDayEntryChange && props.onDayEntryChange(entries);
                                props.setVisible(false)
                            }}
                        >
                            <Text style={{
                                fontSize: 15,
                                fontFamily: 'Poppins_600SemiBold',
                            }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </Modal>
    );

}



export default TimeEntryModal;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, .7)",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    entryContainer: {

        borderRadius: 12,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 7
    },
    timeContainer: {

        height: "80%",
        width: "90%",
        borderRadius: 12,
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 7
    },
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20
    },



    shadowProp: {
        shadowColor: '#171717',
        elevation: 4,
        backgroundColor: Colors.whiteTone1,
        borderRadius: 10
    },
    container_NORMAL: {
        borderColor: Colors.grayTone4,
    },
    container_GOOD: {
        borderColor: Colors.primaryColor,
    },
    container_ERROR: {
        borderColor: 'red',
    },
    text: {
        color: Colors.grayTone1,
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
    },
    desc: {
        fontSize: 12,
        fontFamily: 'Poppins_300Light',
        marginTop: 5
    },
    boxContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        height: '50%',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text_ERROR: {
        color: 'red',
        alignSelf: 'stretch',
    },
});