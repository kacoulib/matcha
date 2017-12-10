  <?php require_once('header.php'); ?>
	<h1>create user</h1>

  <form action="">
    <div>
      <input type="text" name="first_name" value="lauren">
    </div>

    <div>
      <input type="text" name="last_name" value="florian">
    </div>

  	<div>
      <input type="text" name="age" value="18">
    </div>

    <div>
      <input type="radio" name="gender" value="male" checked> Male
      <input type="radio" name="gender" value="female"> Female
    </div>

    <div>
      <input type="text" name="adresses" value="96 Boulevard Bessières, 75017 Paris">
    </div>

    <div>
      <input type="radio" name="orientation" value="heterosexual" checked> heterosexual
      <input type="radio" name="orientation" value="bisexual"> bisexual
      <input type="radio" name="orientation" value="homosexual"> homosexual
    </div>

    <div>
      <textarea name="bio" id="" cols="30" rows="10"></textarea>
    </div>
    
    <div>
      <input type="email" name="email" value="lauren@gmail.com">  
    </div>
  
    <div>
      <input type="file" name="pictures" multiple>
    </div>

  	<div>
  		<input type="submit" id="message" value="send" />
  	</div>
  </form>

  <h2>Last user</h2>

  <?php require_once('footer.php'); ?>

	<script>
      $('document').ready(() =>
      {
        let data,
            url = 'http://localhost:3000';

      	$('#message').on('click', (e)=>
      	{
      		e.preventDefault();
          data = objectifyForm($('form').serializeArray());

          $.post('http://localhost:3000/user/subscribe', data, (res) =>
          {
              console.log(res)
          })
        })

      })

      function objectifyForm(formArray)
      {
        var returnArray = {};

        for (var i = 0; i < formArray.length; i++)
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        return returnArray;
      }
	</script>