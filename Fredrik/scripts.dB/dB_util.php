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

            case 'createDatabase':
                 createDatabase();
              break;

                case 'deleteDatabase':
                     deleteDatabase();
                  break;

                    case 'buildDatabase':
                         buildDatabase();
                      break;

    default:
      break;
  }
}

function removeTask($taskToRemove)
{
  $taskDecoded = json_decode($taskToRemove,true);
  $sql = "delete from tasks where tasks.id=".$taskDecoded["id"];

  if (db_query($sql)) {
      echo "record removed successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }

}

function insertTask($newTask)
{
  $taskDecoded = json_decode($newTask,true);
  $sql = "insert into tasks (id, name) VALUES (NULL, '".$taskDecoded["name"]."')";

  if (db_query($sql)) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }

}

function createDatabase()
{
  $sql = "CREATE DATABASE NockOffDB";
  if (db_query($sql)) {
      echo "Database created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
}

function deleteDatabase()
{

}

function buildDatabase()
{

}



 ?>
