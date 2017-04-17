<?php
require 'db_connect.php';

header('Content-Type: application/json');


$form_action_func = $_GET['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'getAllTasks':
            getAllTasks();
      break;

        case 'getAllResources':
                getAllResources();
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


 ?>
