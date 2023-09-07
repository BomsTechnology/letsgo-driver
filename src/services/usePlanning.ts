import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BusinessInformation, Driver, DriverAvaibility, DriverExperience, DriverPricing, DriverSkill, HumanIdentity, WorkZone } from "../types/TimeTableProps";
import { AxiosResponse } from "axios";
import { TaskProps, TaskStatus } from "../types/TaskProps";

//const PREFIX_URL = 'DRIVER-SERVICE/api/v0/drivers/plannings';

const PREFIX_URL = 'api/v0/drivers/plannings';


export const createTask = async (data: TaskProps, owner?: string) => {

    return new Promise<TaskProps>(async (resolve, reject) => {

        let response; 

        if (owner){

            response  = await axiosClient.post<TaskProps>(PREFIX_URL + "?owner=" + owner, data);
        }
        else {

            response  = await axiosClient.post<TaskProps>(PREFIX_URL, data);
        }

         
        if (response.data != undefined) {

            return resolve(response.data);

        } else {

            return reject(new Error("Une erreur réseau s'est produite"))
        }

    })

}



export const updateTask = async (data: TaskProps, taskId: string) => {

    return new Promise<TaskProps>(async (resolve, reject) => {

        const response =
            await axiosClient.put<TaskProps>(PREFIX_URL + "/" + taskId, data);

        if (response.data != undefined) {

            return resolve(response.data);

        } else {

            return reject(new Error("Une erreur réseau s'est produite"))
        }

    });

}




export const changeTaskStatus = async (status: TaskStatus, taskId: string) => {

    return new Promise<TaskProps>(async (resolve, reject) => {

        const response =
            await axiosClient.put<TaskProps>(PREFIX_URL + "/" + taskId + "/status?value=" + status);

        if (response.data != undefined) {

            return resolve(response.data);

        } else {

            return reject(new Error("Une erreur réseau s'est produite"))
        }

    });

}



export const getTask = async (taskId: string) => {

    return new Promise<TaskProps>(async (resolve, reject) => {

        const response = await axiosClient.get<TaskProps>(PREFIX_URL + "/" + taskId);

        if (response.data != undefined) {

            return resolve(response.data);

        } else {

            return reject(new Error("Une erreur réseau s'est produite"))
        }

    })

}




export const getMyTasksAfterDate = async (afterDate: string) => {

    return new Promise<TaskProps>(async (resolve, reject) => {

        const response = await axiosClient.get<TaskProps>(PREFIX_URL + "?afterDate=" + afterDate);

        if (response.data != undefined) {

            return resolve(response.data);

        } else {

            return reject(new Error("Une erreur réseau s'est produite"))
        }

    });

}



