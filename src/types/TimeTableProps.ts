export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;


export interface TimeRange {

    startTime: Date,
    endTime: Date,

};

export interface DayRange {

    day: DayOfWeek,
    times: TimeRange[]
}

export interface DriverAvaibility {

    isAvailable?: boolean,
    ranges?: DayRange[]

}






export interface WorkZone {

    cities: string[]
    country: string,

}


export interface DriverPricing {

    currency?: string,
    pricePerDay?: number,
    pricePerHour?: number,
    pricePerKilometer?: number,
    canNegotiate?: boolean

}

export interface DriverSkill {

    name: string,
    desc?: string
}


export interface DriverExperience {

    label: string,
    desc?: string,
    starAt?: Date,
    endAt?: Date,
    attachments?: string[]
}


export interface Contact {

    value: string,
    isVerified: boolean,
    type: "EMAIL" | "PHONE",
    createdAt: Date,    
}


export interface Score {

    starCount: number, 
    level: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND",     
}


export interface HumanIdentity {

    identityUId?: string,
    type?: "VISA" | "CNI" | "PERMIT" | "PASSPORT" | "SCHOOL_IDENTITY",
    details?: string,
    isVerified?: boolean,
    issueAt?: Date,
    expireAt?: Date,
    createdAt?: Date,
    verifiedAt?: Date,
    providerId?: string,
    docs?: string [],
    formattedIdentityProvider?: string 
}


export interface Certificate {

    certificateLink?: string, 
    certifiedAt: Date
}



export interface Address {

    country?: string,
    state?: string,
    region?: string,
    town?: string,
    street?: string,
    postalCode?: string,
    lat?: number,
    lon?: number,
    addAt: Date
}

export interface BusinessInformation {

    businessName: string,
    businessCode?: string,
    businessDescription?: string,
    isIndependent?: boolean,
    isEntreprise: boolean,
    yearsOfExperience?: number,
    docs?: string[],
    cvLink?: string,
    businessLogo?: string,
    businessTaxationNumber?: string,
    businessRegistrationNumber?: string
    businessContacts?: Contact[],
    businessAddresses?: Address[]

}


export interface Profile {

    version?: number,
    firstName?: string,
    lastName?: string,
    avatar?: string,
    picture?: string,
    gender?: string,
    birthdate?: string,
    about?: string,
    contacts?: Contact[],
    address?: Address[],
    keywords: string[],
}


export interface Driver extends Profile, BusinessInformation {

    driverId: string,
    score?: Score,
    workZone?: WorkZone,
    driverAvailability?: DriverAvaibility,
    driverPricing?: DriverPricing,
    skills?: DriverSkill[],
    experiences?: DriverExperience[],
    driverLicences?: HumanIdentity[],
    certificate?: Certificate,

}

