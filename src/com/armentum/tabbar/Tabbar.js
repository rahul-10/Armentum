import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Platform
} from 'react-native';
var {height, width} = Dimensions.get('window');

import { Router, Scene } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';

//***************** Home Tab ********************//
import Home from '../home/Home';

//***************** Menu Tab ********************//
import Menu from '../menu/Menu';

//***************** Message Tab ********************//
import Cart from '../orders/Cart';

//***************** Notification Tab ********************//
import Notification from '../home/Home';


const TabIcon = ({ selected, title }) => {
    var icon = '';
    var selectedIcon = ''
    var size = 35;
    //var verticalSize: 35
    if(title == 'Home'){
        icon = require('../images/tab/Home_Btn_nrm.png');
        selectedIcon = require('../images/tab/Home_Btn.png');

    }
    else if(title == 'Menu'){
        icon = require('../images/tab/Menu_Btn_nrm.png');
        selectedIcon = require('../images/tab/Menu_Btn.png');

    }
    else if(title == 'Cart'){
        icon = require('../images/tab/Order_Btn_nrm.png');
        selectedIcon = require('../images/tab/Order_Btn.png');

    }
    else if(title == 'Notification'){
        icon = require('../images/tab/Notifi_Btn_nrm.png');
        selectedIcon = require('../images/tab/Notifi_Btn.png');

    }
    else{
        //console.log("logog");
        icon = require('../images/tab/Logo.jpg');
        selectedIcon = require('../images/tab/Logo.jpg');
        size=70;
    //    verticalSize= 25
    }

  return (
    <View style = {[estyles.tab, {backgroundColor:(selected && title!='Logo')?'#F67C01':null,  }]}>
        <Image  style={{ width: size, height:20, resizeMode:'stretch', marginHorizontal:(title == 'Logo')?18:2,}} source={(selected)?selectedIcon:icon} />
    </View>
  );
}

export default class Tabbar extends Component {

  render() {
    return (
        <Router>
          <Scene key="root">
            {/* Tab Container */}
            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={estyles.tabBar}
            >

            <Scene key="tab0" title="Logo" icon={TabIcon} >
                <Scene
                  key="logo"
                  component={Home}
                  title="Home"
                  hideNavBar={true}
                  sceneStyle={estyles.scene}
                />
            </Scene>
              {/* Tab and it's scenes */}
                <Scene key="tab1" title="Home" icon={TabIcon} initial >
                    <Scene
                      key="home"
                      component={Home}
                      title="Home"
                      hideNavBar={true}
                      sceneStyle={estyles.scene}
                    />
                </Scene>

              {/* Tab and it's scenes */}
                <Scene key="tab2" title="Menu" icon={TabIcon}  >
                    <Scene
                      key="menu"
                      component={Menu}
                      hideNavBar={true}
                       sceneStyle={estyles.scene}
                    />
                </Scene>

                {/* Order's scene */}
                <Scene key="tab3" title="Cart" icon={TabIcon}  >
                    <Scene
                      key="cart"
                      component={Cart}
                      hideNavBar={true}
                       sceneStyle={estyles.scene}
                    />
                </Scene>

                {/* Notification's Tab */}
                <Scene key="tab4" title="Notification" icon={TabIcon}>
                    <Scene
                      key="notification"
                      component={Notification}
                      hideNavBar={true}
                       sceneStyle={estyles.scene}
                    />
                </Scene>

            </Scene>
        </Scene>
    </Router>
    );
  }
}

const estyles = EStyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        height:35,
    },
    tab:{
        height:35,
        width:75,
        alignItems: 'center',
        justifyContent:'center',
    },
    scene: {
        flex:1,
        paddingTop:(Platform.OS === 'ios') ? 15 : 0,
        paddingBottom:35,
        backgroundColor:'#F7F7F7'
    },
});
