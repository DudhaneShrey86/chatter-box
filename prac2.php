<?php
require 'conn.php';
include("./htmldomparser/simple_html_dom.php");
$u = str_ireplace(" ", "+", $_POST['searched']);
$res = '{"images": [';
$html = file_get_html('https://www.google.com/search?q='.$u.'&tbm=isch');
$t = $html->find('table', 4);
$trows = $t->find('tr');
$countrow = 0;
$counttd = 0;
$counta = 0;
$countimg = 0;
foreach ($trows as $row) {
  if($countrow >= 1){
    break;
  }
  $countrow += 1;
  $td = $row->find('td');
  foreach ($td as $data) {
    $a = $data->find('a', 0);
    $img = $a->find('img', 0);
    $res .= '{"img": "'.$img->src.'"}';
  }
  $res .= ']}';
}
echo $res;
?>
