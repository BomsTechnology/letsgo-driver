import Colors from '@constants/colors';
import { TaskType, TaskProps, TaskStatus } from '../types/TaskProps';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";



const getTaskStatusColor = (taskStatus: TaskStatus) => {

    switch (taskStatus) {

        case "ABORTED":
            return "red";
        case "ONGOING":
            return "orange";
        case "EXECUTED":
            return "green";
        case "SCHEDULED":
            return "blue";
        case "UNCONFIRMED":
            return "grey";
        default:
            return "grey";
    }

}



const getTaskTypeIconName = (taskType: TaskType) => {

    switch (taskType) {

        case "COURSE":
            return "red";
        case "DEPOT":
            return "orange";
        case "COLLECT":
            return "green";
        case "OTHER":
            return "blue";
        default:
            return "grey";
    }
}


export const parseHour = (date: Date) => {
    let distance = Math.abs(date.getTime() - new Date(Date.parse('2012-01-26T00:00:00.0+01:00')).getTime());;
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    return `${hours}:${('0' + minutes).slice(-2)}`;
};




const Task: React.FC<TaskProps> = (props) => {

    const fromHour = props.fromHour.slice(0, 5);
    const toHour = props.toHour.slice(0, 5);

    const statusColor = getTaskStatusColor(props.status || "SCHEDULED");

    return (
        <View style={styles.container}>
            <View style={[styles.line, props.type == "COURSE" ? {borderColor: Colors.primaryColor} : {borderColor: Colors.secondaryColor} ]} />
            <View style={styles.hourStyle}>
                <Text>{fromHour}</Text>
                <Text>{toHour}</Text>
            </View>
            <View style={props.type == "COURSE" ? styles.taskStyle : styles.taskDepotStyle}>
                <View style={styles.taskTypeStyle}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            overflow: "hidden",
                            fontFamily: "Poppins_500Medium",
                            letterSpacing: 1,
                            fontWeight: "600"
                        }}>{props.type}</Text>
                        <Ionicons style={{ margin: 3, padding: 0 }} name="car" size={20} color={props.type == "COURSE" ? Colors.primaryColor : Colors.secondaryColor} />

                    </View>



                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "600" }}> {`${fromHour} - ${toHour}`}</Text>
                    </View>

                </View>


                <View style={styles.taskDetailsStyle}>

                    <View style={{
                        flexDirection: "row",
                        overflow: 'hidden',
                        alignItems: "center"
                    }}>

                        <Ionicons style={{ margin: 3, padding: 0 }} name="infinite" size={20} color={props.type == "COURSE" ? Colors.primaryColor : Colors.secondaryColor} />

                        <Text numberOfLines={1} style={{ overflow: "hidden", maxWidth: (Dimensions.get("screen").width - 158) / 2 }}>{props.from?.name}</Text>
                        <Text> - </Text>
                        <Text numberOfLines={1} style={{ overflow: "hidden", maxWidth: (Dimensions.get("screen").width - 158) / 2 }}>{props.to?.name}</Text>
                    </View>

                    <Text style={{ color: statusColor, fontFamily: "Poppins_500Medium", fontWeight: "bold", opacity: 0.4, padding: 1, textShadowRadius: 5, textShadowOffset: { height: 2, width: 2 }, textShadowColor: statusColor }}>{props.status}</Text>

                </View>

                <Text numberOfLines={1} style={{ overflow: "hidden", fontFamily: "Poppins_500Medium", color: "grey" }}>{props.note}</Text>
            </View>
        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("screen").width - 15,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
        paddingTop: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
        position: "relative",


    },
    hourStyle: {
        width: 45,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    taskStyle: {
        width: Dimensions.get("screen").width - 65,
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-around",

        borderWidth: 0.8,
        borderRadius: 12,
        borderColor: Colors.primaryColor
    },
    taskDepotStyle: {
        width: Dimensions.get("screen").width - 65,
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-around",

        borderWidth: 0.8,
        borderRadius: 12,
        borderColor: Colors.secondaryColor
    },
    taskTypeStyle: {
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between"

    },

    taskDetailsStyle: {
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between"

    },

    line: {
        position: 'absolute',
        height: 50,
        marginLeft: 20,
        left: 0,
        top: 25,
        zIndex: 20,

        borderWidth: 0.8,
        borderRadius: 12,
        borderColor: Colors.primaryColor
    },

});



export default Task;

