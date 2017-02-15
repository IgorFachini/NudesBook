var usersList = document.getElementById('usersList');
var nameInput = document.getElementById('nameInput');
var ageInput = document.getElementById('ageInput');
var addButton = document.getElementById('addButton');

// Ao clicar no botão
addButton.addEventListener('click', function () {
    create(nameInput.value, ageInput.value);
});

// Função para criar um registro no Firebase
function create(name, age) {
    var data = {
        name: name,
        age: age
    };

    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function (snapshot) {
    usersList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().age));
        usersList.appendChild(li);
    });
});

var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef = storageRef.child('arquivos/Wikedbotz.jpg');

// First we sign in the user anonymously
firebase.auth().signInAnonymously().then(function() {
  // Once the sign in completed, we get the download URL of the image
  tangRef.getDownloadURL().then(function(url)                             {
    // Once we have the download URL, we set it to our img element
    document.querySelector('img').src = url;

  }).catch(function(error) {
    // If anything goes wrong while getting the download URL, log the error
    console.error(error);
  });
});