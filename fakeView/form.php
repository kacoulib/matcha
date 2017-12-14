  <?php require_once('header.php'); ?>

	<h1>form</h1>

  <form action="http://localhost:3000/sign_in" method="post">
    <div>
        <label>username:</label>
        <input type="text" name="email"  value="sdsdf" />
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password" value="sdsdf" />
    </div>
    <div>
        <input type="submit" value="Log In" autofocus="true"/>
    </div>
</form>

  <?php require_once('footer.php'); ?>
