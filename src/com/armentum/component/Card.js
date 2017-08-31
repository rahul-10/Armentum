import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
var {height, width} = Dimensions.get('window');

export default class Card extends Component {



    render(){
        const { data, index } = this.props;
        return(
            <View style = {estyles.container} >
                <View style = {estyles.card} >
                    <Image style = {estyles.image} source = {data.url} />
                    <View style = {{padding:5}} >
                        <View>
                            <Text style = {{fontSize:10, fontWeight:'400',marginTop:5, color:'#000000'}} >{data.name}</Text>
                            <Text style = {{fontSize:8, fontWeight:'400', color:'#898989'}} >{data.address}, {data.type}</Text>
                        </View>
                        <View style = {{flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:5}} >
                            <Text style = {{fontSize:10, fontWeight:'500', color:"#F67C01"}} >{(data.isOpen)?'Open Now':'Closed Now'}</Text>
                            <View style = {{flexDirection:'row',alignItems:'center'}} >
                                <Text style = {{fontSize:10, fontWeight:'400', marginRight:3, color:"#F67C01"}} >{data.rating}</Text>
                                <TouchableOpacity onPress = {this.props.checkFavourite}>
                                    <Image style = {{height:12, width:12, resizeMode:'contain', tintColor:(data.isFavourite)?'#F67C01':'#000000'}} source = {require('../images/star.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const estyles = EStyleSheet.create({
    container:{
        height:'100%',
        width: '100%',
        paddingRight:1,
    },
    image:{
        height:70,
        width:'100%',
        resizeMode:'cover'
    },
    width:{
        width:'100%'
    }
})
