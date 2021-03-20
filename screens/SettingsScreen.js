import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase';


export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state={
          emailId   : '',
          firstName : '',
          lastName  : '',
          address   : '',
          contact   : '',
          docId     : ''
        }
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection("Users").where('emailId','==',email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
          var data = doc.data()
            this.setState({
              emailId   : data.emailId,
              firstName : data.firstname,
              lastName  : data.surname,
              address   : data.address,
              contact   : data.contact,
              docId     : doc.id
            })
          });
        })
    }
    componentDidMount(){
        this.getUserDetails()
    }
    updateUserDetails=()=>{
        db.collection("Users").doc(this.state.docId)
        .update({
          "firstname": this.state.firstName,
          "surname" : this.state.lastName,
          "address"   : this.state.address,
          "contact"   : this.state.contact,
        })
    
        alert("Profile Updated Successfully")
    
    }
    
    render(){
        return(
            <View style={styles.container} >
            <MyHeader title="Settings" navigation={this.props.navigation}/>
            <View style={styles.formContainer}>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                    value ={this.state.lastName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Contact"}
                  maxLength ={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}
                    value ={this.state.contact}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Address"}
                  multiline = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      address: text
                    })
                  }}
                    value ={this.state.address}
                />
                <TouchableOpacity style={styles.button}
                  onPress={()=>{
                    this.updateUserDetails()
                  }}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }
}
    
    
const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        marginTop: 30
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:40,
        padding:10,
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:220
    },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
    }
})