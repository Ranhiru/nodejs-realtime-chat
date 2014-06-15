window.onload = function() {
  var messages = [];
  var socket = io.connect('http://localhost:3700');
  var field = document.getElementById('field');
  var usernameField = document.getElementById('username');
  var sendButton = document.getElementById('send');
  var content = document.getElementById("content");

  socket.on('message', function(data) {
    if (data.message) {
      messages.push(data);

      var html = '';

      for(var i=0; i < messages.length; i++) {
        html += messages[i].username + ": " + messages[i].message + '<br />';
      }

      content.innerHTML = html;
    } else {
      console.log("There is a problem: ", data);
    }
  });

  sendButton.onclick = function() {
    var text = field.value;
    var user = usernameField.value;
    socket.emit('send', { username: user, message: text });
  };
}
