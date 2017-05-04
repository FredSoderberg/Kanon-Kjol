<?php
require 'dB_connect.php';

header('Content-Type: application/json');

$form_action_func = $_POST['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'getAllTasks':
      getAllTasks();
    break;

    case 'loadResources':
      loadResources();
    break;

    default:
      break;
  }
}
loadResources(28);
function loadResources($projectID)
{
  $sql = "select * from resource where id in (select resourceID from resprojrelation where projectID = $projectID)";
  $result = db_query($sql);
  $rows = db_fetch_rows($result);
  echo json_encode($rows,JSON_PRETTY_PRINT);
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
