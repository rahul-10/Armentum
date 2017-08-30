import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
var {height, width} = Dimensions.get('window');
import { connect } from 'react-redux';
import Card from '../component/Card';
import Header from '../component/header/Header';
import { addCard } from '../component/header/actions';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
                likings : [{name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }, {name:'Cafe 5H by The Kitchen', address:'Lowrence Road', type:'Casual Dining', isOpen:true, rating:'3.9', url: require('../images/menu/imgmenu1.png'), isFavourite:false }]
            }
        console.log("Cart");
    }

    showAmount(text, amount){
        return(
            <View style = {{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-start',paddingHorizontal:5, marginLeft:60,marginTop:10, backgroundColor:'#F7F7F7' }} >
                <View style = {[estyles.cardSubContainer,{alignItems:'flex-end', justifyContent:'space-between', paddingRight:10}]} >
                    <Text style = {{fontSize:10}} >{text}</Text>
                </View>
                <View style = {[estyles.cardRightContainer,{alignItems:'flex-end'}]} >
                    <Text style = {{fontSize:10, }} >{amount}</Text>
                </View>
            </View>
        );
    }

    showCard(){
        return(
            <View style = {[estyles.subContainer, {backgroundColor:'#FBFBFB'}]} >
                <View style = {{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:10}} >
                    <Text style = {{fontSize:12}} >MOETS CURRY LEAF</Text>
                    <Text style = {{fontSize:12}} >$2.99</Text>
                </View>
                <View style = {estyles.cardContainer}>
                    <Image style = {{height:50, width:60, resizeMode:'cover', alignSelf:'center'}} source = {require('../images/menu/imgmenu1.png')} />
                    <View style = {{flex:1, padding:5}} >
                        <Text style = {{fontSize:12}} >Noodle Soup</Text>
                        <View style = {{flex:1, flexDirection:'row', alignItems:'center'}} >
                            <View style = {estyles.cardSubContainer} >
                                <Text style = {{fontSize:10, color:'#989898'}} >Boilded noodle served in a pot with a broth</Text>
                            </View>
                            <View style = {[estyles.cardRightContainer, {flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}]} >
                                <Text style = {{fontSize:10, }} >$112.99</Text>
                                <View style = {{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}} >
                                    <TouchableOpacity style = {[estyles.quantity,{marginLeft:12}]} ><Text  style = {{fontSize:12, color:'#989898'}} >+</Text></TouchableOpacity>
                                    <Text style = {{fontSize:12, color:'#000000'}} >1</Text>
                                    <TouchableOpacity style = {estyles.quantity} ><Text  style = {{fontSize:12, color:'#989898' }} >-</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    billSummary(){
        return(
            <View style = {[estyles.subContainer, {backgroundColor:'#F7F7F7'}] }>
                <View >
                    {this.showAmount('SUB TOTAL', '$122.99')}
                    {this.showAmount('SERVICE TAX(15%)', '$2.99')}
                    <View  style = {[estyles.line, {marginTop:10}]} />
                    {this.showAmount('GRAND TOTAL', '$152.99')}
                </View>
                <TouchableOpacity style = {estyles.button}>
                    <Text style= {{fontSize:12, color:'#FFFFFF', fontWeight:'500'}} >COMPLETE ORDER</Text>
                </TouchableOpacity>
            </View>
        );
    }

    checkFavourite(data, index){
        const temp = this.state.likings;
        console.log(temp);
        if(temp[index].isFavourite)
            this.props.addCard(-1);
        else
            this.props.addCard(1);
        temp[index].isFavourite = !(temp[index].isFavourite) ;
        this.setState({
            options:temp
        })

    }

    showRecommendationUtil(){
        return(
            this.state.likings.map((data, index) => {
                //console.log(data.rating);
                return(
                    <View key = {index} >
                        <Card data = {data} index = {index} checkFavourite = {() => this.checkFavourite(data,index)} />
                    </View>
                );
            })
        );
    }

    showRecommendation(){
        return(
            <View style = {[estyles.subContainer, { backgroundColor:'#FFFFFF', alignSelf:'flex-end'}]} >
                <Text style = {{fontSize:12, marginBottom:10}} >YOU MAY ALSO LIKE </Text>
                <ScrollView horizontal = {true} style = {estyles.width}>
                    <View style = {[estyles.ubContainer, {flexWrap:'nowrap', flexDirection:'row', alignItems:'center'}]} >
                        {this.showRecommendationUtil()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    render(){
        return(
            <View style = {estyles.container} >
                <Header _totalCard = {this.props._totalCard} centerText = {'Cart'} rightIcon = {false} />
                <ScrollView  >
                    {this.showCard()}
                    {this.billSummary()}
                    {this.showRecommendation()}
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
    subContainer: {
        width:'100%',
        padding:8,
        alignSelf:'center',

    },
    cardContainer:{
        flex:1, flexDirection:'row',
        backgroundColor:'#FFFFFF',
        padding:5,
        borderWidth:1,
        borderColor:'#EAEAEA',

    },
    cardSubContainer:{
        width:'60%',
    },
    cardRightContainer: {
        width:'17%',
    },
    quantity:{
        height:17, width:17,borderRadius:17, backgroundColor:'#FFFFFF',
        justifyContent:'center', alignItems:'center',
        borderWidth:1,borderColor:'#989898'
    },
    line:{
        backgroundColor:'grey',
        height:0.7,
        width:'100%'
    },
    button:{
        paddingHorizontal:30,
        paddingVertical:10,
        alignSelf:'flex-end',
        backgroundColor:'#F76C01',
        marginVertical:15
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
    },
    width:{
        width:'100%'
    }
})

const mapStateToProps = (state) => {
  const { _totalCard } = state.object;
  //console.log(center);
  return { _totalCard};
};

export default connect(mapStateToProps,
    { addCard})(Cart);
