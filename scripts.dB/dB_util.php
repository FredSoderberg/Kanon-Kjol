<?php
require 'dB_connect.php';

$form_action_func = $_POST['function'];

if(isset($form_action_func))
{
  switch ($form_action_func) {

    case 'saveNewUser':
     saveNewUser(
        $_POST['username'],
        $_POST['password'],
        $_POST['defaulProject']
      );
    break;

    case 'checkCookieValid':
      checkCookieValid(
        $_POST['username'],
        $_POST['sessID']
      );
    break;

    case 'verifyUser':
      verifyUser(
        $_POST['username'],
        $_POST['password']
      );
    break;

    case 'updateObject':
      updateObject(
        $_POST['objectToSend']
      );
    break;

    case 'storeObject':
      storeObject(
        $_POST['objectToSend']
      );
    break;





    case 'deleteObject':
      deleteObject(
        $_POST['objectToSend']
      );
    break;

    case 'createDatabase':
      createDatabase();
    break;

    case 'dropDB':
      dropDB();
    break;

    case 'dropObjectTable':
      dropObjectTable(
        $_POST['objectToSend']
      );
    break;

    case 'builObjectTable':
      builObjectTable(
        $_POST['objectToSend']
      );
    break;

    case 'builUserTable':
      builUserTable();
    break;

    // case 'insertTask':
    //   insertTask(
    //     $_POST['newTask']
    //   );
    // break;
    //
    // case 'removeTask':
    //   removeTask(
    //     $_POST['taskToRemove']
    //   );
    // break;

    default:
    break;
  }
}




function updateObject($object)
{
  $arr = json_decode($object,true);
  $sql = "update ".$arr["type"]." SET ";
  foreach ($arr as $key => $value) {
    if($key != "id" && $key != "type" && $key != "structure")$sql .= $key." = '".$value."'";
    if($key != "id" && $key != "type" && $key != "id_temp" && $key != "structure") $sql .= ", ";

  }
  $sql .= " where ".$arr["type"].".id = ".$arr["id"];

  if (db_query($sql)) {
      echo "record modified successfully";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }

}

function deleteObject($object)
{
  $arr = json_decode($object,true);
  $sql = "delete from ".$arr["type"]." where ".$arr["type"].".id=".$arr["id"];

  if (db_query($sql)) {
      echo "record removed successfully";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }

}

// $myObj->id = 5;
// $myObj->name = "test";
// $myObj->adminEmail = "New York2";
// $myObj->lengthDays = "Project";
// $myObj->type = "Project3";
//
// $myJSON = json_encode($myObj);
// $myJSON = json_decode($myJSON,true);
// //storeProject($myJSON, false);


function storeProject($arr,$quiet){

    $sql = "insert into ".$arr['type']." (";
    $sqlFirst = "";
    $sqlSecond = "";
    foreach ($arr as $key => $value) {
          if($key != 'type' && $key !=  'id')  $sqlFirst .= ", ";
          if($key != 'type' && $key !=  'id')  $sqlSecond.= ", ";

      if($key != "type")$sqlFirst .= $key;
      if($key != 'type' && $key !=  'id') $sqlSecond .= "'".$value."'";
      if ($key == "type") { break;}
}

    $sql .= $sqlFirst.") VALUES (NULL".$sqlSecond.")";
    $connection = db_connect(false);
    $result = mysqli_query($connection,$sql);
    if ($result && $quiet) {
        return mysqli_insert_id($connection);
}
        elseif ($result && !$quiet) {
          echo $result;
        }
     else {
      $failure = (string)$sql;
      header('HTTP/1.0 404 Not found: '.$failure);
    }
}


function storeObject($object,$quiet)
 {
  $object = json_decode($object,true);
   switch ($object['type']) {
     case 'Project':
      storeProject($object,$quiet);
       break;

     default:
       # code...
       break;
   }
//   $arr = json_decode($object,true);
//   $sql = "insert into ".$arr['type']." (";
//   $sqlFirst;
//   $sqlSecond;
//   foreach ($arr as $key => $value) {
//    if($key != "type" && $key != "structure")$sqlFirst .= $key;
//    if($key != "id_temp" && $key != "type" && $key != "structure") $sqlFirst .=", ";
//
//    if($key != 'type' && $key !=  'id' && $key !=  'structure') $sqlSecond .= "'".$value."'";
//    if($key != 'type' && $key !=  'id' && $key !=  'id_temp' && $key != 'structure') $sqlSecond .= ", ";
//   };
//   $sql .= $sqlFirst.") VALUES (NULL, ".$sqlSecond.")";
//
//   if (db_query($sql)) {
//       echo "record stored successfully";
//   } else {
//     $failure = (string)$sql;
//     header('HTTP/1.0 404 Not found: '.$failure);
//   }
}

function saveNewUser($username,$pass,$defaulProject)
{
  $passHash = password_hash($pass, PASSWORD_BCRYPT);
  $sessionID = rand(1000000,10000000);
  $sql = "insert into user (email, password, sessionID) VALUES ('$username', '$passHash', $sessionID)";
  if (db_query($sql)) {
      storeObject($defaulProject,true);
      echo $sessionID;
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }

}

function checkCookieValid($user,$sessionID)
{
  $sql = "select * from user where email = '$user' AND sessionID = '$sessionID' ";
  $result = db_query($sql);
  if ($result && (mysqli_num_rows($result)>0)) {
      echo "true";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function verifyUser($username,$pass)
{
  $sql = "select password from user where email = '".$username."'";
  $result = db_query($sql);
  $passHash = mysqli_fetch_assoc($result);

  if ($result && password_verify($pass,$passHash['password'])) {
    $sessionID = rand(1000000,10000000);
    $sql = "update user set sessionID = '$sessionID' where user.email ='$username'";

    if(db_query($sql)) {
      echo $sessionID;
    }

  } else {
      $failure = (string)$sql;
      header('HTTP/1.0 404 Not found: '.$failure);

  }
}


// ---------------------------------- DEPRECATED ----------------------------------------
function createDatabase()
{
  $sql = "CREATE DATABASE NockOff";
  $connect = db_connect(true);
  if (mysqli_query($connect,$sql)) {
      echo "Database created successfully";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function dropDB()
{
  $sql = "drop database NockOff";
  if (db_query($sql)) {
      echo "Nock-Off database dropped";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function dropObjectTable($object)
{
  $arr = json_decode($object,true);
  $sql = "drop table ".$arr["type"];
  if (db_query($sql)) {
      echo " table ".$arr["type"]." dropped successfully";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function builObjectTable($object)
{
  $arr = json_decode($object,true);
  $sql = "create table ".$arr["type"]." ( ";
  $i = 0;
  foreach ($arr as $key => $value) {
    if ($key != "type" && $key != "structure") {
      $sql .= $key." ".$arr["structure"][$i];
      if ($arr["structure"][$i] == "VARCHAR")  $sql .= " (255)";
      $sql .= " NOT NULL";
      $i++;
    }
    if ($key == "id") $sql .=" AUTO_INCREMENT";
    if ($key != "type" && $key != "structure" && $key != "id_temp") $sql .= ", ";
  }
  $sql .= ", PRIMARY KEY (id))";

  if (db_query($sql)) {
      echo "table created for ".$arr["type"]." successfully";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

function builUserTable($object)
{
  $sql = "create table user (email VARCHAR (255) NOT NULL, password VARCHAR (60) NOT NULL, sessionID INT NOT NULL, PRIMARY KEY (email))";
  if (db_query($sql)) {
      echo "table created for user successfully";
  } else {
    $failure = (string)$sql;
    header('HTTP/1.0 404 Not found: '.$failure);
  }
}

//------------------------------------------------------------------------

// $arr = array(
//   "type" => "resource",
//   "id" => "temp",
//   "value" => "tempValue",
//   "id_temp" => "temp_ID",
//   "structure" => ["INT","VARCHAR","INT"]
// );
//
//
//   // $sql = "drop table ".$arr["type"];
//   // echo $sql;
// $sql = "create table ".$arr["type"]." ( ";
// $i = 0;
// foreach ($arr as $key => $value) {
//   if ($key != "type" && $key != "structure") {
//     $sql .= $key." ".$arr["structure"][$i];
//     if ($arr["structure"][$i] == "VARCHAR")  $sql .= " (255)";
//     $sql .= " NOT NULL";
//     $i++;
//   }
//   if ($key == "id") $sql .=" AUTO_INCREMENT";
//   if ($key != "type" && $key != "structure" && $key != "id_temp") $sql .= ", ";
// }
// $sql .= ", PRIMARY KEY (id))";
// echo $sql;

// function removeTask($taskToRemove)
// {
//   $taskDecoded = json_decode($taskToRemove,true);
//   $sql = "delete from tasks where tasks.id=".$taskDecoded["id"];
//
//   if (db_query($sql)) {
//       echo "record removed successfully";
//   } else {
//     $failure = (string)$sql;
//     header('HTTP/1.0 404 Not found: '.$failure);
//   }
//
// }
//
// function insertTask($newTask)
// {
//   $taskDecoded = json_decode($newTask,true);
//   $name = $taskDecoded["name"];
//   $sql = "insert into tasks (id, name) VALUES (NULL, '$name')";
//   if (db_query($sql)) {
//       echo "New record created successfully";
//   } else {
//     $failure = (string)$sql;
//     header('HTTP/1.0 404 Not found: '.$failure);
//   }
//
// }

 ?>
