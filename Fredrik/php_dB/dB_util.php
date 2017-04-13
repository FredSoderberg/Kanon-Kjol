<?php
if(checkTableExist()) {
echo "true";
}
else {echo "false";}

$form_action_func = $_POST['function'];

if(isset($_POST['$form_action_func']))
{
  switch ($form_action_func) {
    case 'checkTableExist':

      break;

    default:
      break;
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

function db_error() {
    $connection = db_connect();
    return mysqli_error($connection);
}

function checkTableExist()
{
  $connection = db_connect();
  $result = mysqli_query($connection,'select * from tasks');

  return $result;
}

 ?>
