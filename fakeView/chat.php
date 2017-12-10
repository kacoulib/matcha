  <?php require_once('header.php'); ?>
	<h1>chat</h1>

	<div id="chatbox">
		test123564
	</div>
    <form action="">
    	<div>
	    	<select name="user_list">
	    		<option value="user1">user1</option>
	    		<option value="user2">user2</option>
	    		<option value="user3">user3</option>
	    	</select>
    	</div>
    	<div>
	    	<textarea name="" id="" cols="30" rows="5" autofocus></textarea>
    	</div>
    	<div>
    		<input type="submit" id="message" value="send" />
    	</div>
    </form>

  <?php require_once('footer.php'); ?>

	<script>
      $('document').ready(() =>
      {
      	$('#message').on('click', (e)=>
      	{
      		e.preventDefault();
      		console.log('message click');
      	})

        $.get('http://localhost:3000/user', (data) =>
        {
          console.log(data)
        })
      })
	</script>