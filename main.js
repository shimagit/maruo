const GAME_FPS = 1000/60;   //FPS
const SCREEN_SIZE_W = 256;
const SCREEN_SIZE_H = 224;


let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

con.imageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime;


let chImg = new Image();
chImg.src = "sprite.png";
// chImg.onload = draw;

//キーボード
let keyb={};

//おじさんを作る
let ojisan = new Ojisan(100,100);


//更新処理
function update()
{
  ojisan.update(); 
}

function drawSprite(snum,x,y)
{
  let sx = (snum&15)<<4;
  let sy = (snum>>4)<<4;

  vcon.drawImage(chImg,sx,sy,16,32, x, y,16,32);
  console.log(sx,sy);

}


//描画処理
function draw()
{
  //画面を水色でクリア
  vcon.fillStyle="#66AAFF";
  vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);

  //おじさんを表示
  ojisan.draw();

  //デバッグ情報を表示
  vcon.font="24px 'Impact'";
  vcon.fillStyle="#FFFFFF";
  vcon.fillText("FRAME:"+frameCount,10,20)

  //仮想画面から実画面へ拡大転送
  con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H, 0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);
}

// setInterval(mainLoop, 1000/60);

//ループ開始
window.onload = function()
{
  startTime = performance.now();
  mainLoop();
}

//メインループ
function mainLoop()
{
  let nowTime = performance.now();
  let nowFrame = (nowTime-startTime)/ GAME_FPS;

  if(nowFrame > frameCount)
  { 
    let c = 0;
    while( nowFrame > frameCount )
    {
      frameCount++;
      //更新処理
      update();
      if( ++c>=4 )break;
    }
    //描画処理
    draw();
  }
  requestAnimationFrame(mainLoop);
}

//キーボードが押された時に呼ばれる
document.onkeydown = function(e)
{
  if(e.keyCode == 37)keyb.Left  = true;
  if(e.keyCode == 39)keyb.Right = true;
  if(e.keyCode == 90)keyb.BBUTTON = true;
  if(e.keyCode == 88)keyb.ABUTTON = true;
}

//キーボードが離された時に呼ばれる
document.onkeyup = function(e)
{
  if(e.keyCode == 37)keyb.Left  = false;
  if(e.keyCode == 39)keyb.Right = false;
  if(e.keyCode == 90)keyb.BBUTTON =false;
  if(e.keyCode == 88)keyb.ABUTTON = false;
}