
var hiraTable = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわいうえをんー　　　がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉゃぃゅぇょっぃぅぇぉ";
var boinTable = "aiueo";
var siinTable = "kstnhmyrwngzdbpxy";
var reigaiTable = new Array(siinTable.length);
for(var i = 0; i < reigaiTable.length; i++) reigaiTable[i] = new Array(5);
reigaiTable[1][1] = "shi";
reigaiTable[2][1] = "chi";
reigaiTable[2][2] = "tsu";
reigaiTable[9][0] = "n";
reigaiTable[9][1] = "-";
reigaiTable[11][1] = "ji";
function hiraToRoman(str){
  var ret = "";
  for(var i = 0; i < str.length; i++){
    var c = str[i];
    var cn = str[i+1];
    var buf = "";
    var pos = hiraTable.indexOf(c);
    var s = Math.floor(pos/5) -1;
    var b = pos%5;
    var posn = hiraTable.indexOf(cn);
    // 二文字目が取得できてかつ「ゃ」行なら
    if(posn >= hiraTable.indexOf("ゃ") && posn <= hiraTable.indexOf("ょ")){
      var bn = posn%5;
      buf += siinTable[s] + "y" + boinTable[bn];
      i++;
    }else if(pos == hiraTable.indexOf("っ")){
      // 一文字目が取得できてかつ「っ」なら
      var bn = posn%5;
      var sn = Math.floor(posn/5) -1;
      buf += siinTable[sn] + siinTable[sn] + boinTable[bn];
      i++;
    }else{
      if(s > -1 && reigaiTable[s][b]){
        buf += reigaiTable[s][b];
      }else{
        if(s > -1){
          buf += siinTable[s];
        }
        buf += boinTable[b];
      }
    }
    ret += buf;
  }
  return ret;
}

$(function() {
  // Get jQuery dlements
  var $input = $('#input');
  var $result = $('#result');
  $input.on('keyup', function(e) {
    // Convert everytimes
    var r = hiraToRoman(e.target.value);
    $result.val(r);
  });
});
