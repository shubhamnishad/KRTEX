import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import {apiRequest} from '../api/apiHelper';
import {DataTable} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import Snackbar from 'react-native-snackbar';
import {Keyboard} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

export default function Rates() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setCategory] = useState('');
  const [cat, setCat] = useState([]);
  const [result, setResult] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [productName, setProductName] = useState('');
  const [modalLoading, setModalLoading] = useState();

  const netInfo = useNetInfo();

  const {token, name, email, phone, address, type} = useSelector(
    (state) => state.userInfoReducer,
  );

  console.log('Type', type);

  useEffect(() => {
    const header = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };

    apiRequest(
      'GET',
      'https://uditsolutions.in/exporter/public/api/rates',
      {},
      header,
    )
      .then((json) => {
        console.log('data Rates page', json);
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // console.log('ID Rates', data?.sub_category?.app_category_id);

  useEffect(() => {
    try {
      fetch(`https://uditsolutions.in/exporter/public/api/categories`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setCat(json);
          // console.log('Categories', json);
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
          console.log('response!!!!!!!!!!!!', response);
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

  console.log('Cat Id#########', selectedCategory);
  if (isLoading == true) {
    return (
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading....</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.13,
            backgroundColor: '#e6e6fa',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'black',
            }}>
            KRTEX
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                'https://images.unsplash.com/photo-1568354931331-e95077a215ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#e6e6fa',
            marginTop: 5,
            borderWidth: 2,
            borderRadius: 5,
            borderColor: '#191970',
          }}>
          <Text
            style={{
              marginTop: 17,
              fontWeight: 'bold',
              fontSize: 14,
              marginLeft: 10,
            }}>
            Select Category:
          </Text>

          <Picker
            selectedValue={selectedCategory}
            mode="dropdown"
            style={{
              width: '50%',
            }}
            onValueChange={(itemValue, itemIndex) => {
              setCategory(itemValue);
              {
                netInfo.isConnected
                  ? setResult(
                      data.filter(
                        (item, i) =>
                          parseInt(item?.sub_category?.app_category_id) ===
                          itemValue,
                      ),
                    )
                  : alert('Check Internet');
              }
            }}>
            {cat &&
              cat.length > 0 &&
              cat.map((opt, i) => (
                <Picker.Item key={i} label={opt?.name} value={opt?.id} />
              ))}
          </Picker>
        </View>

        <View
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            marginTop: 5,
          }}>
          <DataTable>
            <DataTable.Header style={{backgroundColor: '#191970'}}>
              <DataTable.Title style={{marginRight: 20}}>
                {<Text style={styles.headerText}>Product</Text>}
              </DataTable.Title>
              <DataTable.Title numeric>
                {<Text style={styles.headerText}>Rates</Text>}
              </DataTable.Title>
              <DataTable.Title numeric>
                {<Text style={styles.headerText}>MOQ</Text>}
              </DataTable.Title>
              <DataTable.Title numeric>
                {<Text style={styles.headerText}>Enquiry</Text>}
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {result.length == 0 ? (
                <Text style={{marginLeft: 150, marginTop: 100}}>
                  No Products
                </Text>
              ) : (
                <View></View>
              )}
              {netInfo.isConnected
                ? result &&
                  result.length > 0 &&
                  result.map((opt, i) => (
                    <DataTable.Row
                      style={{
                        backgroundColor: '#f0f8ff',
                      }}
                      key={i}>
                      <DataTable.Cell
                        onPress={() =>
                          Snackbar.show({
                            text: `Product Name:-${opt?.sub_category?.name}`,
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
                        {opt?.sub_category?.name}
                      </DataTable.Cell>
                      <DataTable.Cell
                        numeric
                        onPress={() =>
                          Snackbar.show({
                            text: `Amount:-${opt?.amount}`,
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
                        {opt?.amount}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {opt?.sub_category?.moq}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(true);
                            setProductName(opt?.sub_category?.name);
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
                : alert('Check Internet')}
            </ScrollView>
          </DataTable>
        </View>

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
                  // onChangeText={(type) => setType(type)}
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
                  onChangeText={(quantity) => setQuantity(quantity)}
                  defaultValue={quantity}
                  keyboardType="numeric"
                />

                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#b0e0e6',
                    width: '80%',
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  color="#3A1292"
                  multiline={true}
                  // placeholder="Requirement"
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6E1E7',
  },
  tinyLogo: {
    width: Dimensions.get('window').width,
    height: 230,
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
