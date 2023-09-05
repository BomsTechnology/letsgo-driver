
export type StopLocationProp = {

    name?: string,
    city?: string,
    lat?: number,
    lon?: number
}


export type TaskStatus = "UNCONFIRMED" | "SCHEDULED" | "ONGOING" | "EXECUTED" | "ABORTED";
export type TaskType = "COURSE" | "DEPOT" | "COLLECT" | "OTHER";


export type TaskProps = {

    id?: string,
    type?: TaskType,
    note?: string,
    
    from?: StopLocationProp,
    to?: StopLocationProp,

    fromHour?: string,
    toHour?: string,

    fromDate?: string,
    toDate?: string,

    priority?: number,
    status: TaskStatus

}


