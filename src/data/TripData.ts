import { ImageSourcePropType } from "react-native";

interface riderData {
    name: string,
    rate?: number,
    price: number,
    avatar: ImageSourcePropType
}

const tripRider :riderData [] = [
    {
        name:"Bradley A.",
        rate:3,
        price:1.93,
        avatar:require('../assets/images/avatars/Avatar.png')
    },
    {
        name:"Amanda C.",
        price:2.55,
        avatar:require('../assets/images/avatars/Avatar1.png')
    },
    {
        name:"Carmelle M.",
        rate:4,
        price:0.87,
        avatar:require('../assets/images/avatars/Avatar2.png')
    },
    {
        name:"Tchoumi K.",
        rate:4,
        price:0.87,
        avatar:require('../assets/images/avatars/Avatar3.png')
    },
    {
        name:"Menra R.",
        rate:4,
        price:0.87,
        avatar:require('../assets/images/avatars/Avatar4.png')
    }
]




export type {riderData}
export {tripRider}