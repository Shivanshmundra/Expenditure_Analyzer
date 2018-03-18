import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  StatusBar
} from "react-native";
import { Camera, Permissions, Asset } from "expo";
import Colors from "../constants/Colors";
import {uploadPicture, uploadData} from '../utils/firebaseUtil';
import Loading from '../components/LoadingModal';
const { width, height } = Dimensions.get("window");
import { checkForLabels } from './ocr'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    taken: false,
    uri: null,
    loading: false,
    jsonInput: null,
    dict: [],
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  takePicture = async () => {
    console.log("taking picture");
    if (this.camera) {
      const options = {
        quality: 0,
        base64: true
      };
      this.camera.takePictureAsync(options).then(({ uri, base64 }) => {
        // console.log(data);
        // this.setState({ uri, base64, taken: true });
        this.setState({ uri: uri, base64, taken: true });
        console.log(uri);
        console.log("uri loaded");
      });
    }
  };

  // foo(input){
  //     console.log(input);
  //    }


 async upload() {
      this.setState({loading: true})
      const options = {
        format: 'jpeg',
        quality: 0,
        result: 'base64',
        height: 534,
        width: 300
      }

     


      Expo.takeSnapshotAsync(this.image, options).then((data) => {
        if(this.state.base64){
          console.log("shivansh!!");
        }


        //console.log(data);
      
        uploadPicture(this.state.base64).then(() => {
          console.log("Dict is printing");
          console.log(this.state.dict);
          this.setState({loading: true});
        });
      })



    
      checkForLabels(this.state.base64)
     .then((responseJson) => {
      console.log("Flag2");
      //console.log(JSON.stringify(responseJson));
      this.setState({jsonInput: JSON.stringify(responseJson)});
      console.log(this.state.jsonInput);
      let s = JSON.parse(this.state.jsonInput);
      let str = JSON.stringify(s.responses[0].textAnnotations[0].description);
      console.log(s.responses[0].textAnnotations[0].description);  
      //let res = str.split("\n");
      let res1 = s.responses[0].textAnnotations[0].description.split("\n");
      //console.log(res);
      console.log(res1);
      var dictionary = { 
        BloodTest: (Number(res1[3])),
        CTscan: (Number(res1[4])),
        Surgery: (Number(res1[5]))
      };

      this.setState({dict: dictionary});
      uploadData(JSON.stringify(this.state.dict)).then(() => {
          console.log("Dict is printing");
          console.log(this.state.dict);
           this.setState({loading: false})
            this.props.navigation.goBack();
        });
    });
    


     //  let base_image = this.state.base64;
     // let result = async (base_image) => {
     //    try{
     //      console.log("Flag1");
     //      let aa = await checkForLabels(this.state.base64);
     //      console.log(aa);
     //      console.log("Flag2");
     //    }catch(error){
     //      console.log(error);
     //    }
     //  }





    
     //console.log(this.state.jsonInput);


      // let result = await checkForLabels(this.state.base64);
      // console.log(result);
     
      // uploadPicture(data).then(() => {
      //   this.setState({loading: false})
      //     this.props.navigation.goBack();
      // });
  
}
  renderCamera() {
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        style={{ flex: 1 }}
        type={this.state.type}
        autoFocus={"on"}
      >
        <Image
          style={{ position: "absolute", top: 40, left: 0, width, height }}
          source={require("../assets/images/bill.png")}
        />
        <View
          style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
        >
          <TouchableHighlight onPress={() => this.takePicture()}>
            <Image
              style={{ width: 48, height: 48, marginBottom: 24 }}
              source={require("../assets/images/icons8-camera.png")}
            />
          </TouchableHighlight>
        </View>
      </Camera>
    );
  }

  renderImage() {
    const { uri } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Image ref={ref => this.image = ref} style={{ flex: 1, paddingTop: 24 }} source={{ uri }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 8,
            height: 48,
            backgroundColor: "white"
          }}
        >
          <TouchableOpacity
            hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            onPress={() => this.setState({ taken: false, uri: "" })}
          >
            <Text style={{ fontSize: 18, color: Colors.main }}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 8, right: 8, left: 8, bottom: 8 }}
            onPress={() => this.upload()}
          >
            <Text style={{ fontSize: 18, color: Colors.textBlack }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { hasCameraPermission, taken, loading } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      this.props.navigation.goBack();
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" animated={true} />
          
          {taken ? this.renderImage() : this.renderCamera()}
          <Loading visible={loading} text={'Uploading Document'}/>
        </View>
      );
    }
  }
}
