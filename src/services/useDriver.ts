import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BusinessInformation, Driver, DriverAvaibility, DriverExperience, DriverPricing, DriverSkill, HumanIdentity, WorkZone } from "../types/TimeTableProps";
import { AxiosResponse } from "axios";

const PREFIX_URL = 'DRIVER-SERVICE/api/v0/drivers/';



export const apiCallWrapper = async <T> (response: AxiosResponse<T>) => {

	return new Promise<T>(async (resolve, reject) => {
		
		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}




export const upgradeToDriver = async (data: BusinessInformation) => {

	return new Promise<Driver>(async (resolve, reject) => {
		
		const response = await axiosClient.post<Driver>(PREFIX_URL + "", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const updateDriver = async (data: BusinessInformation) => {

	return new Promise<Driver>(async (resolve, reject) => {
		
		const response = await axiosClient.put<Driver>(PREFIX_URL + "", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const changeDriverWorkzone = async (data: WorkZone) => {

	return new Promise<WorkZone>(async (resolve, reject) => {
		
		const response = await axiosClient.put<WorkZone>(PREFIX_URL + "work-zone", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const changeDriverAvailabality = async (data: DriverAvaibility) => {

	return new Promise<DriverAvaibility>(async (resolve, reject) => {
		
		const response = await axiosClient.put<DriverAvaibility>(PREFIX_URL + "availability", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const changeDriverPricing = async (data: DriverPricing) => {

	return new Promise<DriverPricing>(async (resolve, reject) => {
		
		const response = await axiosClient.put<DriverPricing>(PREFIX_URL + "pricing", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const removeDriverSkill = async (skillName: string) => {

	return new Promise<void>(async (resolve, reject) => {
		
		const response = await axiosClient.delete<void>(PREFIX_URL + "skills/" + skillName);

		if (response.status < 400) {

			return resolve();

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const addOrUpdateDriverSkill = async (data: DriverSkill) => {

	return new Promise<DriverSkill[]>(async (resolve, reject) => {
		
		const response = await axiosClient.post<DriverSkill[]>(PREFIX_URL + "skills", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const removeDriverExperience = async (label: string) => {

	return new Promise<void>(async (resolve, reject) => {
		
		const response = await axiosClient.delete<void>(PREFIX_URL + "experiences/" + label);

		if (response.status < 400) {

			return resolve();

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const addOrUpdateDriverExperience = async (data: DriverExperience) => {

	return new Promise<DriverExperience[]>(async (resolve, reject) => {
		
		const response = await axiosClient.post<DriverExperience[]>(PREFIX_URL + "experiences", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const removeDriverLicence = async (licenceId: string) => {

	return new Promise<void>(async (resolve, reject) => {
		
		const response = await axiosClient.delete<void>(PREFIX_URL + "licences/" + licenceId);

		if (response.status < 400) {

			return resolve();

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}


export const addOrUpdateDriverLicence= async (data: HumanIdentity) => {

	return new Promise<HumanIdentity>(async (resolve, reject) => {
		
		const response = await axiosClient.post<HumanIdentity>(PREFIX_URL + "licences", data);

		if (response.data != undefined) {

			return resolve(response.data);

		} else {

			return reject(new Error("Une erreur réseau s'est produite"))
		}		
 
	})
}






export const changeDriverAvailability = createAsyncThunk<DriverAvaibility, DriverAvaibility>(


	"driver/updateAvailability",
	async (data) => {

		try {

			const response = await axiosClient.put<DriverAvaibility>(PREFIX_URL + "availability", data);

			if (response.data != undefined) {

				return response.data;

			} else {

				throw new Error(
					"Une erreur réseau s'est produite"
				);
			}

		} catch (error: any) {
			throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
		}

	});
