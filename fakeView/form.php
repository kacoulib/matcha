  <?php require_once('header.php'); ?>

	<h1>form</h1>

  <form action="http://localhost:3000/sign_in" method="post">
    <div>
        <label>Email:</label>
        <input type="text" name="email"  value="test@gmail.com" />
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password" value="test" />
    </div>
    <div>
        <input type="submit" value="Log In" autofocus="true"/>
    </div>
</form>

  <?php require_once('footer.php'); ?>
