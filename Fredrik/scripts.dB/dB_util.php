<?php
require 'dB_connect.php';

$form_action_func = $_POST['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'insertTask':
            insertTask($_POST['newTask']);
      break;

        case 'undefinerd2':
                insertTask();
          break;

    default:
      break;
  }
}

function insertTask($newTask)
{
  $connection = db_connect();
  $sql = "insert into tasks (id, name) VALUES (NULL, '".$newTask."')";

  if (mysqli_query($connection, $sql)) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }

}

 ?>
