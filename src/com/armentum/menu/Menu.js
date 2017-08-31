import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity,  } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
var {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';

import Header from '../component/header/Header';
import { addCard } from '../component/header/actions';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            options : [{name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }],
            //animatedValue: new Animated.Value(12),
        }
    }

    checkFavourite(data, index){
        const temp = this.state.options;
        if(temp[index].isFavourite)
            this.props.addCard(-1);
        else
            this.props.addCard(1);
        temp[index].isFavourite = !(temp[index].isFavourite) ;
        this.setState({
            options:temp
        })
    }

    showCard(){
        return(
            this.state.options.map((data, index) => {
                //console.log(data.rating);
                return(
                    <View style = {estyles.card} key = {index}>
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
                                    <TouchableOpacity onPress = {() => {this.checkFavourite(data, index)}}>
                                        <Image style = {{height:12, width:12, resizeMode:'contain', tintColor:(data.isFavourite)?'#F67C01':'#000000'}} source = {require('../images/star.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })
        );
    }

    render(){
        console.log(this.props._totalCard);
        return(
            <View style = {estyles.container} >
                <Header _totalCard = {this.props._totalCard} leftText = {'We are happy to serve you!'} centerText = {'Menu'} rightIcon = {true} />
                <Image style = {{height:130, width:width}} source = {require('../images/Head_Image.png')} />
                <ScrollView>
                    <View style = {estyles.subContainer} >
                        {this.showCard()}
                    </View>
                </ScrollView>

            </View>
        );
    }

}

const estyles = EStyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#F7F7F7",
        alignSelf:'center',
    },
    imageContainer:{
        height:'40%',
        width:'100%',
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    },
    subContainer: {
        flex:1,
        padding:10,
        backgroundColor:"#FFFFFF",
        flexDirection:'row',
        flexWrap:'wrap',
        alignSelf:'center',
        justifyContent:'space-between'
    },
    card:{
        width:'33.2%',
        backgroundColor:'#FFFFFF',
        borderRadius:3,
        borderColor:'green',
        marginBottom:4
    },
    image:{
        height:70,
        width:'100%',
        resizeMode:'cover'
    }
})

const mapStateToProps = (state) => {
  const { _totalCard } = state.object;
  //console.log(center);
  return { _totalCard};
};

export default connect(mapStateToProps,
    { addCard})(Menu);
