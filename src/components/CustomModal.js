import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';

export default function CustomModal({visible, cancelClicked, onSave}) {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue('');
  }, [visible]);
  return (
    <Modal
      isVisible={visible}
      style={{margin: 0}}
      avoidKeyboard={true}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={{backgroundColor: '#eeeeef', margin: 50, borderRadius: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Add Category</Text>
        </View>
        <TextInput
          placeholder="Category"
          placeholderTextColor={'grey'}
          style={{
            width: '90%',
            // borderBottomColor: 'grey',
            // borderBottomWidth: 1,
            padding: 5,
            // fontSize: 18,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: 18,
            borderRadius: 10,
          }}
          onChangeText={text => setValue(text)}
          value={value}
          autoFocus={true}
        />
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            borderTopWidth: 0.5,
            borderTopColor: '#c8c9c8',
            // justifyContent: 'space-around',
          }}>
          {/* <View> */}
          <TouchableOpacity
            style={{
              width: '50%',
              borderRightWidth: 0.5,
              borderRightColor: '#c8c9c8',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
            }}
            onPress={() => cancelClicked()}>
            <Text style={{fontSize: 18, color: '#047cfe'}}>Cancel</Text>
          </TouchableOpacity>
          {/* </View> */}

          {/* <View> */}
          <TouchableOpacity
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onSave(value)}>
            <Text style={{fontSize: 18, color: '#047cfe'}}>Ok</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
