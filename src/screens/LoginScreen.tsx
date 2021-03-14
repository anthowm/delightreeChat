import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image, useTheme, Text, Input, Icon} from 'react-native-elements';
export const LoginScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [inputName, setInputName] = useState('');
  return (
    <View style={[styles.container, {backgroundColor: theme.colors?.grey5}]}>
      <View style={[styles.circle]} />
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/chat.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text h3>Username</Text>
        <View style={{marginVertical: 12}}>
          <Input
            placeholder="Username"
            containerStyle={styles.inputContainer}
            onChangeText={(name) => {
              setInputName(name);
            }}
            value={inputName}
          />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          name="arrow-forward-outline"
          type="ionicon"
          reverse
          containerStyle={{backgroundColor: 'blue'}}
          onPress={() => {
            navigation.navigate('Chat', {name: inputName});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    left: -120,
    top: -20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  textContainer: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    height: 40,
    borderStyle: 'solid',
    overflow: 'hidden',
    borderRadius: 30,
    borderColor: 'lightgrey',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
});
