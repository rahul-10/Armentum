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
                hotels : [{name:'MOETS CURRY LEAF', amount:5.98,dishes:[{url: require('../images/menu/imgmenu1.png'), name:'Noodle Soup', des:'Boiled noodle serverd in a pot with broth', quantity:1, rate:2.99}, {url: require('../images/menu/imgmenu1.png'), name:'Noodle Soup', des:'Boiled noodle serverd in a pot with broth', quantity:1, rate:2.99}] }, {name:'MOETS CURRY LEAF', amount:5.98,dishes:[{url: require('../images/menu/imgmenu1.png'), name:'Noodle Soup', des:'Boiled noodle serverd in a pot with broth', quantity:1, rate:2.99}, {url: require('../images/menu/imgmenu1.png'), name:'Noodle Soup', des:'Boiled noodle serverd in a pot with broth', quantity:1, rate:2.99}] } ],
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
                    <Text style = {{fontSize:10, }} >${amount}</Text>
                </View>
            </View>
        );
    }

    changeQuantity(id, index, index2){
        let temp = this.state.hotels;
        console.log(temp);
        console.log(temp[index].dishes[index2].quantity);
        if(id == 1 && temp[index].dishes[index2].quantity < 6){
            temp[index].amount += temp[index].dishes[index2].rate;
            temp[index].amount = Math.round(temp[index].amount*100)/100 ;
            temp[index].dishes[index2].quantity += 1;
        }else if(id == 2 && temp[index].dishes[index2].quantity > 1){
            temp[index].amount -= temp[index].dishes[index2].rate;
            temp[index].amount = Math.round(temp[index].amount*100)/100 ;
            temp[index].dishes[index2].quantity -= 1;
        }
        this.setState({hotels : temp})
    }

    showSubCard(data, index){
        const  dishes = data.dishes;
        return(
            dishes.map((dish, index2) => {
                return(
                    <View style = {estyles.cardContainer} key = {index2}>
                        <Image style = {{height:50, width:60, resizeMode:'cover', alignSelf:'center'}} source = {dish.url} />
                        <View style = {{flex:1, padding:5}} >
                            <Text style = {{fontSize:12}} >{dish.name}</Text>
                            <View style = {{flex:1, flexDirection:'row', alignItems:'flex-start'}} >
                                <View style = {estyles.cardSubContainer} >
                                    <Text style = {{fontSize:10, color:'#989898'}} >{dish.des}</Text>
                                </View>
                                <View style = {[estyles.cardRightContainer, {flex:1, flexDirection:'row', alignItems:'center', }]} >
                                    <Text style = {{fontSize:10, marginLeft:5}} >${Math.round(dish.rate * dish.quantity*100)/100 }</Text>
                                    <View style = {{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}} >
                                        <TouchableOpacity style = {[estyles.quantity,{marginRight:5}]} onPress = {() => this.changeQuantity(1,index,index2)}>
                                            <Text  style = {{fontSize:12, color:'#989898'}} >+</Text>
                                        </TouchableOpacity>
                                        <Text style = {{fontSize:12, color:'#000000', marginRight:5}} >{dish.quantity}</Text>
                                        <TouchableOpacity style = {estyles.quantity} onPress = {() => this.changeQuantity(2,index,index2)} >
                                            <Text  style = {{fontSize:12, color:'#989898' }} >-</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                );
            })
        );
    }

    showCard(){
        const { hotels } = this.state;
        return(
            hotels.map((data, index) => {
                return(
                    <View style = {[estyles.subContainer, {backgroundColor:'#FBFBFB'}]} key = {index}>
                        <View style = {{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:10}} >
                            <Text style = {{fontSize:12}} >{data.name}</Text>
                            <Text style = {{fontSize:12}} >${data.amount}</Text>
                        </View>
                        {this.showSubCard(data, index)}
                    </View>
                );
            })
        );
    }

    billSummary(){
        const { hotels } = this.state;
        let subTotal = 0;
        hotels.map((data, index)=>{
            subTotal += data.amount;
        })
        let tax = Math.round(subTotal*0.18*100)/100 ;
        let grandTotal = Math.round((subTotal + tax)*100)/100 ;
        return(
            <View style = {[estyles.subContainer, {backgroundColor:'#F7F7F7'}] }>
                <View >
                    {this.showAmount('SUB TOTAL', subTotal)}
                    {this.showAmount('GST (18%)', tax)}
                    <View  style = {[estyles.line, {marginTop:10}]} />
                    {this.showAmount('GRAND TOTAL', grandTotal)}
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
        borderWidth:0.5,
        borderColor:'#EAEAEA',

    },
    cardSubContainer:{
        width:'60%',
    },
    cardRightContainer: {
        width:'17%',
    },
    quantity:{
        height:18, width:18,borderRadius:18, backgroundColor:'#FFFFFF',
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
