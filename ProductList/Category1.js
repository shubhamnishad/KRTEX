import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DataTable} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import {useNetInfo} from '@react-native-community/netinfo';

export default function Category1(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState();
  const categoryid = props.route.params.id;
  const image = props.route.params.uri;

  const [quantity, setQuantity] = useState('');
  const [productName, setProductName] = useState('');

  const {token, name, email, phone, address, type} = useSelector(
    (state) => state.userInfoReducer,
  );
  const netInfo = useNetInfo();
  useEffect(() => {
    try {
      fetch(
        `https://uditsolutions.in/exporter/public/api/categories/${categoryid}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((json) => {
          setData(json?.sub_categories);
          console.log('Categories', json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } catch (e) {
      console.log('error', e);
    }
  }, []);

  const enquiryMethod = () => {
    try {
      fetch('https://uditsolutions.in/exporter/public/api/customers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sub_category_name: productName,
          name: name,
          email: email,
          address: address,
          quantity: quantity,
          type: type,
          from: 'app',
          source: '',
          lead: '1',
          phone: phone,
        }),
      })
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => console.error('##########', error))
        .finally(() => {
          setModalLoading(false);
          setModalVisible(!modalVisible);
        });
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#e6e6fa',
          alignItems: 'center',
          height: '8%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{marginTop: 10, marginLeft: 10}}
          onPress={() => props.navigation.navigate('HomeScreen')}>
          <View>
            <MaterialCommunityIcons
              style={{marginLeft: 5}}
              name="arrow-left-bold-outline"
              color="#191970"
              size={26}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            marginLeft: 120,
            color: 'black',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          KRTEX
        </Text>
      </View>

      <View>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: image,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          marginTop: 5,
        }}>
        <DataTable>
          <DataTable.Header style={{backgroundColor: '#191970'}}>
            <DataTable.Title>
              {<Text style={styles.headerText}>Product </Text>}
            </DataTable.Title>
            <DataTable.Title numeric>
              {<Text style={styles.headerText}>Specification</Text>}
            </DataTable.Title>
            <DataTable.Title numeric>
              {<Text style={styles.headerText}>MOQ</Text>}
            </DataTable.Title>
            <DataTable.Title numeric>
              {<Text style={styles.headerText}>Enquiry</Text>}
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="blue" />
                <Text> Loading..</Text>
              </View>
            ) : data && data.length > 0 ? (
              data.map((opt, i) => (
                <DataTable.Row
                  style={{
                    backgroundColor: '#f0f8ff',
                  }}
                  key={i}>
                  <DataTable.Cell
                    onPress={() =>
                      Snackbar.show({
                        text: `Product Name:- ${opt?.name}`,
                        duration: Snackbar.LENGTH_INDEFINITE,
                        action: {
                          text: 'OK',
                          textColor: 'green',
                          onPress: () => {
                            Snackbar.dismiss();
                          },
                        },
                      })
                    }>
                    {opt?.name}
                  </DataTable.Cell>

                  <DataTable.Cell
                    onPress={() =>
                      Snackbar.show({
                        text: `Specifications:-${opt?.specifications}`,
                        duration: Snackbar.LENGTH_INDEFINITE,
                        multiline: true,
                        action: {
                          text: 'OK',
                          textColor: 'green',
                          onPress: () => {
                            Snackbar.dismiss();
                          },
                        },
                      })
                    }
                    numeric>
                    {opt?.specifications}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{opt?.unit}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setProductName(opt?.name);
                      }}>
                      <View
                        style={{
                          backgroundColor: 'skyblue',
                          borderWidth: 1,
                          borderColor: 'grey',
                          borderRadius: 5,
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 12}}>Get Info</Text>
                      </View>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 100,
                }}>
                <Text>No Products</Text>
              </View>
            )}
          </ScrollView>
        </DataTable>

        {modalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              {modalLoading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <View></View>
              )}
              <View style={styles.modalView}>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                  }}
                  color="#3A1292"
                  placeholder="Name"
                  defaultValue={name}
                  editable={false}
                />
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                  }}
                  color="#3A1292"
                  placeholder="Email"
                  defaultValue={email}
                  editable={false}
                />
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                  }}
                  color="#3A1292"
                  placeholder="Phone No"
                  keyboardType="phone-pad"
                  defaultValue={phone}
                  editable={false}
                />
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                  }}
                  color="#3A1292"
                  placeholder="Location"
                  defaultValue={address}
                  editable={false}
                />

                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                  }}
                  color="#3A1292"
                  placeholder="Type"
                  defaultValue={type}
                  editable={false}
                />
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                  }}
                  color="#3A1292"
                  placeholder="Quantity"
                  keyboardType="numeric"
                  onChangeText={(quantity) => setQuantity(quantity)}
                  defaultValue={quantity}
                />

                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  color="#3A1292"
                  multiline={true}
                  placeholder="Requirement"
                  defaultValue={productName}
                  editable={false}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      if (quantity == '') {
                        Keyboard.dismiss();
                        Snackbar.show({
                          text: 'Quantity Field Mandatory',
                          duration: Snackbar.LENGTH_LONG,
                        });
                      } else if (netInfo.isConnected == false) {
                        Keyboard.dismiss();
                        alert('Check Internet Connection !');
                      } else {
                        Keyboard.dismiss();
                        setModalLoading(true);
                        enquiryMethod();
                      }
                    }}>
                    <Text style={styles.textStyle}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  tinyLogo: {
    width: Dimensions.get('window').width,
    height: 240,
    marginTop: 5,
  },
  headerText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: Dimensions.get('window').width,
    margin: 20,
    backgroundColor: `white`,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
