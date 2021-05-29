import React from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function ReadBlog(props) {
  const BlogHead = props.route.params.BlogHead;
  const BlogContent1 = props.route.params.BlogContent1;
  const BlogContent2 = props.route.params.BlogContent2;
  const ImageUri = props.route.params.ImageUri;

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={styles.topContainer}>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 15,
            padding: 5,
            color: 'black',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          KRTEX
        </Text>
      </View> */}
        <View>
          <Image
            style={{
              width: '100%',
              height: 250,
              resizeMode: 'stretch',
            }}
            source={ImageUri}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17, padding: 3}}>
            {BlogHead}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'aerial',
              fontSize: 15,
              letterSpacing: 1,
              padding: 10,
            }}>
            {BlogContent1}
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'aerial',
              fontSize: 15,
              letterSpacing: 1,
              padding: 10,
            }}>
            {BlogContent2}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
          <TouchableOpacity
            style={{
              width: 150,
              backgroundColor: 'skyblue',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              borderRadius: 10,
            }}
            onPress={() => props.navigation.navigate('HomeScreen')}>
            <Text style={{fontSize: 19}}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 0.11,
    backgroundColor: '#e6e6fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
