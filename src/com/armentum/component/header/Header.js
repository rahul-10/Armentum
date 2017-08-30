import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
var {height, width} = Dimensions.get('window');

export default class Header extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style = {styles.container} >
                <View>
                    {(this.props.leftText)?<Text style = {{fontSize:10, color:'#FFFFFF'}} >{this.props.leftText}</Text>
                    :<Image style = {{height:12, width:12, resizeMode:'contain',}} source = {require('../../images/back.png')} />}
                </View>
                <Text style = {{color:'#FFFFFF', fontSize:10, textAlign:'center'}} >{this.props.centerText}</Text>
                <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'center', alignSelf:'flex-end'}} >
                    <View style = {{flexDirection:'row', alignItems:'center'}} >
                        <Image style = {{height:12, width:12, resizeMode:'contain'}} source = {require('../../images/Cart.png')} />
                        <View style = {styles.cart} ><Text  style = {{fontSize:8, color:'#F67C01'}} >{this.props._totalCard}</Text></View>
                    </View>
                    {(this.props.rightIcon)?<Image style = {{height:12, width:12, resizeMode:'contain', marginLeft:10}} source = {require('../../images/Search.png')} />:null}
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container:{
        height:30,
        width:width,
        backgroundColor:'#F67C01',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingHorizontal:10

    },
    cart:{
        height:11, width:11,borderRadius:11, backgroundColor:'#FFFFFF',marginBottom:15,
        justifyContent:'center', alignItems:'center'
    }

});
