import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            error:'',
            top: new Animated.Value(0),
            login:false,
        }
    }

    load(){
        const { top } = this.state;
        //this.setState({header : true})
        Animated.timing(
            top,{
                toValue:230,
                friction:0.1,
                duration:1000,

            }
        ).start()

    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDpyOVC6vZfCrIRfR_-SrwK_JwBUgVbuSM",
           authDomain: "armentum-85282.firebaseapp.com",
           databaseURL: "https://armentum-85282.firebaseio.com",
           projectId: "armentum-85282",
           storageBucket: "armentum-85282.appspot.com",
           messagingSenderId: "65819357926"
        });
        this.load()
    }

    loginUser(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {Actions.tabbar()})
          .catch(() => { this.setState({error:'Either email or password is wrong!'})})
    }

    registerUser(){
        const { email, password , confirmPassword} = this.state;
        if(password  != confirmPassword){
            this.setState({error:'Password should be same!'});
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {Actions.tabbar() })
        .catch((err) => {this.setState({error:''+err})})
    }

    render(){
        return(
            <View style = {{flex:1, justifyContent:'space-between', alignItems:'center'}} >
                <Animated.View style = {{top:this.state.top}}>
                    <View>
                        <TextInput
                            placeholder = 'Email Address'
                            placeholderTextColor = '#d6d6d6'
                            underlineColorAndroid='transparent'
                            keyboardType = 'email-address'
                            autoCorrect = {false}
                            autoCapitalize = 'none'
                            style={{width: 330,marginBottom:1, marginLeft: 2,height:30, color:'#000000',}}
                            onChangeText={(text) => this.setState({email:text})}
                            value={this.state.email}
                        />
                        <View style = {{width:330, height:0.7, backgroundColor:'#d6d6d6',marginTop:2}} />
                    </View>
                    <View>
                        <TextInput
                            placeholder = 'Password'
                            placeholderTextColor = '#d6d6d6'
                            underlineColorAndroid='transparent'
                            secureTextEntry ={false}
                            autoCorrect = {false}
                            autoCapitalize = 'none'
                            style={{width: 330,marginBottom:1, marginLeft: 2, height:30,color:'#000000', marginTop:15}}
                            onChangeText={(text) => this.setState({password:text})}
                            value={this.state.password}
                        />
                        <View style = {{width:330, height:0.7, backgroundColor:'#d6d6d6',marginTop:2}} />
                    </View>
                    {(this.state.login)?
                        <View>
                            <TextInput
                                placeholder = 'Confirm Password'
                                placeholderTextColor = '#d6d6d6'
                                underlineColorAndroid='transparent'
                                secureTextEntry ={false}
                                autoCorrect = {false}
                                autoCapitalize = 'none'
                                style={{width: 330,marginBottom:1, marginLeft: 2, height:30,color:'#000000', marginTop:15}}
                                onChangeText={(text) => this.setState({confirmPassword:text})}
                                value={this.state.confirmPassword}
                            />
                            <View style = {{width:330, height:0.7, backgroundColor:'#d6d6d6',marginTop:2}} />
                        </View>:null
                    }
                </Animated.View>

                <View style = {{bottom:180}} >
                    <Text style = {{color:'red', fontSize:12, textAlign:'center', padding:15}} >{this.state.error}</Text>
                    <TouchableOpacity onPress = {()=>this.setState({login : !this.state.login})} >
                        <Text style = {{color:'#F67C01', fontSize:12, textAlign:'center'}} >Click here to {(this.state.login)?'Login':'Register'}</Text>
                    </TouchableOpacity>
                    <View style = {{marginTop:10}} >
                        {(!this.state.login)?
                            <TouchableOpacity onPress={this.loginUser.bind(this)} style = {styles.button}>
                                <Text style = {{fontWeight:'bold', fontSize: 16, color: '#FFFFFF'}}>Login</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={this.registerUser.bind(this)} style = {styles.button}>
                                <Text style = {{fontWeight:'bold', fontSize: 16, color: '#FFFFFF'}}>Register</Text>
                            </TouchableOpacity>
                        }


                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        padding: 6,
        justifyContent:'center',
        alignItems:'center',
        width:160,
        borderRadius: 25,
        backgroundColor:'#F67C01'
    },
})
export default Login
