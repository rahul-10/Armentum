import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

var nthis;
const capMapLine = '';
const colorMapLine = '';
const flagMapLine = false;

const latlongMapLine = [];
var ltlg = [];
var region = '';
var lastCenter = '';

class Map extends Component {

    constructor(props) {
        super(props);
      // console.log("child constructor");
        nthis = this;
        region = {
            latitude: 28.4595,
            longitude: 77.0266,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    //    console.log(region);
    }

    onRegionChange(region) {
        let center = {
            latitude : region.latitude,
            longitude : region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        region = center ;
        console.log(region);
    }

    drawMarker() {
       console.log(this.props._drawMarker);

       if (!this.props._drawMarker ) {
         //  console.log("inside");
           return null;
       }
      // console.log(ltlg);
        ltlg.push(this.props._drawMarker);
        return (this.printMarker());
    }

// REMVOVES ALL MARKERS
    clearMarker() {
        //console.log(ltlg);
        //console.log(this.props.removeMarkerId);
        if(!this.props.removeMarkerId || this.props.removeMarkerFlag)
            return null;
        var x = -1;
        for(let i in ltlg ) {
            //console.log(ltlg[i].removeMarkerId );
            if(ltlg[i].id == this.props.removeMarkerId) {
                x = i;
                //console.log("x : " + x);
                break;
            }
        }
        if( x  >=  0 )
            ltlg.splice(x, 1);
        //console.log("clear : " + ltlg);
        return (this.printMarker());

    }

    clearAllMarker() {
        if(this.props.removeMarkerFlag){
            ltlg = [] ;
            //console.log("clearALL : " + ltlg);
            //return (this.printMarker());
        }
    }

    clickMarker() {
        console.log("makerrrrrrrr");
    }

    printMarker(){
        //console.log(ltlg);
        return ltlg.map((data, i) => (
            <TouchableOpacity key = {i} onPress = {() => this.clickMarker()}>
                <MapView.Marker
                    coordinate={{ latitude: data.location.latitude, longitude: data.location.longitude }}
                    title={data.title}
                    key={i}

                />
            </TouchableOpacity>
        ));
    }

    drawLine() {
        //console.log(this.props._drawLine);
        if(this.props._drawLine) {
            //console.log('drawLine');
            latlongMapLine.push(this.props._drawLine);
            //console.log(this.props._drawLine[0]);
            return latlongMapLine.map((data, i) => (
                <MapView.Polyline
                  coordinates={data}
                  key={i}
                />
            ));
        }else {
            latlongMapLine = [];
        }
    }

    showMap(){
    //   console.log("region : ")
    //    console.log(nthis.region);
        var location = region ;
        //console.log(nthis.props.center);
        if(nthis.props.center && (!lastCenter || (lastCenter.latitude != nthis.props.center.latitude) || (lastCenter.longitude != nthis.props.center.longitude))) {
        //    console.log(nthis.props.center);
            location = nthis.props.center ;
            lastCenter = nthis.props.center;
        }
       console.log(location);

        return(
            <MapView
              provider={PROVIDER_GOOGLE}
              style={estyles.map}
              region={location}
              onRegionChange={this.onRegionChange}
            >
            { nthis.drawMarker() }
            { nthis.clearMarker() }
            { this.clearAllMarker() }

            { this.drawLine() }

            </MapView>
        );
    }


  render() {
    //  console.log("child");
    return (
      <View style={styles.container}>
          {this.showMap()}
      </View>
    );
  }
}

const estyles = EStyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Map;
