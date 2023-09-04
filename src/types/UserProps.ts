export default interface UserProps {
    "userId"?: string;
    "type"?: string;
    "firstName"?: string;
    "lastName"?: string;
    "avatar"?: string;
    "picture"?: string;
    "gender"?: string;
    "birthdate"?: string;
    "principalPhone"?: string;
    "principalEmail"?: string;
    "role"?: string[];
    "contacts"?: [
        {
        "value"?: string;
        "details"?: string;
        "type"?: string;
        "verified"?: string;
        "favorite"?: string;
        },
    ],
    "addressFormatted"?: string;
    "keywords": string[];
    "userPreferences"?: string;
    "userPaymentModes"?: string;
    "score"?: string;
    "webSite"?: string;
    "description"?: string;
    //"isBusinessActor"?: string;
    //"businessSector"?: string;
    "updatedAt"?: string;
    "createdAt"?: string;
}