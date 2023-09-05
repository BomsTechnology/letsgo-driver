import Colors from '@constants/colors';
import { TaskType, TaskProps, TaskStatus } from '@types/TaskProps';
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




const Task: React.FC<TaskProps> = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <View style={styles.hourStyle}>
                <Text>{props.fromHour}</Text>
                <Text>{props.toHour}</Text>
            </View>

            <View style={styles.taskStyle}>

                <View style={styles.taskTypeStyle}>

                    <View style={{ flexDirection: "row" }}>

                        <Text style={{ overflow: "hidden", letterSpacing: 2, fontWeight: "600" }}>{props.type}</Text>


                        <Ionicons style={{margin: 0, padding:0}} name="information" size={20} color={Colors.primaryColor} />
                    </View>



                    <View style={{ flexDirection: "row" }}>
                        <Text>{props.fromHour}</Text>
                        <Text> - </Text>
                        <Text>{props.toHour}</Text>
                    </View>

                </View>


                <View style={styles.taskDetailsStyle}>

                    <View style={{ flexDirection: "row", overflow: 'hidden', }}>
                        <Text numberOfLines={1} style={{ overflow: "hidden", maxWidth: (Dimensions.get("screen").width - 158) / 2 }}>{props.from?.name}</Text>
                        <Text> - </Text>
                        <Text numberOfLines={1} style={{ overflow: "hidden", maxWidth: (Dimensions.get("screen").width - 158) / 2 }}>{props.to?.name}</Text>
                    </View>

                    <Text style={{ color: getTaskStatusColor(props.status), fontFamily: "Poppins_500Medium", fontWeight: "bold",  opacity: 0.4, padding: 1, textShadowOffset: {height:2, width:2}, textShadowColor: getTaskStatusColor(props.status) }}>{props.status}</Text>

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

