<?php
require 'dB_connect.php';
checkCookieValid("abba",9304566);

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

          case 'saveNewUser':
               saveNewUser(
                 $_POST['username'],
                 $_POST['password']
               );
            break;

            case 'checkCookieValid':
                 checkCookieValid(
                   $_POST['username'],
                   $_POST['sessID']
                        );
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
      echo "Error: " . $sql;
  }

}

function insertTask($newTask)
{
  $taskDecoded = json_decode($newTask,true);
  $name = $taskDecoded["name"];
  $sql = "insert into tasks (id, name) VALUES (NULL, '$name')";
  if (db_query($sql)) {
      echo "New record created successfully";
  } else {
      echo "Error: " . $sql;
  }

}

function createDatabase()
{
  $sql = "CREATE DATABASE Nock-Off";
  $connect = db_connect(true);
  if (mysqli_query($connect,$sql)) {
      echo "Database created successfully";
  } else {
      echo "Error: " . $sql;
  }
}

function deleteDatabase()
{

}

function buildDatabase()
{

}

function saveNewUser($user,$pass)
{
  $passHash = password_hash($pass, PASSWORD_BCRYPT);
$sessionID = rand(1000000,10000000);
  $sql = "insert into users (email, password, sessionID) VALUES ('$user', '$passHash', $sessionID)";
  if (db_query($sql)) {
      echo $sessionID;
  } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }

}

function checkCookieValid($user,$sessionID)
{
  $sql = "select * from users where email = '$user' AND sessionID = '$sessionID' ";
  $result = db_query($sql);
  if ($result && (mysqli_num_rows($result)>0)) {
      echo "true";
  } else {
      echo "Error: " . $sql;
  }
}

 ?>
