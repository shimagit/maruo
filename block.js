//
// ブロックオブジェクトのクラス
//

class Block
{
  constructor(bl,x,y)
  {
    this.bl = bl;
    this.ox = x;
    this.oy = y;
    this.x = x<<4;
    this.y = y<<4;

    this.kill = false;
    this.count = 0;
  }

  //更新処理
  update()
  {
    if(this.kill)return;
    if(++this.count==10)
    {
      this.kill=true;
      return;
    }
  }
  
  //描画処理
  draw()
  {
    if(this.kill)return;

    let sx = (this.bl&15)<<4;
    let sy = (this.bl>>4)<<4;

    let px = this.x - (field.scx);
    let py = this.y - (field.scy);

    const anim = [0,1,2,3,4,3,2,1,0,-1];

    py -= anim[ this.count ];

    vcon.drawImage(chImg,sx,sy,16,16, px,py,16,16);

  }
}