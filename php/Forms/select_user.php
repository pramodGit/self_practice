<?php
    $conn = mysql_connect("localhost","root","") or die('Connection Error...'.mysql_error());
    $db = mysql_select_db('sapient', $conn ) or die('DB Selection Error...'.mysql_error());
    
    $result = mysql_query("SELECT * FROM info");
    //$row = mysql_fetch_array($result);
    echo '<pre>';
    WHILE( $row = mysql_fetch_row($result)) {
        echo "My ID is: " . $row['0'] . "<br/>";
        echo "My name is: " . $row['1'] . ' '. $row['2'] . "<br/>";
    }
    echo '<pre>';
    
    //mysql_close($conn);
?>