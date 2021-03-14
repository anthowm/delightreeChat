import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyA0sJwt792UZGztqgS5bK4Sy3RIqgBEDvU',
        authDomain: 'chatapp-ee4d7.firebaseapp.com',
        databaseURL: 'https://chatapp-ee4d7-default-rtdb.firebaseio.com',
        projectId: 'chatapp-ee4d7',
        storageBucket: 'chatapp-ee4d7.appspot.com',
        messagingSenderId: '794053145153',
        appId: '1:794053145153:web:9dd99afe1a0e63b66eccc0',
        measurementId: 'G-WYW568ZQ41',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages: any[], image?: any) => {
    messages.forEach((item) => {
      const message: any = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      if (image) {
        message.image = image;
      }
      this.db.push(message);
    });
  };

  parse = (message: any) => {
    const {user, text, timestamp, image} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
      image,
    };
  };

  get = (callback: any) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
