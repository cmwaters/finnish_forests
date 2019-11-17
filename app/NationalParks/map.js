import React from "react";
import { Image, Text, View, Animated, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Geolocation from 'react-native-geolocation-service';
import { StyleSheet, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

import Image1 from "./nuuksio_pictures/P1.png"
import Image2 from "./nuuksio_pictures/P2.png"
import Image3 from "./nuuksio_pictures/P3.png"
import Image4 from "./nuuksio_pictures/P4.png"
import Image5 from "./nuuksio_pictures/P5.png"
import Image6 from "./nuuksio_pictures/P6.png"
import Image7 from "./nuuksio_pictures/P7.png"
import Image8 from "./nuuksio_pictures/P8.png"

const Images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8]

const GOOGLE_MAPS_APIKEY = 'AIzaSyBMRCiX3Yb5p4xmroZSzibPenQ4LZYjOVM';

const markers = [[1043, 22436, 60.303525451006834, 24.550391008969527],
[1050, 8207, 60.27581963490531, 24.463689284278516],
[1225, 3854, 60.29819039594651, 24.45628974906327],
[1246, 10127, 60.28242199633351, 24.505873789599413],
[912, 16374, 60.326924542956334, 24.495358359272675],
[922, 2218, 60.33073081360451, 24.492838046488888],
[871, 8322, 60.31295694299057, 24.447281862291263],
[1122, 7860, 60.24969716104745, 24.698307563459544]]

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 4 * 3;
const CARD_HEIGHT = CARD_WIDTH / 3 * 2;



const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 7,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 5,
    overflow: "hidden",
  },
  textContent: {
    flex: 1,
  },
  cardimage:{
    padding: -5,
    width: CARD_WIDTH,
    height: CARD_HEIGHT / 3,

  },
  cardtitle: {
    padding: 5,
    fontFamily: "Roboto",
    fontSize: 18,
  },
  cardDescription: {
    paddingLeft: 5,
    fontSize: 12,
    color: "#757575",
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
  },
  endPadding: {
    paddingRight: 30,
    paddingLeft: 40,
  },
});

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 60.273316, 
        longitude: 24.592991,
        latitudeDelta: 0.0812,
        longitudeDelta: 0.0111,
      },
      routes : [],
    };

    this.index = 0;
    this.animation = new Animated.Value(0);
    this.callouts = [];

    this.handleCardPress = this.handleCardPress.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.hasLocationPermission = this.hasLocationPermission.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.drawRoute = this.drawRoute.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  drawRoute(coordinates) {
    size = coordinates.length
    waypoints = []
    if (size > 2) {
      for (i = 1; i < size - 1; i++){
        waypoints.push(
          {
            location: coordinates[i],
            stopover: false
          } 
        )
      }
    }
    this.setState({ waypoints })
  }

  hasLocationPermission = async () => {
    // if (Platform.OS === 'ios' ||
    //     (Platform.OS === 'android' && Platform.Version < 23)) {
    //   return true;
    // }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    // if (status === PermissionsAndroid.RESULTS.DENIED) {
    //   ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    // } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //   ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    // }

    return false;
  }


  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false });
        },
        (error) => {
          this.setState({ location: error, loading: false });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
    });
  }

  handleCardPress(index) {
    console.log("touched"),
    this.setState({selectedRouteIndex: index})
    // this.scroll.getNode().scrollTo({x: index * (CARD_WIDTH + 2 * styles.card.marginHorizontal), animated: false});
  }

  componentDidMount() {

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.routes.length) {
        index = this.state.routes.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinates } = this.state.routes[index];
          console.log("route: ",this.state.routes[index])
          console.log("coordinates: ", coordinates[0].lat)
          this.setState({selectedRouteIndex: index})
          console.log("region: ", this.state.region),
          this.map.animateToRegion(
            {
              latitude: coordinates[0].lat,
              longitude: coordinates[0].lng,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            200
          );
        }
      }, 0);
    });

    this.getLocation()
  

    return fetch('http://192.168.43.61:3000/api/routes')
    // return fetch('http://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          routes: responseJson,
        }, function(){
          console.log(this.state.routes)
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }

  render() {
    if(this.state.isLoading){
      return(
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
      )
     }

    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={map => this.map = map}
          style={styles.mapStyle}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
        >
          {this.state.routes.map((routes, index) => (
            <MapViewDirections key={index}
            origin={this.state.selectedRouteIndex === index ? { latitude: routes.coordinates[0].lat, longitude: routes.coordinates[0].lng } : null}
            // origin={{ latitude: routes.coordinates[0].lat, longitude: routes.coordinates[0].lng }}
            destination={this.state.selectedRouteIndex === index ? { latitude: routes.coordinates[routes.coordinates.length - 1].lat, longitude: routes.coordinates[routes.coordinates.length - 1].lng } : null}
            // destination={{ latitude: routes.coordinates[routes.coordinates.length - 1].lat, longitude: routes.coordinates[routes.coordinates.length - 1].lng }}
            waypoints = {this.state.selectedRouteIndex === index ? routes.waypoints : null}
            apikey={GOOGLE_MAPS_APIKEY}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="hotpink"
            />
            // ))
          ))}

      

        </MapView>
        <Animated.ScrollView
          horizontal
          ref={scroll => {this.scroll = scroll}} 
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          disableIntervalMomentum={true}
          snapToInterval= { CARD_WIDTH + 2 * styles.card.marginHorizontal}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.routes.map((routes, index) => (
            <TouchableWithoutFeedback key={index} onPress={(event) => this.handleCardPress(index)}>
              <View style={styles.card} key={index} onClick >
                <View style={styles.textContent}>
                  <Image source={Images[index]} />
                  <Text numberOfLines={1} style={styles.cardtitle}>{routes.name}</Text>
                  <Text numberOfLines={2} style={styles.cardDescription}>
                    {routes.status} {routes.duration}
                  </Text>
                  <Text numberOfLines={2} style={styles.cardDescription}>
                    {routes.description}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </Animated.ScrollView>

      </View>
    );
  }
}


