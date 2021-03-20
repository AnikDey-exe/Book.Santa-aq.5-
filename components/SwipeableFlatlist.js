import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, Animated} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import {ListItem, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { SwipeListView } from 'react-native-swipe-list-view';
 
export default class SwipeableFlatlist extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection("AllNotifications").doc(notification.doc_id).update({
            "notificationStatus": "read"
        })
    }

    onSwipeValueChange = (swipeData) => {
        var allNotifications = this.state.allNotifications;
        const {key, value} = swipeData;
        if(value < -Dimensions.get("window").width){
            const newData = [...allNotifications];
            this.updateMarkAsRead(allNotifications[key]);
            newData.splice(key,1)
            this.setState({
                allNotifications: newData
            })
        }
    }

    renderItem = (data) => (
        <Animated.View>
            <ListItem
            leftElement={<Icon name='book' type='font-awesome' color='black'/>}
            title={data.item.bookName}
            titleStyle={{color: 'black', fontWeight: 'bold'}}
            subtitle={data.item.message}
            bottomDivider/>
        </Animated.View>
    )

    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightButton,styles.backRightButtonRight]}>
                <Text style={styles.backTextWhite}> </Text>
            </View>
        </View>
    )

    render() {
        return(
            <View style={styles.container}>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={this.onSwipeValueChange}
                keyExtractor={(item,index)=>index.toString()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    backTextWhite: {
        color: '#fff693',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15,
        alignSelf: 'flex-start'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    backRightButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightButtonRight: {
        backgroundColor: '#29b6f6',
        right: 0
    }
})