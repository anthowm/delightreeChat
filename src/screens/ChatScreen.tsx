import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Actions, GiftedChat} from 'react-native-gifted-chat';
import Fire from '../config/firebase';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {renderInputToolbar, renderComposer} from '../components/InputToolbar';
export const ChatScreen = () => {
  const route: any = useRoute();
  const [messages, setMessages] = useState<any>([]);
  const [image, setImage] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState<any>(null);

  const user: any = {
    _id: Fire.uid,
    name: route?.params?.name,
    avatar: 'https://placeimg.com/140/140/any',
  };

  const uploadImage = async (image: any) => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage().ref(filename).putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    const downloadUrl = await storage().ref(filename).getDownloadURL();
    setDownloadUrl(downloadUrl);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setImage(null);
  };

  useEffect(() => {
    Fire.get((message: any) => {
      setMessages((prevState: any) => {
        return GiftedChat.append(prevState, message);
      });
    });

    // returned function will be called on component unmount
    return () => {
      Fire.off();
    };
  }, []);

  const chat = (
    <GiftedChat
      messages={messages}
      onSend={(messages) => Fire.send(messages, downloadUrl)}
      user={user}
      showUserAvatar={true}
      renderInputToolbar={renderInputToolbar}
      renderAvatarOnTop={true}
      scrollToBottom={true}
      scrollToBottomComponent={() => (
        <Icon
          reverse
          name="arrow-down-outline"
          type="ionicon"
          color="#517fa4"
          size={12}
        />
      )}
      renderActions={(props) => {
        return (
          <Actions
            {...props}
            containerStyle={{
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 4,
              marginRight: 4,
              marginBottom: 0,
            }}
            icon={() => (
              <Icon
                reverse
                name="add-outline"
                type="ionicon"
                color="#517fa4"
                size={12}
              />
            )}
            options={{
              'Choose From Library': () => {
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 2000,
                    maxWidth: 2000,
                  },
                  (response) => {
                    const source = {uri: response.uri};
                    setImage(source);
                    uploadImage(source);
                  },
                );
              },
              'Take a photo': () => {
                launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: false,
                    maxHeight: 200,
                    maxWidth: 200,
                  },
                  (response) => {
                    const source = {uri: response.uri};
                    setImage(source);
                  },
                );
              },
              Cancel: () => {
                console.log('Cancel');
              },
            }}
            optionTintColor="#222B45"
          />
        );
      }}
      renderComposer={renderComposer}
    />
  );
  if (Platform.OS === 'web') {
    return (
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
          enabled={true}>
          {chat}
        </KeyboardAvoidingView>
      </View>
    );
  }
  return <SafeAreaView style={styles.container}>{chat}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
