<?php
require 'dB_connect.php';

header('Content-Type: application/json');

$form_action_func = $_GET['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {
    case 'getAllTasks':
      getAllTasks();
    break;

    case 'loadResources':
      loadResources(
              $_GET['project']
      );
    break;

    case 'loadTasks':
      loadTasks(
              $_GET['project']
      );
    break;

    case 'loadProjects':
      loadProjects(
        $_GET['username']
      );
    break;

    default:
      break;
  }
}

function loadResources($projectID)
{
  $sql = "select * from resource join resprojrelation on resprojrelation.resourceID=resource.id where projectID = $projectID order by rowNumber";
  $result = db_query($sql);

  if ($result) {
    $result = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($result,JSON_PRETTY_PRINT);
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function loadTasks($projectID)
{
  $sql = "select * FROM `task` WHERE parentProject = $projectID";
  $result = db_query($sql);

  if ($result) {
    $result = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($result,JSON_PRETTY_PRINT);
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function loadProjects($user)
{
  $sql = "select * FROM `project` WHERE adminEmail = '$user'";
  $result = db_query($sql);
  if($result) {
    $result = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($result,JSON_PRETTY_PRINT);
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

//---------------------DATABASE TOOLS-----------------------------------------------------


 ?>
