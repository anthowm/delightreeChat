import React from 'react';
import {InputToolbar, Composer} from 'react-native-gifted-chat';

export const renderInputToolbar = (props: any) => (
  <InputToolbar
    {...props}
    containerStyle={{
      paddingTop: 6,
    }}
    primaryStyle={{alignItems: 'center'}}
  />
);
export const renderComposer = (props: any) => (
  <Composer
    {...props}
    textInputStyle={{
      color: '#222B45',
      backgroundColor: '#EDF1F7',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#E4E9F2',
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);
