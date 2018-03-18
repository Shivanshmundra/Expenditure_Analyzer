import firebase from 'firebase';
import moment from 'moment';

const uploadPicture = (base64) => {
    //console.log(dict);
    //console.log("dict uploading")
    const key = firebase.database().ref('requests').push().key;
    const updates = {};
    updates[`requests/${key}`] = {
        id: key,
        timestamp: moment().format()
    }
    updates[`requests_imgs/${key}`] = {
        image: base64,
    }
    return firebase.database().ref().update(updates);
}

const uploadData = (dict) => {
    //console.log(dict);
    //console.log("dict uploading")
    const key = firebase.database().ref('data').push().key;
    const updates = {};
    updates[`data/${key}`] = {
        id: key,
        timestamp: moment().format()
    }
    updates[`data_imgs/${key}`] = {
        data: dict,
    }
    return firebase.database().ref().update(updates);
}


const getData = () => {
    return firebase.database().ref('data_imgs').once('value');
}


const loadDocuments = () => {
    return firebase.database().ref('requests').once('value');
}

export {
    uploadPicture,
    loadDocuments,
    uploadData,
    getData
}
