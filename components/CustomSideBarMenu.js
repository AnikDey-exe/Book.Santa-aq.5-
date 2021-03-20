import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';
import WelcomeScreen from '../screens/WelcomeScreen';

export default class CustomSideBarMenu extends React.Component {
    render(){
        return(
            <View style={{flex: 1}}>
                <View style={styles.drawerItemContainer}>
                    <DrawerItems
                    {...this.props}/>
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={()=>{this.props.navigation.navigate('WelcomeScreen')
                    firebase.auth().signOut()}}>
                        <Text style={styles.logoutText}> Log Out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerItemContainer: {
        flex: 0.8
    },
    logoutContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: 50
    },
    logoutButton: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        paddingBottom: -30,
        paddingLeft: 10
    },
    logoutText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})