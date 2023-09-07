
export type StopLocationProp = {

    name?: string,
    city?: string, 
}


export type TaskStatus = "UNCONFIRMED" | "SCHEDULED" | "ONGOING" | "EXECUTED" | "ABORTED";
export type TaskType = "COURSE" | "DEPOT" | "COLLECT" | "OTHER";


export type TaskProps = {

    id?: string,
    type?: TaskType,
    note?: string,
    refId?: string, // pooler plan or planner plan id
    ownerId?: string,

    isCronTask?: boolean,
    cron?: string,
    
    from?: StopLocationProp,
    to?: StopLocationProp,

    fromHour?: string,
    toHour?: string,

    fromDate?: Date,
    toDate?: Date,
    createdAt?: Date,

    priority?: string,
    status?: TaskStatus

}


