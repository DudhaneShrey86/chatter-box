<?php
  require 'conn.php';
  include("./htmldomparser/simple_html_dom.php");
  if(isset($_GET['search']) && !empty($_GET['search'])){
    $res = '{"images": [';
    $search = str_ireplace(" ", "+", $_GET['search']);
    $html = file_get_html('https://www.google.com/search?q='.$search.'&tbm=isch');
    $table = $html->find('table', 4);
    $trows = $table->find('tr');
    $countrow = 0;
    foreach ($trows as $row) {
      if($countrow >= 1){
        break;
      }
      $countrow += 1;
      $td = $row->find('td');
      foreach ($td as $data) {
        $a = $data->find('a', 0);
        $img = $a->find('img', 0);
        $res .= '{"img": "'.$img->src.'"}, ';
      }
    }
    $res = chop($res, ', ');
    $res .= ']}';
    echo $res;
  }
?>
