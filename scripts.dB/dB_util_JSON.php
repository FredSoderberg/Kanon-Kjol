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
loadResources(26);
function loadResources($projectID)
{
  $sql = "select * from resource join resprojrelation on resprojrelation.resourceID=resource.id where projectID = $projectID order by rowNumber";
  $result = db_query($sql);
  $result = mysqli_fetch_all($result,MYSQLI_ASSOC);
  //$rows = db_fetch_rows($result);
  echo json_encode($result,JSON_PRETTY_PRINT);
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
