import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View, ScrollView, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';
import { Ionicons } from "@expo/vector-icons";
import Button from '@components/buttons/Button';

interface IPItem {
    label: string;
    active: boolean,
    color?: string;
}

interface IPricing {
    id: string;
    title: string;
    price: number;
    gift: number;
    color: string;
    duration: string;
    items: IPItem[]
}

const PricingItem = (item: IPItem) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginVertical: 8,
        }}>
            <View style={{
                width: 23,
                height: 23,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
            }}>
                {item.active ?
                    <Ionicons name='checkmark' size={18} color={'#E91590'}/>
                : <View style={{
                    width: 33,
                    height: 33,
                    borderRadius: 100,
                    backgroundColor: item.color? item.color : '#FFF',
                  }} />
                }
            </View>
            <Text style={{color: '#FFF', fontFamily: 'Poppins_500Medium', fontSize: 15}}>{item.label}</Text>
        </View>
    )
}
const PricingCard = ({trial}: {trial: IPricing}) => {
    return (
        <View style={{
            width: 260,
            elevation: 5,
            backgroundColor: trial.color,
            borderRadius: 8,
            justifyContent: 'space-between'
        }}>
            <View style={{padding: 8,}}>
                <View style={{
                    backgroundColor: '#FFF',
                    paddingHorizontal: 12,
                    paddingTop: 6,
                    paddingBottom: 4,
                    borderRadius: 30,
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 20, fontFamily: 'Poppins_700Bold'}}>{trial.title}</Text>
                </View>
                <View style={{paddingHorizontal: 8, marginVertical: 12}}>
                    {trial.items.map((item: IPItem, index: number) => {
                        return (
                            <PricingItem key={item.label} label={item.label} active={item.active} color={trial.color}/>
                        )
                    })}
                </View>
            </View>
            <View style={{paddingBottom: 8}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#FFF', fontFamily: 'Poppins_700Bold', fontSize: 24}}>XAF {trial.price}</Text>
                    <Text style={{color: '#FFF', opacity: 0.7}}>/month</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Button style={{backgroundColor: '#FFF', borderRadius: 25, width: 150, alignItems: 'center'}}>
                        <Text style={{color: trial.color, fontFamily: 'Poppins_600SemiBold', fontSize: 20}}>Choisir</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

const PricingScreen = () => {
  const pricingList: IPricing[] = [
    {
        id: '1',
        title: 'Free Trial',
        price: 3000,
        gift: 0,
        color: '#B316ED',
        duration: '1 Day',
        items: [
            {
                label: 'Compte Utilisateur',
                active: true,
                color: '#B316ED'
            },
            {
                label: 'Profil Professionel',
                active: true,
                color: '#B316ED'
            },
            {
                label: 'Comments Clients & Utilisateurs',
                active: false,
                color: '#B316ED'
            },
            {
                label: 'Alertes Visiteur',
                active: false,
                color: '#B316ED'
            },
            {
                label: 'Contact Client',
                active: false,
                color: '#B316ED'
            },
        ]
    },
    {
        id: '2',
        title: 'Starter Trial',
        price: 3000,
        gift: 5,
        color: '#E91590',
        duration: '7 Day',
        items: [
            {
                label: 'Compte Utilisateur',
                active: true,
                color: '#E91590'
            },
            {
                label: 'Profil Professionel',
                active: true,
                color: '#E91590'
            },
            {
                label: 'MAJ Disponibilité',
                active: false,
                color: '#E91590'
            },
            {
                label: 'Comments Clients & Utilisateurs',
                active: true,
                color: '#E91590'
            },
            {
                label: 'Alertes Visiteur',
                active: true,
                color: '#E91590'
            },
            {
                label: 'Contact Client',
                active: false,
                color: '#E91590'
            },
        ]
    },
    {
        id: '3',
        title: 'Classic Trial',
        price: 3000,
        gift: 8,
        color: '#1581ED',
        duration: '31 Days',
        items: [
            {
                label: 'Compte Utilisateur',
                active: true,
                color: '#1581ED'
            },
            {
                label: 'Profil Professionel',
                active: true,
                color: '#1581ED'
            },
            {
                label: 'MAJ Disponibilité',
                active: true,
                color: '#1581ED'
            },
            {
                label: 'Comments Clients & Utilisateurs',
                active: true,
                color: '#1581ED'
            },
            {
                label: 'Alertes Visiteur',
                active: true,
                color: '#1581ED'
            },
            {
                label: 'Contact Client',
                active: false,
                color: '#1581ED'
            },
        ]
    },
    {
        id: '4',
        title: 'Premium Trial',
        price: 3000,
        gift: 10,
        color: '#F88E3E',
        duration: '12 Months',
        items: [
            {
                label: 'Compte Utilisateur',
                active: true,
                color: '#F88E3E'
            },
            {
                label: 'Profil Professionel',
                active: true,
                color: '#F88E3E'
            },
            {
                label: 'Comments Clients & Utilisateurs',
                active: true,
                color: '#F88E3E'
            },
            {
                label: 'Alertes Visiteur',
                active: true,
                color: '#F88E3E'
            },
            {
                label: 'Contact Client',
                active: true,
                color: '#F88E3E'
            },
        ]
    },
  ]
  return (
    <SafeAreaView style={{flex:1}}>
            <View style={{width: '100%', height: 100, padding: 20}}>
                <SimpleHeader text='Pricing Plans' />
            </View>
            <View style={{width: '100%',  marginTop: 0, marginHorizontal: 0}}>
                <ScrollView contentContainerStyle={{
                    width: '100%',
                }}>
                    <View style={{paddingHorizontal: 14}}>
                        <Text style={{fontSize: 22, fontFamily: 'Poppins_600SemiBold'}}>Choose your plan an enjoy!</Text>
                    </View>
                    <View >
                            <View style={
                                {
                                    flexDirection: 'row',
                                    alignItems: 'stretch',
                                    gap: 4,
                                    padding: 8,
                                }
                            }>
                                <FlatList
                                    data={pricingList}
                                    keyExtractor={(item: IPricing) => String(item.id)}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{
                                        flexDirection: 'row',
                                        alignItems: 'stretch',
                                        gap: 18,
                                        padding: 8,
                                    }}
                                    renderItem={item => {
                                        return <PricingCard trial={item.item} />;
                                    }}
                                />
                            </View>
                        </View>
                    
                </ScrollView>
            </View>
    </SafeAreaView>
  );
};

export default PricingScreen;
const styles = StyleSheet.create({
  
});
