import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { TimetableEntry } from './TimetableEntry';
import { Ionicons } from "@expo/vector-icons";
import Colors from '@constants/colors';
import TimePicker from '@components/inputFields/TimePicker';

export type TimeEntryModalProps = {

    visible: boolean,
    entry?: TimetableEntry,
    setTimeTableEntry: (entry: TimetableEntry) => void,
    setVisible: (state: boolean) => void

}


const TimeEntryModal: React.FC<TimeEntryModalProps> = (props) => {

    const [startTime, setStartTime] = useState<Date>(props.entry?.startTime || new Date());
    const [endTime, setEndTime] = useState<Date>(props.entry?.endTime || new Date());

    
    useEffect(() => {

        props.setTimeTableEntry({...props.entry!, "startTime": startTime, "endTime": endTime})
       
    }, [startTime, endTime])
    


    return (
        <Modal animationType={"slide"} transparent={true} visible={props.visible}>
            <View style={styles.container}>

                <View style={styles.closeButton}>
                    <TouchableOpacity style={{ zIndex: 50 }}
                        onPress={() => props.setVisible(false)}
                    >
                        <Ionicons name="close" size={30} color={"white"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={{fontWeight: "700"}}>Heure De Debut </Text>
                    <TimePicker bgColor='white' date={startTime} setDate={setStartTime} />
                    <Text style={{fontWeight: "700"}}>Heure De Fin </Text>
                    <TimePicker bgColor='white' date={endTime} setDate={setEndTime} />
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
    timeContainer: {

        height: "40%",
        width: "90%",
        borderRadius: 12,
        padding: 20,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between"
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