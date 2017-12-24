
	<form action="" id="chat_form">
		<textarea name="" id="chat_area" cols="30" rows="10"></textarea>
		<input type="text" id="chat_btn" autofocus="true">
	</form>

	<script>
		// $('document').ready(function ()
  //   	{
		// 	let socket   = io('http://localhost:3000');

		// 	$('#chat_form').on('submit', (e)=>e.preventDefault());

		// 	$('#chat_btn').on('keyup', function(e)
		// 	{
		// 		var code = e.keyCode || e.which,
		// 			msg;

		// 		if(code == 13)
		// 		{
		// 			msg = $(this).val();
		// 			$(this).val('');

		// 				socket.emit('newMessage', {});
		// 				console.log(msg)
		// 		}
		// 	})

		// 	socket.on('message', function(data)
		// 	{
		// 		console.log(data)
		// 	})

  //     })
    </script>
  </body>
</html>
