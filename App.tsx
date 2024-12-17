/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Chatroom,
  Container,
  TextInput,
  useRoomContext,
} from 'react-native-chat-room';

const appKey = 'easemob#easeim';
const userId = 'zuoyu1';
const userPs =
  'YWMtAg39PLxAEe-yBmmOjksLMFzzvlQ7sUrSpVuQGlyIzFRNQylgcXoR7oNIDTQKv3VfAwMAAAGT00z3uTeeSAAiV8ZGufOUmm4J1jA3guuBm81CIOVmJqQjV7UsHoxTxg';
const roomId = '267406324858889';
const room = {
  roomId: roomId,
  owner: userId,
};

function SendMessage() {
  const [page, setPage] = React.useState(0);
  const [appkey, setAppkey] = React.useState(appKey);
  const [id, setId] = React.useState(userId);
  const [ps, setPs] = React.useState(userPs);
  const im = useRoomContext();
  const {top} = useSafeAreaInsets();

  if (page === 0) {
    return (
      // Log in page
      <SafeAreaView style={styles.common}>
        <TextInput
          placeholder="Please App Key."
          value={appkey}
          onChangeText={setAppkey}
        />
        <TextInput
          placeholder="Please Login ID."
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Please Login token or password."
          value={ps}
          onChangeText={setPs}
        />
        <Pressable
          style={styles.login}
          onPress={() => {
            im.login({
              userId: id,
              userToken: ps,
              result: res => {
                console.log('login result', res);
                if (res.isOk === true) {
                  setPage(1);
                }
              },
            });
          }}>
          <Text>{'Login'}</Text>
        </Pressable>
        <Pressable
          style={styles.login}
          onPress={() => {
            im.logout({
              result: () => {},
            });
          }}>
          <Text>{'Logout'}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    // chat room page
    return (
      <SafeAreaView style={styles.common}>
        <Chatroom
          messageList={{
            props: {
              visible: true,
              reportProps: {
                data: [],
              },
            },
          }}
          input={{
            props: {
              keyboardVerticalOffset: Platform.OS === 'ios' ? top : 0,
              after: [],
            },
          }}
          roomId={room.roomId}
          ownerId={room.owner}
          onError={e => {
            console.log('ChatroomScreen:onError:', e.toString());
          }}>
          <Pressable
            style={[styles.logout, styles.login]}
            onPress={() => {
              setPage(0);
              im.logout({
                result: () => {},
              });
            }}>
            <Text>{'log out'}</Text>
          </Pressable>
        </Chatroom>
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

function App(): React.JSX.Element {
  // initialize the chat room
  return (
    <Container appKey={appKey}>
      <SendMessage />
    </Container>
  );
}

const styles = StyleSheet.create({
  common: {
    flex: 1,
  },
  logout: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  login: {
    height: 40,
    backgroundColor: 'darkseagreen',
    borderColor: 'floralwhite',
    borderWidth: 1,
  },
});

export default App;
