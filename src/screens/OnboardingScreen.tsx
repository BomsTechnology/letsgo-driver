import React, {useState, useRef} from 'react';
import { StyleSheet, FlatList, ImageSourcePropType, Animated, View, StatusBar, Pressable, Text } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OnboardingItem from '@components/onboard/OnboardingItem';
import OnBoardingNextButton from '@components/onboard/OnBoardingNextButton';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import slides, {OnboardingItemProps} from '@data/onboardSlider';

const OnboardingScreen = () => {
    const navigation = useNavigation();

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList | null>(null);

    const viewableItemsChanged = useRef(({viewableItems}: {viewableItems: any}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
    
    const scrollTo = () => {
        if(currentIndex < slides.length - 1){
            slidesRef.current?.scrollToIndex({ index : currentIndex + 1})
        }else {
            goToLogin()
        }
    };

    const goToLogin = () => {
        navigation.navigate('Login' as never);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.skipContainer ,{  }]}>
                <Pressable onPress={goToLogin} > 
                    <Text style={styles.skipText}>Skip</Text> 
                </Pressable>
            </View>
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <FlatList 
                    data={slides}
                    renderItem={
                        ({item} : {item: OnboardingItemProps}) => <OnboardingItem props={item}/>
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={
                        (item) => item.id
                    }
                    onScroll={
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {x: scrollX}
                            }
                        }], 
                        {
                            useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    />
                </View>
                <OnBoardingNextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteTone1
    },
    skipContainer: { 
        alignItems: 'flex-end', 
        justifyContent: 'flex-end', 
        width: '100%',
        backgroundColor: Colors.whiteTone1,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    skipText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16
    }
 });

export default OnboardingScreen;