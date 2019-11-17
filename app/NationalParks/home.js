import React from "react";
import { ActivityIndicator, Text, View, Button, FlatList } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Finnish forests',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  // componentDidMount(){
    // return fetch('http://192.168.43.61:3000/api/routes')
    // // return fetch('http://facebook.github.io/react-native/movies.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {

    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson,
    //     }, function(){
    //       console.log(this.state.dataSource)
    //     });

    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
    // }
    

  render() {
    
    // if(this.state.isLoading){
    //   return(
    //   <View style={{flex: 1, padding: 20}}>
    //     <ActivityIndicator/>
    //   </View>
    //   )
    //  }
    
    return (
      <View style={{ flex: 1, margin: 40}}>
        <Text>Welcome to the app for Finnish Forests!{"\n"}{"\n"}
        </Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Map');
          }}
          title="Map"
          color="#ec0000"
        />
        
        {/* <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Text>{item.name}, {item.status}, {item.coordinates[0][0]}</Text>}
            keyExtractor={({id}, index) => id}
          />
        </View> */}
      </View>

    );
  }   
}