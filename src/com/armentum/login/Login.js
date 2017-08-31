import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
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
            top: new Animated.Value(-100),
            login:false,
            animating:false
        }
    }

    load(){
        const { top } = this.state;
        //this.setState({header : true})
        Animated.timing(
            top,{
                toValue:210,
                friction:0.1,
                duration:1000,

            }
        ).start()
    }

    up(){
        const { top } = this.state;
        //this.setState({header : true})
        Animated.timing(
            top,{
                toValue:100,
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
        this.setState({animating:true})
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
              this.setState({animating:false})
              Actions.tabbar()
          })
          .catch((error) => { this.setState({animating:false, error:''+error})})
    }

    registerUser(){
        this.setState({animating:true})
        const { email, password , confirmPassword} = this.state;
        if(password  != confirmPassword){
            this.setState({animating:false, error:'Password should be same!'});
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({animating:false})
            Actions.tabbar()
        })
        .catch((err) => {this.setState({animating:false, error:''+err})})
    }

    render(){
        if(this.state.animating){
            return(
                <View style = {{flex:1, justifyContent:'center', alignItems:'center'}} >
                    <ActivityIndicator animating={this.state.animating} style={{height: 80}} size="large" />
                </View>
            );
        }
        return(
            <View style = {{flex:1, justifyContent:'space-between', alignItems:'center'}} >
                <Animated.View style = {{flex:4,top:this.state.top}}>
                    <View>
                        <TextInput
                            placeholder = 'Email Address'
                            placeholderTextColor = '#d6d6d6'
                            underlineColorAndroid='transparent'
                            keyboardType = 'email-address'
                            autoCorrect = {false}
                            returnKeyType = {'next'}
                            autoCapitalize = 'none'
                            style={{width: 310,marginBottom:1, marginLeft: 2,height:30, color:'#000000',}}
                            onFocus = {() => this.up()}
                            onEndEditing = {() => this.load()}
                            onChangeText={(text) => this.setState({email:text})}
                            value={this.state.email}
                        />
                        <View style = {{width:310, height:0.7, backgroundColor:'#d6d6d6',marginTop:2}} />
                    </View>
                    <View>
                        <TextInput
                            placeholder = 'Password'
                            placeholderTextColor = '#d6d6d6'
                            underlineColorAndroid='transparent'
                            secureTextEntry ={true}
                            autoCorrect = {false}
                            returnKeyType = {(this.state.login)?'next':'done'}
                            autoCapitalize = 'none'
                            style={{width: 310,marginBottom:1, marginLeft: 2, height:30,color:'#000000', marginTop:15}}
                            onChangeText={(text) => this.setState({password:text})}
                            onFocus = {() => this.up()}
                            onEndEditing = {() => this.load()}
                            value={this.state.password}
                        />
                        <View style = {{width:310, height:0.7, backgroundColor:'#d6d6d6',marginTop:2}} />
                    </View>
                    {(this.state.login)?
                        <View>
                            <TextInput
                                placeholder = 'Confirm Password'
                                placeholderTextColor = '#d6d6d6'
                                underlineColorAndroid='transparent'
                                secureTextEntry ={true}
                                autoCorrect = {false}
                                returnKeyType = {'done'}
                                autoCapitalize = 'none'
                                style={{width: 310,marginBottom:1, marginLeft: 2, height:30,color:'#000000', marginTop:15}}
                                onChangeText={(text) => this.setState({confirmPassword:text})}
                                onFocus = {() => this.up()}
                                onEndEditing = {() => this.load()}
                                value={this.state.confirmPassword}
                            />
                            <View style = {{width:310, height:0.7, backgroundColor:'#d6d6d6',marginTop:2}} />
                        </View>:null
                    }
                </Animated.View>

                <View style = {{flex:1,justifyContent:'flex-end', paddingBottom:20 }} >
                    <Text style = {{color:'red', fontSize:12, textAlign:'center', padding:15}} >{this.state.error}</Text>
                    <TouchableOpacity onPress = {()=>this.setState({login : !this.state.login, error:''})} >
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
    centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
})
export default Login
