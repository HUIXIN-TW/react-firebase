const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendmessage = functions.firestore
    .document('posts/{studentId}')
    .onCreate(event => {
        const docId = event.params.studentId;
        const name = event.data.data().Name;
        const postRef = admin.firestore().collection('posts').doc(docId)
        return postRef.update({message: `Hello ${name} - auto by cloud function`})
    });