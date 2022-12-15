const collectionName = "posts"
const docName = "firstpost"

document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                greeting = "Hello, " + user._delegate.displayName;
                document.getElementById("greeting").innerHTML = greeting;
                console.log(user);
            })
}

function showDetail(){
    const db = firebase.firestore();
    const myPost = db.collection(collectionName).doc(docName); //based on Firebase setting
    
    myPost.onSnapshot(doc => {
                const data = doc.data();
                document.getElementById("detail").innerHTML = data.Title;
                console.log(data);
          })
}

function updatePost(event){
    const db = firebase.firestore();
    const myPost = db.collection(collectionName).doc(docName);

    myPost.update({ Title: event.target.value })
}

function queryPost(){
    const db = firebase.firestore();
    const myPost = db.collection(collectionName);

    const query = myPost.where('Age', '>', 5).orderBy('Age');

    var names = " "

    query.get()
         .then(studentList => {
            studentList.forEach( student => {
                names += student.data().Name + ", "
            })
        console.log(names);
        document.getElementById("students").innerHTML = names;
        })
    
}

function uploadFile(){
    //get the imageUpload
    const input = document.getElementById("imgUpload");
    imgUpload = input.files[0] 
    console.log(imgUpload, "UploadFile successfully")

    // Create a reference with an initial file path and name
    const storageRef = firebase.storage().ref();
    const pathRef = storageRef.child(imgUpload.name);

    //uploadFile directly to Firebase
    const task = pathRef.put(imgUpload);    

    //downloadURL from firebase
    task.then(snapshot => {
        const url = snapshot.ref.getDownloadURL().then(function(url){
            console.log("URL " + url)
            document.querySelector('#imgDownload').setAttribute('src', url);
        })
    })
}