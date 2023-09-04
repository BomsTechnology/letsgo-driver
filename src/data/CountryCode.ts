import { ImageSourcePropType } from 'react-native';

interface countryCodeProps {
    code: string,
    name: string,
    callingCode: string,
    flag: ImageSourcePropType
}

const countryCodes: countryCodeProps[] = [
    {
        code: 'BEN',
        name: 'Benin',
        callingCode: '+229',
        flag: require('../assets/images/flags/benin.png'),
    },

    {
        code: 'CM',
        name: 'Cameroon',
        callingCode: '+237',
        flag: require('../assets/images/flags/cameroon.png'),
    },

    {
        code: 'CAF',
        name: 'Central african republic',
        callingCode: '+236',
        flag: require('../assets/images/flags/rca.png'),
    },

    {
        code: 'TCD',
        name: 'Chad',
        callingCode: '+235',
        flag: require('../assets/images/flags/chad.png'),
    },

    {
        code: 'COD',
        name: 'Democratic Republic of the Congo',
        callingCode: '+243',
        flag: require('../assets/images/flags/congo.png'),
    },

    {
        code: 'FRA',
        name: 'France',
        callingCode: '+33',
        flag: require('../assets/images/flags/france.png'),
    },

    {
        code: 'GAB',
        name: 'Gabon',
        callingCode: '+241',
        flag: require('../assets/images/flags/gabon.png'),
    },

    {
        code: 'DEU',
        name: 'Germany',
        callingCode: '+49',
        flag: require('../assets/images/flags/germany.jpg'),
    },

    {
        code: 'CIV',
        name: 'Ivory Coast',
        callingCode: '+225',
        flag: require('../assets/images/flags/ivory_cost.png'),
    },

    {
        code: 'NGA',
        name: 'Nigeria',
        callingCode: '+234',
        flag: require('../assets/images/flags/nigeria.png'),
    },

    {
        code: 'SEN',
        name: 'Senegal',
        callingCode: '+221',
        flag: require('../assets/images/flags/senegal.png'),
    },
    
    {
        code: 'TGO',
        name: 'Togo',
        callingCode: '+228',
        flag: require('../assets/images/flags/togo.png'),
    },

    {
        code: 'USA',
        name: 'United States of America',
        callingCode: '+1',
        flag: require('../assets/images/flags/usa.png'),
    },
    
];

export type {countryCodeProps};
export {countryCodes}