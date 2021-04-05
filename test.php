<?php
$mysql = new mysqli("localhost", "root", "", "testdb");
if($mysql->connect_error) {
    exit('Could not connect');
}

$sql = "SELECT ID, Name, ImgSource FROM shopping WHERE ID = ?";

$stmt =  $mysql->prepare($sql);

$count = $_GET['q'];
$index;
for($index = 1; $index <= $count; $index++)
{
    $stmt->bind_param("i", $index);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($iid, $iname, $iimgsrc);
    $stmt->fetch();
    // $stmt->close();
    echo 
    '
    <div class="shop-item">
        <div class="img-holder">
            <img src="' . $iimgsrc . '">
        </div>
        <div class="item-description">
            ' . $iname . '
        </div>
    </div>
    ';
}


?>