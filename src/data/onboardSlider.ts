import { ImageSourcePropType } from "react-native";

interface OnboardingItemProps {
    image: ImageSourcePropType;
    title: string;
    id: string;
    description: string;
};


const slides: OnboardingItemProps[] = [
    {
        id: '1',
        title: 'Welcome to letsGo!',
        description: 'Make the experience of making around the city easier, faster and alfordable',
        image: require("../assets/images/logo.png"),
    },
    {
        id: '2',
        title: 'All in one place',
        description: 'Take the control over your trips costs and access whenever you need to your data',
        image: require("../assets/images/onboarding1.png"),
    },
    {
        id: '3',
        title: 'Earn free trips',
        description: 'Share your trips with people doing same road and get exclusive discounts(even free trips)',
        image: require("../assets/images/onboarding2.png"),
    },
];

export type {OnboardingItemProps};
export default slides;