

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  SectionList,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var parseString = require('react-native-xml2js').parseString;

type Props = {};

class App extends Component {
   state = {
      data: [{"key":"value"}]   
   }

   
   componentDidMount = () => {

    var that = this;
      fetch('http://pulse.zerodha.com/feed.php', {
         method: 'GET'
      })
      .then((response) => response.text())
      .then((responseJson) => {

           console.log(responseJson);

           parseString(responseJson, {trim: true}, function (err, result) {

                    
                    

                    var objarray =[]



                    for (var i = 0; i < result.rss.channel[0].item.length; i++) {
                         var obj = result.rss.channel[0].item[i];

                         objarray.push({
                          "Title":obj.title,
                          "Link":obj.link,
                          "Desc":obj.description,
                          "Date":obj.pubDate
                         })

                      }

                      that.setState({data:objarray});

                });

         
      }).catch((error) => {
         console.error(error);
      });

   }

   

   render() {
      return (
      <View style={styles.separator}>
       <FlatList
       style={styles.separator}
          data={this.state.data}
          renderItem={({item}) => 
         <View style={styles.separator}>
                <Image style={styles.image} source={{uri: 'https://digitalmarketinghelp.live/wp-content/uploads/2017/06/rss-40674_960_720.png'}}/>
                 <Text numberOfLines={1} ellipsizeMode ={'tail'} style={styles.item}>
                 {item.Title}
                 </Text>
                 <Text numberOfLines={2} ellipsizeMode ={'tail'}style={styles.subitem}>{item.Desc}</Text>
                 <Text numberOfLines={2} ellipsizeMode ={'tail'}style={styles.linkitem}> {item.Link}</Text>
         </View>
 }
        />
      </View>
    );
   }
}


export default App 

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10,
   marginTop: 3,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',

  },
  image: {
     marginTop: 2,
    width: 500,
    height: 120,
  },
  item: {
    marginTop: 2,
    fontSize: 18,
    height: 44,
    color: '#000000'
  },
   subitem: {
    marginTop: 2,
    fontSize: 14,
    height: 44,
    color: '#000000'
  },
   linkitem: {
    marginTop: 2,
    fontSize: 12,
    height: 44,
    color: '#000000'
  },
   separator: {
  flex: 1, 
  borderWidth: 2, 
  borderColor: '#efefef'
 },
})

