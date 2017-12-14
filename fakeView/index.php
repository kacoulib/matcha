  <?php require_once('header.php'); ?>
  
  <h1>index</h1>
	<h3>User list</h3>
    <div id="user_list">
    	<ul></ul>
    </div>

	<script>
		$('document').ready(()=>
		{
			let newElems = '';
			$.get('http://localhost:3000/all', (data)=>
			{

				data.forEach((el, i)=>
				{
					console.log(el)
					newElems += `<li><a href="http://localhost:8080/update_user.php/?user=${el._id}">${el.first_name}</a></li>`;
				});
				$('#user_list ul').append(newElems);
			})
		})
	</script>
  <?php require_once('footer.php'); ?>
