import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import Svg from "react-native-svg";
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLegend,
  createContainer
} from "victory-native";

import Colors from "../constants/Colors";
import { getData } from '../utils/firebaseUtil';
import firebase from 'firebase';


import { VictoryTheme } from "victory-core";


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 50,
  },
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30
  }
});

const legendData = [
  {
    name: "BloodTest",
    symbol: {
      type: "circle",
      fill: "#006064"
    }
  },
  {
    name: "CTscan",
    symbol: {
      type: "circle",
      fill: "#00796B"
    }
  },
  {
    name: "Surgery",
    symbol: {
      type: "circle",
      fill: "#FFF59D"
    }
  }
];



export default class Chart extends React.Component {
  // constructor(props){
  // super(props);
  // this.state = {
  //   Flexon: [],
  //   CTscan: [],
  //   Surgery: []
  // }
  // this.update = this.update.bind(this);
  // }

  state = {
    BloodTest: [],
    CTscan: [],
    Surgery: []
  }

  alt(val){
    alert(val.toString());
  }

  componentDidMount(){
    var ref = firebase.database().ref('data_imgs');
    console.log("ffff");
         ref.on('value', (snapshot) => {
         const a = [];
         var s1="",s2="",s3="";
         snapshot.forEach((childSnapshot) => {
         var childData = childSnapshot.val();
         var t = JSON.parse(childData["data"]);
         // s1 = s1 + " " + t.BloodTest.toString();
         // s2 = s2 + " " + t.BloodTest.toString();
         // s3 = s3 + " " + t.BloodTest.toString();
         // s1 =  t.BloodTest.toString();
         // s2 =  t.CTscan.toString();
         // s3 =  t.Surgery.toString();
         console.log(t);
         s1 =  t.BloodTest.toString();
         s2 =  t.CTscan.toString();
         s3 =  t.Surgery.toString();
         //  a.push({
         //  f: t.BloodTest,
         //  c: t.CTscan,
         //  p: t.Surgery
         // });
        });
      var s = "BloodTest : " + s1 + "\n" + "Surgery : " + s2 +"\n" + "CTscan : " + s3;
      // console.log(s);
      this.alt(s);
        
      });

      //     var ref = firebase.database().ref('data_imgs');
      //    ref.on('value', function(snapshot){
      //    snapshot.forEach(function(childSnapshot){
      //     var childData = childSnapshot.val();
      //     console.log(childData["data"]);
      //     var t = JSON.parse(childData["data"]);
      //     let f = this.state.Flexon.slice();
      //     let c = this.state.Surgery.slice();
      //     let p = this.state.CTscan.slice();
      //     f.push(t.Flexon);
      //     c.push(t.Surgery);
      //     p.push(t.CTscan);

      //     this.setState({
      //       Flexon: f,
      //       CTscan: p,
      //       Surgery: c 
      //     })
      //     console.log("ffff");
      //   });
      // });
      //console.log(this.state.Flexon);
  }

  //   state = {
  //   Flexon: [],
  //   CTscan: [],
  //   Surgery: []
  // }

// componentDidMount(){
//   console.log("jai");
//   console.log(this.state.Flexon);
//   // this.update().then(()=>{
//   //   consloe.log("peace to hai!!");
//   // }); 
// }


  // componentDidMount(){
  //     //console.log(this.state.Flexon);
  //     var ref = firebase.database().ref('data_imgs');
  //     ref.on('value', function(snapshot){
  //       snapshot.forEach(function(childSnapshot){
  //         var childData = childSnapshot.val();
  //         console.log(childData["data"]);
  //         var t = JSON.parse(childData["data"]);
  //         let f = this.state.Flexon.slice();
  //         let c = this.state.Surgery.slice();
  //         let p = this.state.CTscan.slice();
  //         f.push(t.Flexon);
  //         c.push(t.Surgery);
  //         p.push(t.CTscan);

  //         this.setState({
  //           Flexon: f,
  //           CTscan: p,
  //           Surgery: c 
  //         })

  //         // Surgery.push(t.Surgery);
  //         // CTscan.push(t.CTscan);
  //         //console.log(this.state.has);

  //         // d.push(30);

  //       //this.setState({flexon: dictionary});
  //         // let f = this.state.flexon;
  //         // f.push(30);
  //         // this.setState({ 
  //         //   flexon:f
  //         // })
  //       });
  //     });


  // }
  
  renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 72,
          backgroundColor: Colors.mainStrong,
          paddingTop: 24,
          padding: 8,
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../assets/images/icons8-left_4.png")}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 4,
            color: "white"
          }}
        >
          Uploaded Documents
        </Text>
      </View>
    );
  }
  render() {









    return (
      <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content'/>
        {this.renderHeader()}
        <ScrollView
          contentContainerStyle={styles.container}
          style={{ flex: 1, backgroundColor: "#fff" }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.text,
              fontWeight: "600",
              fontSize: 18,
              marginTop: 28
            }}
          >
            Price Comparison for Lung Cancer Treatment
          </Text>
          <Text style={{fontWeight: '600', color: Colors.main, textAlign: 'center', fontSize: 24, marginTop: 8}}>38% Higher than Average</Text>
          <Svg width={Dimensions.get("window").width} height={200}>
            <VictoryLegend
              x={5}
              y={100}
              data={legendData}
              standalone={false}
              itemsPerRow={3}
            />
          </Svg>

          <VictoryChart domain={{ x: [0, 3] }}>
            <VictoryGroup offset={25} colorScale={"qualitative"}>
              <VictoryBar
                data={[
                  { x: 1, y: 100 },
                  { x: 2, y: 200 },
                  { x: 3, y: 300 }
                ]}
              />
              <VictoryBar
                data={[
                  { x: 1, y: 400 },
                  { x: 2, y: 500 },
                  { x: 3, y: 600 }
                ]}
              />
               <VictoryBar
                data={[
                  { x: 1, y: 700 },
                  { x: 2, y: 800 },
                  { x: 3, y: 900 }
                ]}
              />
        
            </VictoryGroup>
          </VictoryChart>
        </ScrollView>
      </View>
    );
  }
}
