<?php
require 'db_connect.php';

$form_action_func = $_GET['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'insertTask':
            insertTask();
      break;

        case 'undefinerd2':
                insertTask();
          break;

    default:
      break;
  }
}

function insertTask($name)
{
  $connection = db_connect();
  $result = mysqli_query($connection,"insert into tasks (name) values ("+name+")";
}

 ?>
