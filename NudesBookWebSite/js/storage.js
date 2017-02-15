// Obtendo os elementos
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var nameInput = document.getElementById('nameInput');
var linksContainer = $('#links');
var node = document.getElementById('links');
var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef ;

// Ouvir o evento change
fileButton.addEventListener('change', function (e) {
  // Obter o arquivo
  var file = e.target.files[0];

  // create(nameInput.value, file.name);

  // Referenciar o Storage
  var storageRef = firebase.storage().ref('pictures/' + file.name);

  // Enviar o arquivo
  var task = storageRef.put(file);

  // Atualizar o Progress Bar
  task.on('state_changed',
  function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    uploader.value = percentage;
  },
  function error(err) {
    console.log(err);
    alert("logue-se para mandar nude");
  },
  function complete() {
    alert('Envio completo!');
    create(nameInput.value, file.name);
  }
)
});

function create(name, path) {
  var data = {
    name: name,
    path: path
  };

  return firebase.database().ref().child('pictures').push(data);
}

firebase.database().ref('pictures').on('value', function (snapshot) {
  node.innerHTML = '';
  snapshot.forEach(function (item) {
    tangRef = storageRef.child('pictures/' + item.val().path)
    tangRef.getDownloadURL().then(function(url){
      // Add the images as links with thumbnails to the page:
      $('<a/>')
      .append($('<img>').prop('src', url ).width(75).height(75))
      .prop('href', url)
      .prop('title', item.val().name)
      .attr('data-gallery', '')
      .appendTo(linksContainer)
    }).catch(function(error) {
      // If anything goes wrong while getting the download URL, log the error
      console.error(error);
    });
  });
});
