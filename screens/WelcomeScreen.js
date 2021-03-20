import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import SantaAnimation from '../SantaClaus';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible: false,
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: ''
    }
  }

  userSignUp = (emailId, password, confirmPassword) => {
    if(password !== confirmPassword) {
        return Alert.alert("Password does not match. \n Check your password.")
    }  
    else {
        firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then(()=>{
          db.collection("Users").add({
              'firstname': this.state.firstName,
              'surname': this.state.lastName,
              'contact': this.state.contact,
              'emailId': this.state.emailId,
              'address': this.state.address,
              'isBookRequestActive': false
          })
          return Alert.alert(
            "User added successfully.",
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
          );
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate('DonateBooks');
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  showModal = () => {
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}> 
          <View style={styles.modalContainer}>
              <ScrollView style={{width: '100%'}}>
                  <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" enabled>
                  <Text style={styles.modalTitle}> Registration </Text>
                  <TextInput
                  style={styles.formTextInput}
                  placeholder="First Name"
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                          firstName: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Last Name"
                  maxLength={8}
                  onChangeText={(text)=>{
                      this.setState({
                          lastName: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Contact"
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                      this.setState({
                          contact: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Address"
                  multiline={true}
                  onChangeText={(text)=>{
                      this.setState({
                          address: text
                      })
                  }}/>

                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Email"
                  keyboardType={'email-address'}
                  onChangeText={(text)=>{
                      this.setState({
                          emailId: text
                      })
                  }}/>
                  
                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text)=>{
                      this.setState({
                          password: text
                      })
                  }}/>
                  
                  <TextInput
                  style={styles.formTextInput}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={(text)=>{
                      this.setState({
                          confirmPassword: text
                      })
                  }}/>

                  <View style={styles.modalBackButton}>
                      <TouchableOpacity 
                      style={styles.registerButton}
                      onPress={()=>{
                          this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                      }}>
                          <Text style={styles.registerButtonText}> Register </Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.modalBackButton}>
                      <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={()=>this.setState({
                          isModalVisible: false
                      })}>
                          <Text style={{color: '#ff5722'}}> Cancel </Text>
                      </TouchableOpacity>
                  </View>
                  </KeyboardAvoidingView>
              </ScrollView>
          </View>

        </Modal>
    )
}

  render() {
    return (
      <View style={styles.container}>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        </View>

        {this.showModal()}

        <View style={styles.profileContainer}>
          {/* <SantaAnimation/> */}
          <Text style={styles.title}>Book Santa</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "orange"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "orange"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.setState({
                isModalVisible: true
            })}}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:0 
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#ff5722',
    margin: 50
  },
  formTextInput: {
    width: '75%',
    height: '5%',
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10
  },
  modalBackButton: {
      
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  cancelButton:{
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold' 
  }
})
