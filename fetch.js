$tk = localStorage.getItem("data_token");
if($tk == null){
    window.location.href = "tokenLogon.html";
}
else{
    doFetch($tk);
}

function doFetch($token){
    $baseUrl = "URL HERE";
    $url = $baseUrl.replace("[TK]", $token);

    $.ajax({
        url: $url,
        beforeSend: function( xhr ) {
            xhr.overrideMimeType( "text/plain; charset=utf-8" );
        }
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
        $('#report').html("<p>O perfil não contém dados</p>");
        exibeSair();    
    })
    .done(function( data ) {
        $('#data').text(data);
        // Restart process
        init();
        exibeSair();    
    });
}
function exibeSair(){
    // Permite sair
    //<div id="app-flavor">online</div>
    $('#app-flavor').text("Sair");
    $('#app-flavor').css('cursor', 'pointer');
    $('#app-flavor').css('text-transform','');
    $('#app-flavor').on('click',logout);
}
function logout(){
    localStorage.removeItem("data_token");
    window.location.href = "tokenLogon.html";
}