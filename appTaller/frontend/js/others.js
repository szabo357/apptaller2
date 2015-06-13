  /*
    Socket.io example

    Shows how to make a basic webSocket connection between a client and a server
    using Socket.io version 1.0 or later (http://socket.io/)

    created 11 June 2015
    by Miklos Szabo
*/


  $(document).ready(function () {

//*******************************   Control de Salidas Digitales  *************************************
  	var btnState = [0, 0, 0, 0, 0];
    
    $( "#analog1-text" ).text("La data analogica aparecera aqui xD");

  	$('#btn-out-1, #btn-out-2, #btn-out-3, #btn-out-4, #btn-out-5').click( function(){

  		if( this.id == "btn-out-1" ){

  			$('.led-1').toggleClass("led-green");
  			btnState[0] = 1 - btnState[0];
  			console.log( setMessage(btnState[0],0));
  			sendData( setMessage( btnState[0], 0) );

  		}else if( this.id == "btn-out-2" ){

  			$('.led-2').toggleClass("led-green");
  			btnState[1] = 1 - btnState[1];
			console.log( setMessage(btnState[1],1));
			sendData( setMessage( btnState[1], 1) );
  		}else if ( this.id == "btn-out-3" ){

  			$('.led-3').toggleClass("led-green");
  			btnState[2] = 1 - btnState[2];
  			console.log( setMessage( btnState[2], 2));
  			sendData( setMessage( btnState[2], 2) );
  		}else if ( this.id == "btn-out-4" ){

  			$('.led-4').toggleClass("led-green");
  			btnState[3] = 1 - btnState[3];
  			console.log( setMessage( btnState[3], 3));
  			sendData( setMessage( btnState[3], 3) );
  		}else if ( this.id == "btn-out-5" ){

  			$('.led-5').toggleClass("led-green");
  			btnState[4] = 1 - btnState[4];
  			console.log( setMessage( btnState[4], 4));
  			sendData( setMessage( btnState[4], 4) );
  		}

  	});

  //****************************   Control Entradas Analogicas   ***************************************
  $(function() {
    $('#analog1-enable').change(function() {
    	var msg = "Entrada-Analogica1-"+ $(this).prop("checked");
    	console.log(msg );
        sendData(msg);
    })
  });

  $(function() {
    $('#analog2-enable').change(function() {
    	var msg = "Entrada-Analogica1-"+ $(this).prop("checked");
    	console.log(msg );
        sendData(msg);
    })
  });


function setMessage(btnState, index){
	var message = 0;
	if(btnState == 1){
		message = "Salida"+(index+1)+"-ON";
	}else{
		message = "Salida"+(index+1)+"-OFF";
	}
	return message;
}


// ********************      Funciones Socket.io     ******************************	 

  var socket = io();		// socket.io instance

   // this function sends data to the server. It's called when
   // the submit button is pressed:
	function sendData(data) {
		// send the server whatever is in the textInput box:
		socket.emit('message', data);
	}

	var counter = 0;
	var dat = [];
	var dataset = [];
	// if the server sends you data, act on it:
	socket.on('message', function(data) {
		 console.log(data);
		 
		 //array = [[0, data], [1, data],[2,data],[3,data]];
		if( dataset.length > 120 ){ 
			dataset.shift(); 
			counter =0;
			dataset = [];
		}
		else{
			console.log("counter es:"+counter);
			console.log("dataset length es:"+ dataset.length);
			 counter += 1;
			dat =[counter,data];
			dataset.push(dat);
		}

		$( "#analog1-text" ).text(data).css("color","blue");
		$.plot($("#chart1"), [dataset]);
	});

  });