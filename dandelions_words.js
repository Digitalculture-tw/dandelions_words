var dan; // dandelion
var dscount; // amount of seeds
var ds = []; // dandelion seeds
var wind; // wind force
var tags = ["台中", "小吃街", "勤美誠品", "數位文化", "孵空間", "逢甲夜市", "東海大學", "高美濕地", "美食", "公園", "秋紅谷", "火車站"];

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  dan = new Dandelion(width/2, height, height/2);
  dscount = 15;
  
  generateSeeds();

  wind = createVector(0, 0);
  textFont("Arial");
  background(40);
}

function draw() {
  background(40);
  wind.set((mouseX-width/2)*0.01, (mouseY-height/2)*0.01);

  dan.update();
  for (var i = 0; i < dscount; i++) {
    ds[i].update(wind);
  }

  dan.display();
  for (var i = 0; i < dscount; i++) {
    ds[i].display();
  }
  
  textSize(12);
  noStroke();
  fill(255);
  text("fps: "+frameRate(),10,10);
  //var unitVecX = createVector(1, 0);
  //text("angle: "+p5.Vector.cross(unitVecX,wind),10,20);
}

function keyTyped() {
  if (key === 'd') {
    ds[int(random(dscount))].detached = true;
  }
  if (key === 'g') {
    generateSeeds();
  }
  if (keyCode === UP) {
  }
  if (keyCode === DOWN) {
  }
}

function generateSeeds() {
  ds = [];
  for (var i = 0; i < dscount; i++) {
    var ang = -i*(TWO_PI*0.8)/(dscount-1)+(TWO_PI*0.15);
    ds[i] = new DandelionSeed(width/2+cos(ang)*50, height/2+sin(ang)*50, 180, ang);
  }
}

//****************************
// DandelionSeed Class
//****************************
var DandelionSeed = function(_x, _y, _l, _rot) {
  this.x = _x;
  this.y = _y;
  this.l = _l;
  this.rot = _rot;
  this.detached = false;

  this.rot_var = random(0.05);
  this.rot_mag = random(0.08);

  var fw = this.l*0.05;
  var fh = this.l*0.6;
  this.fcount = 8; // feather count
  this.fpos = [];

  for (var i = 0; i < this.fcount; i++) {
    //this.fpos[i] = createVector(fw, i*2*fh/this.fcount-fh);
    this.fpos[i] = createVector(this.l*cos(i*0.8/(this.fcount-1)-0.4), this.l*sin(i*0.8/(this.fcount-1)-0.4));
  }

  this.display = function() {
    textSize(8);
    push();
    translate(this.x, this.y);
    rotate(this.rot + sin(this.rot_var)*this.rot_mag);
    fill(255);
    stroke(255);
    noStroke();
    ellipse(this.l*0.15/2, 0, this.l*0.15, this.l*0.03);

    stroke(255);
    strokeWeight(1);
    //line(0, 0, this.l, 0);
    fill(160);
    noStroke();
    text("LOVE is everything 愛是一切 DCC", this.l*0.18, 0);

    strokeWeight(0.6);
    stroke(255, 120);
    for (var i = 0; i < this.fcount; i++) {
      line(this.l, 0, this.fpos[i].x-20, this.fpos[i].y*0.6);
      line(this.fpos[i].x-20, this.fpos[i].y*0.6, this.fpos[i].x, this.fpos[i].y);
      push();
      translate(this.fpos[i].x, this.fpos[i].y);
      rotate();
      text(tags[i], 0, 0);
      pop();
    }
    pop();
  }

  this.update = function(_f) {
    if (this.detached) {
      this.x += _f.x;
      this.y += _f.y;
      this.rot += (-PI/2 - this.rot)*0.02;
      this.rot_var += 0.1;
    } else {
    this.rot_var += 0.05;
    }
    //this.rot += random(-0.05, 0.05);
  }
}

//****************************
// Dandelion Class
//****************************
var Dandelion = function(_rx, _ry, _l) {
  this.x = _rx; // root x
  this.y = _ry; // root y
  this.l = _l; // length of stick
  this.rot = -PI/2;
  this.rot_var = random(0.01);
  this.rot_mag = random(0.05);
  this.ds;

  this.display = function() {
    strokeWeight(4);
    stroke(180);
    push();
    translate(this.x, this.y);
    //rotate(this.rot + sin(this.rot_var)*this.rot_mag);
    rotate(this.rot);
    line(0, 0, this.l, 0);
    strokeWeight(4);
    fill(40);
    ellipse(this.l, 0, 100, 100);
    pop();
  }

  this.update = function() {
    this.rot_var += 0.03;
  }
}
