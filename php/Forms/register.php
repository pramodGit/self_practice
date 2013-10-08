<?php
$conn = mysql_connect("localhost","root","") or die('Connection Error...'.mysql_error());
$db = mysql_select_db('sapient', $conn ) or die('DB Selection Error...'.mysql_error());

//$sql_query = "INSERT INTO info (fname, lname, email, pass) VALUES ('test','test','test','test')";
$sql_query = "INSERT INTO info (fname, lname, email, pass) VALUES ('".$_POST['fName']."','".$_POST['lName']."','".$_POST['email']."','".$_POST['password']."')";
$result = mysql_query($sql_query) or die('Error in the query...<br/>'. mysql_error());

//header("Location: http://google.com");
echo "<script>window.location='http://localhost/GitHub/self_practice/php/Forms/select_user.php'</script>";
//mysql_close($conn);
?>

