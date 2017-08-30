import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Scene, Router} from 'react-native-router-flux';

import Tabbar from './tabbar/Tabbar';
import Login from './login/Login';



EStyleSheet.build({
  $textColor: 'green' // variable
});


export default class Navigation extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <Router>
                <Scene key="root">
                    <Scene key="login" component={Login} initial={true} hideNavBar={true} />
                    <Scene key="tabbar" component={Tabbar} hideNavBar={true} initial/>
                </Scene>
           </Router>
        );
    }

}
