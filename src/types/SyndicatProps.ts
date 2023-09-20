import { Address, Profile } from "./TimeTableProps";


export type GroupStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED" | "DELETED"


export interface GroupCharter {

    clauses: string[]
}

export interface GroupRole {
    roleName: string,
    roleDescription?: string,
    timestamp?: string
}


export interface SyndicatOffice {
    officeNumber: number,
    officeName: string,
    managerName?: string,
    isHeadOffice?: boolean,
    images?: string[],
    phones?: string[],
    address?: Address
}


export interface SyndicatMember {
    joinAt?: string,
    memberId?: string,
    userId?: string,
    request?: string,
    roles?: GroupRole[],
    profile?: Profile
}



export interface Syndicat {
    syndicatId: string,
    shortName: string,
    jobTarget: string,
    creationDate: string,
    score: number,
    syndicatName: string,
    syndicatDesc: string,
    createAt: string,
    groupStatus: GroupStatus,
    roles: GroupRole[],
    charter: GroupCharter,
    offices?: SyndicatOffice[],
    creator?: SyndicatMember,

    
    groupName?: string,
}

export type MembershipRequestStatus = "EMITTED" | "RECEIVED" | "ONGOING" | "DENIED" | "ACCEPTED"

export interface MembershipRequest {
    requestId?: string,
    userId?: string,
    emittedAt?: string,
    receivedAt?: string,
    markedInProgressOn?: string,
    deniedAt?: string,
    acceptedAt?: string,
    motivation?: string,
    status?: MembershipRequestStatus,
    groupId?: string,
    claimedRoles?: GroupRole[],
    evaluateBy?: SyndicatMember,
    syndicat?: Syndicat
}


