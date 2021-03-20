import React, { Component } from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SettingsScreen from '../screens/SettingsScreen';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import MyDonationsScreen from '../screens/MyDonationsScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: AppTabNavigator
        },

        MyDonations: {
            screen: MyDonationsScreen,
        },

        Notifications: {
            screen: NotificationScreen
        },

        Settings: {
            screen: SettingsScreen
        }
    },

    {
        contentComponent:  CustomSideBarMenu
    },

    {
        InitialRouteName: 'Home'
    }
);