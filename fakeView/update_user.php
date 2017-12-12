  <?php require_once('header.php'); ?>
	<h1>Update user</h1>

  <form action="">
    <div>
      <input type="text" id="first_name" name="first_name">
    </div>

    <div>
      <input type="text" id="last_name" name="last_name">
    </div>

  	<div>
      <input type="text" id="age" name="age">
    </div>

    <div>
      <input type="radio" id="gender" name="gender" value="male" checked> Male
      <input type="radio" id="gender" name="gender" value="female"> Female
    </div>

    <div>
      <input type="text" id="adresses" name="adresses" value="96 Boulevard Bessières, 75017 Paris">
    </div>

    <div>
      <input type="radio" id="orientation" name="orientation" value="heterosexual" checked> heterosexual
      <input type="radio" id="orientation" name="orientation" value="bisexual"> bisexual
      <input type="radio" id="orientation" name="orientation" value="homosexual"> homosexual
    </div>

    <div>
      <textarea id="bio" name="bio" cols="30" rows="10"></textarea>
    </div>
    
    <div>
      <input type="email" id="email" name="email">  
    </div>
  
    <div>
      <input type="file" name="pictures" multiple>
    </div>

    <div>
      <input type="submit" id="message" value="send" />
    </div>
      <input type="hidden" id="_id" name="_id">
  </form>

  <h2>Last user</h2>

  <?php require_once('footer.php'); ?>

	<script>
      $('document').ready(() =>
      {
        let data,
            user_id = location.search.split('=')[1];

        $.get('http://localhost:3000/user/'+user_id, data, (req_user) =>
        {
          let el,
              selector;

          for (el in req_user)
          {
              selector = "#"+el;

              if ($(selector).length > 0)
              {
                $(selector).val(req_user[el])
              }
          }
          $("_id").val(user_id);
          $('#message').on('click', (e)=>
          {
            e.preventDefault();
            data = objectifyForm($('form').serializeArray());
            $.ajax({
              url: 'http://localhost:3000/user/update/'+user_id,
              method: 'PUT',
              data: objectifyForm($('form').serializeArray()),
              success: (res) => {console.log(res)}
            });
          })
        }).fail((err)=>console.error(err.responseText))

      })  

      function objectifyForm(formArray)
      {
        var returnArray = {};

        for (var i = 0; i < formArray.length; i++)
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        return returnArray;
      }
	</script>