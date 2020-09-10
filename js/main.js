$(document).ready(function(){

    getData();
    $(document).on('click','.delete',function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
         deleteElement(idToDo);
    });
    
    $(document).on("click", "span.text", function () {
      var elemento = $(this);
      $('.text').removeClass('hidden');
      elemento.addClass('hidden');
      
        $('.text').next().addClass('hidden');
        elemento.next().removeClass('hidden');
    });

    $('#nuova-voce').keydown(function (e) {
        if (e.which == 13 || e.keyCode == 13) {
            var newElement = $('#nuova-voce').val();
            createElement(newElement);
            $('#nuova-voce').val('');
        }
    });

    
    $(document).on('keydown', '.input-add', function () {
        var idNewElement = $(this).parent().attr('data-id');
        if (event.which == 13 || event.keyCode == 13) {
            var newElement = $(this).val();
            updateElement(idNewElement, newElement);
        }
    });

    $('.inserisci').click(function(){
        var newElement = $('#nuova-voce').val();
        createElement(newElement);
        $('#nuova-voce').val('');
    });

});


function createElement(data){
    $.ajax(
        {
            url: 'http://157.230.17.132:3014/todos',
            method: 'POST',
            data: {
                text: data
            },
            success: function (risposta) {
                $('.todos').html('');
                getData();
            },
            error: function () {
                alert('Errore')
            }

        }
    );
}


function deleteElement(id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3014/todos/'+id,
            method: 'DELETE',
            success: function (risposta) {
                $('.todos').html('');
                getData();
            },
            error: function () {
                alert('Errore')
            }

        }
    );
}

function updateElement(id, elemento) {
    $.ajax(
        {
            url: 'http://157.230.17.132:3014/todos/' + id,
            method: 'PUT',
            data: {
                text: elemento
            },
            success: function (risposta) {
                $('.todos').html('');
                getData();
            },
            error: function () {
                alert('Errore');
            }
        }
    );
}


function getElement(data) {
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        var context = {
            text: data[i].text,
            id: data[i].id
        };
        var html = template(context);
        $('.todos').append(html);
    }

}

function getData() {
    $.ajax(
        {
            url: 'http://157.230.17.132:3014/todos',
            method: 'GET',
            success: function (risposta) {
                getElement(risposta);
            },
            error: function () {
                alert('Errore');
            }
        }
    );
}