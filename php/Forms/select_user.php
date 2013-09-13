<?php

    $result = mysql_query("SELECT * FROM info");
    $row = mysql_fetch_array($result)
    echo $row;
    
    //mysql_close($conn);
?>