<?php
header('Content-Type: application/json');


$form_action_func = $_GET['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'getAllTasks':
            getAllTasks();
      break;

        case 'undefinerd2':
                getAllTasks();
          break;

    default:
      break;
  }
}




function getAllResources()
{
  $connection = db_connect();
  $result = mysqli_query($connection,'select * from resources');
  $rows = db_fetch_rows($result);
  echo json_encode($rows);
}

function getAllTasks()
{
  $connection = db_connect();
  $result = mysqli_query($connection,'select * from tasks');
  $rows = db_fetch_rows($result);

  echo json_encode($rows);
}

//---------------------DATABASE TOOLS-----------------------------------------------------

function db_fetch_rows($result) {
  $rows = array();
  while($obj = mysqli_fetch_object($result)) {
  $rows[] = $obj;
  }
return $rows;
}

function db_connect() {

    // Define connection as a static variable, to avoid connecting more than once
    static $connection;

    // Try and connect to the database, if a connection has not been established yet
    if(!isset($connection)) {
         // Load configuration as an array. Use the actual location of your configuration file
        $config = parse_ini_file('../../../Db_connection/configDB.ini');
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
 ?>
