<?php

$connection = db_connect();

$test1 ="SELECT name FROM `tasks` WHERE id=1";

$test2 ="SELECT * FROM `tasks`";

$result = mysqli_query($connection,$test2);
$rows = mysqli_num_rows($result);
$result = mysqli_fetch_all($result,MYSQLI_ASSOC);
if ($result == false) {
  echo "fail";
} else {
for ($i=0; $i <$rows ; $i++) {
  print_r($result[$i]["ID"]." ".$result[$i]["name"]."\n");
}

}

function db_connect() {

    // Define connection as a static variable, to avoid connecting more than once
    static $connection;

    // Try and connect to the database, if a connection has not been established yet
    if(!isset($connection)) {
         // Load configuration as an array. Use the actual location of your configuration file
        $config = parse_ini_file('../Db_connection/configDB.ini');
        $connection = mysqli_connect('localhost',$config['username'],$config['password'],$config['dbname']);
    }

    // If connection was not successful, handle the error
    if($connection === false) {
        // Handle error - notify administrator, log to a file, show an error screen, etc.
        return mysqli_connect_error();
    }
    return $connection;
}

function db_query($query) {
    // Connect to the database
    $connection = db_connect();

    // Query the database
    $result = mysqli_query($connection,$query);

    return $result;
}



 ?>
