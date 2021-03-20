import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/request-list.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Donate Books"
        }
    },
    BookRequest: {
        screen: BookRequestScreen,
        navigationOptions: {
            tabBarIcon: 
            <Image
            source={require('../assets/request-book.png')}
            style={{width: 20, height: 20}}/>,
            tabBarLabel: "Request Books"
        }
    }
});