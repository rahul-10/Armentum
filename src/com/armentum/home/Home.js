import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
var {height, width} = Dimensions.get('window');

export default class Home extends Component {
    render(){
        return(
            <View style = {{flex:1}} >
                <ImageBackground style = {styles.image} source = {require('../images/landing-page.png')} >
                    <View style = {styles.imageText} >
                        <Text style = {{fontSize:22, fontWeight: 'bold',color:'#FFFFFF'}} >Food</Text>
                        <Text style = {{fontSize:26, fontWeight: 'bold',color:'#FFFFFF'}} >Panda</Text>
                        <Text style = {{fontSize:14, fontWeight: '500',color:'#FFFFFF', marginVertical:5}} >WHAT A TWIST.</Text>
                        <Text style = {{fontSize:10, fontWeight: '500',color:'#FFFFFF'}} >The Panda, the iconic long, slim slickof bread, has traditionally one of the most potebnt symbols of french culture.</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    image:{
        height:height-35,
        width: width,
    },
    imageText:{
        height:height-45,
        width:200,
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0)',
        left: 30,
        justifyContent: 'center',
    }

});
