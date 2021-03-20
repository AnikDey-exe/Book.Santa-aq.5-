import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class BookRequestScreen extends Component {
    constructor() {
        super();
        this.state ={
          userId : firebase.auth().currentUser.email,
          bookName:"",
          reasonToRequest:"",
          requestId: '',
          requestedBookName: '',
          bookStatus: '',
          docId: '',
          userDocId: '',
          isBookRequestActive: null
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }

    receivedBooks=(bookName)=>{
      var userId = this.state.userId
      var requestId = this.state.requestId
      db.collection('ReceivedBooks').add({
          "userId": userId,
          "bookName":bookName,
          "requestId"  : requestId,
          "bookStatus"  : "received",
    
      })
    }

    getBookRequest = () => {
      var bookReq = db.collection("RequestedBooks").where("emailId","==",this.state.userId).get()
      .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            if(doc.data().bookStatus !== "received") {
              this.setState({
                requestId: doc.data().requestId,
                requestedBookName: doc.data().bookName,
                bookStatus: doc.data().bookStatus,
                docId: doc.id
              })
            }
          })
      })
    }

    
sendNotification=()=>{
  //to get the first name and last name
  db.collection('Users').where('emailId','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      var name = doc.data().firstname
      var lastName = doc.data().surname

      // to get the donor id and book nam
      db.collection('AllNotifications').where('requestId','==',this.state.requestId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          var donorId  = doc.data().donorId
          var bookName =  doc.data().bookName

          //targert user id is the donor id to send notification to the user
          db.collection('AllNotifications').add({
            "targetedUserId" : donorId,
            "message" : name +" " + lastName + " received the book " + bookName ,
            "notificationStatus" : "unread",
            "bookName" : bookName
          })
        })
      })
    })
  })
}

    getBookRequestIsActive = () => {
      db.collection("Users").where("emailId","==",this.state.userId)
      .onSnapshot(querySnapshot=>{
        querySnapshot.forEach((doc)=>{
          this.setState({
            isBookRequestActive: doc.data().isBookRequestActive,
            userDocId: doc.id
          })
        })
      })
    }
    
    addRequest = async(bookName,reasonToRequest)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection('RequestedBooks').add({
            "userId": userId,
            "bookName":bookName,
            "reasonToRequest":reasonToRequest,
            "requestId":randomRequestId,
             "bookStatus": "requested",
             "date": firebase.firestore.FieldValue.serverTimestamp()
        })

        await this.getBookRequest();

        db.collection("Users").where("emailId","==",userId).get()
        .then().then((snapshot)=>{
          snapshot.forEach((doc)=>{
            db.collection("Users").doc(doc.id).update({
              isBookRequestActive: true
            })
          })
        })
  
    }

    componentDidMount() {
      this.getBookRequest()
      this.getBookRequestIsActive()
    }

    
updateBookRequestStatus=()=>{
  //updating the book status after receiving the book
  db.collection('RequestedBooks').doc(this.state.docId)
  .update({
    bookStatus : 'received'
  })

  //getting the  doc id to update the users doc
  db.collection('Users').where('emailId','==',this.state.userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      //updating the doc
      db.collection('Users').doc(doc.id).update({
        isBookRequestActive: false
      })
    })
  })
}

    render() {
      if(this.state.isBookRequestActive === true){
         return(
           <View style={{flex: 1, justifyContent: 'center'}}>
             <View style={{borderColor: 'orange',borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10}}>
                <Text> Book Name </Text>
                <Text> {this.state.requestedBookName} </Text>
             </View>
             <View style={{borderColor: 'orange',borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10}}>
                <Text> Book Status </Text>
                <Text> {this.state.bookStatus}</Text>
             </View>
             <TouchableOpacity style={{borderWidth: 1, borderColor: 'orange', justifyContent: 'center', backgroundColor: 'orange', width: 300, height: 30, marginTop: 30, alignItems: 'center', alignSelf: 'center'}}
             onPress={()=>{
               this.sendNotification()
               this.updateBookRequestStatus()
               this.receiveBooks(this.state.requestedBookName)
             }}>
                <Text>
                    I Received The Book
                </Text>
             </TouchableOpacity>
           </View>
         )     
      }

      else {
        return(
         
            <View style={{flex: 1}}>
                <MyHeader
                title="Request Books"
                navigation={this.props.navigation}/>
                  <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Enter Book Name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why Do You Need The Book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.requestedBookName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            </View>
        )
      }
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
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
      marginTop:20
      },
    }
  )