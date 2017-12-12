  <?php require_once('header.php'); ?>

	<h1>form</h1>

  <form action="http://localhost:3000/user/sign_in" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>

  <?php require_once('footer.php'); ?>
