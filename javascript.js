
/*responstas*/
function ola(){
    alert('ola mundo');
}


/*script para troca de msg */
$(function () {
    var socket = io();
    $('form').submit(function(e) {
      e.preventDefault(); // impede o recarregamento da página
        socket.emit('chat de menssagens', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat de menssagens', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});
