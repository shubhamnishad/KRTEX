import React from 'react';
import {Pressable, ScrollView} from 'react-native';
import {ImageBackground, Image} from 'react-native';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {blogArray} from '../BlogContent';
import {useNavigation} from '@react-navigation/native';

export default function CardElement() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {/* {blogArray.map((item) => {
        return (
          <View
            key={item.key}
            style={{marginLeft: 5, marginTop: 10, marginRight: 5}}>
            <Card
              {...item}
              containerStyle={{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#a9a9a9',
                padding: '5%',
                marginTop: 5,
                marginBottom: 5,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 17, padding: 5}}>
                {item.blogHeading}
              </Text>

              <Text>{item.blogContent}</Text>
            </Card>
          </View>
        );
      })} */}

      <View
        style={{
          marginLeft: 5,
          marginTop: 10,
          marginRight: 5,
        }}>
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#a9a9a9',
            marginTop: 5,
            marginBottom: 5,
          }}>
          <Image
            style={{
              width: '100%',
              height: 150,
              resizeMode: 'stretch',
            }}
            source={require('../Image/GST.jpeg')}
          />
          <Text style={{fontWeight: 'bold', fontSize: 17, padding: 3}}>
            MSMEs and startups have petitioned FM Sitharaman to extend the GST
            payment and return filing deadlines without penalty.
          </Text>

          <Text style={{fontFamily: 'aerial', fontSize: 15}}>
            1) MSMEs and startups have urged the government to extend the GST
            payment and return filing deadlines for ..............
          </Text>
          <Pressable
            style={{marginTop: 10, width: 100}}
            onPress={() =>
              navigation.navigate('ReadBlog', {
                BlogHead:
                  'MSMEs and startups have petitioned FM Sitharaman to extend the GST payment and return filing deadlines without penalty.',
                BlogContent1:
                  '1) MSMEs and startups have urged the government to extend the GST payment and return filing deadlines for the months of March, April, and May to June 30, 2021, as a result of the Covid effect.',
                BlogContent2:
                  '2) According to a recent survey of MSMEs and startups conducted by neighbourhood social media site LocalCircles, up to 80% of respondents recommended that deadlines be extended, citing difficulties in filing GST payments and returns in March. Last year, Finance Minister Nirmala Sitharaman granted a similar extension to the ITR and GST return deadlines.',
                ImageUri: require('../Image/GST.jpeg'),
              })
            }>
            <Text style={{color: 'skyblue', fontSize: 18}}>Read More</Text>
          </Pressable>
        </Card>
      </View>

      <View
        style={{
          marginLeft: 5,
          marginTop: 10,
          marginRight: 5,
        }}>
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#a9a9a9',
            marginTop: 5,
            marginBottom: 5,
          }}>
          <Image
            style={{
              width: '100%',
              height: 150,
              resizeMode: 'stretch',
            }}
            source={require('../Image/Photo1.jpeg')}
          />
          <Text style={{fontWeight: 'bold', fontSize: 17, padding: 3}}>
            Tiruppur is experiencing a surge in international demand for
            childrens clothing and innerwear.
          </Text>

          <Text style={{fontFamily: 'aerial', fontSize: 15}}>
            1) According to an industry official, garment exporting units in
            Tiruppur, Tamil Nadu, are ............
          </Text>
          <Pressable
            style={{marginTop: 10, width: 100}}
            onPress={() =>
              navigation.navigate('ReadBlog', {
                BlogHead:
                  'Tiruppur is experiencing a surge in international demand for childrens clothing and innerwear.',
                BlogContent1:
                  '1) According to an industry official, garment exporting units in Tiruppur, Tamil Nadu, are seeing increased demand for innerwear, childrens wear, and long garments from overseas markets, while orders for fashion garments have decreased',
                BlogContent2:
                  '2) He also said that the US and European markets have opened up, and that the Tiruppur export units are performing well, as well as the domestic market.',
                ImageUri: require('../Image/Photo1.jpeg'),
              })
            }>
            <Text style={{color: 'skyblue', fontSize: 18}}>Read More</Text>
          </Pressable>
        </Card>
      </View>

      <View
        style={{
          marginLeft: 5,
          marginTop: 10,
          marginRight: 5,
        }}>
        <Card
          containerStyle={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#a9a9a9',
            marginTop: 5,
            marginBottom: 10,
          }}>
          <Image
            style={{
              width: '100%',
              height: 150,
              resizeMode: 'stretch',
            }}
            source={require('../Image/Photo2.jpeg')}
          />
          <Text style={{fontWeight: 'bold', fontSize: 17, padding: 3}}>
            New programme aims to increase the use of recycled polyester in
            Vancouver
          </Text>

          <Text style={{fontFamily: 'aerial', fontSize: 15}}>
            1) Textile Exchange and the Fashion Industry Charter for Climate
            Action have partnered to..........
          </Text>
          <Pressable
            style={{marginTop: 10, width: 100}}
            onPress={() =>
              navigation.navigate('ReadBlog', {
                BlogHead:
                  'New programme aims to increase the use of recycled polyester in Vancouver',
                BlogContent1:
                  '1) Textile Exchange and the Fashion Industry Charter for Climate Action have partnered to expand the use of recycled polyester in the textile and apparel industries',
                BlogContent2:
                  '2) The 2025 Recycled Polyester Challenge aims to raise the percentage of recycled polyester (rPET) used in place of virgin  polyester from 14 percent to 45 percent by 2025 and 90 percent by 2030.',
                ImageUri: require('../Image/Photo2.jpeg'),
              })
            }>
            <Text
              style={{
                color: 'skyblue',
                fontSize: 18,
              }}>
              Read More
            </Text>
          </Pressable>
        </Card>
      </View>
    </ScrollView>
  );
}
