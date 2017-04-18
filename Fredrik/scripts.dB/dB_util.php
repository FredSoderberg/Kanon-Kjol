<?php
require 'dB_connect.php';


$form_action_func = $_POST['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'insertTask':
            insertTask($_POST['newTask']);
      break;

        case 'removeTask':
              removeTask($_POST['taskToRemove']);
          break;

    default:
      break;
  }
}

function removeTask($taskToRemove)
{
  $taskDecoded = json_decode($taskToRemove,true);
  $connection = db_connect();
  $sql = "delete from tasks where tasks.id=".$taskDecoded["id"];

  if (mysqli_query($connection, $sql)) {
      echo "record removed successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }

}

function insertTask($newTask)
{
  $taskDecoded = json_decode($newTask,true);
  $connection = db_connect();
  $sql = "insert into tasks (id, name) VALUES (NULL, '".$taskDecoded["name"]."')";

  if (mysqli_query($connection, $sql)) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }

}

 ?>
