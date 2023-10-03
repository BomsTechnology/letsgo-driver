import axiosClient, { API_BASE_URL } from "@config";
import { MembershipRequest, Syndicat } from "../types/SyndicatProps"; 
import AsyncStorage from "@react-native-async-storage/async-storage";




const PREFIX_URL = 'SOCIAL-SERVICE/api/v0/members';
const SEARCH_URL = '/search';


export interface MemberRequestDTO {

    groupId: string,
    motivation?: string
}



export const makeRequest = async (data: MemberRequestDTO) => {

    return new Promise<MembershipRequest>(async (resolve, reject) => {

        const response = await axiosClient.post<MembershipRequest>(PREFIX_URL + '/request', data);
        
        if (response.data != undefined) {

            await AsyncStorage.setItem("syndicat_request", JSON.stringify(response.data));
            return resolve(response.data);

        } else {

            return reject(new Error("Une erreur réseau s'est produite"))
        }

    })
}


export interface SearchSyndicateField {
    query: string,
    page?: number,
}



export const searchSyndicates = async (data: SearchSyndicateField) => {

    return new Promise<Syndicat[]>(async (resolve, reject) => {

        const response = await axiosClient.post<Syndicat[]>(SEARCH_URL + '/syndicat', data);
        
        if (response.data != undefined) {
            return resolve(response.data);
        } else {
            return reject(new Error("Une erreur réseau s'est produite"))
        }

    })
}













