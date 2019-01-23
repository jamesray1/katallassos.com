    (function() {
      var requestAnimationFrameUses = window.requestAnimationFrameUses || window.mozRequestAnimationFrameUses ||
      window.webkitRequestAnimationFrameUses || window.msRequestAnimationFrameUses || function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
      window.requestAnimationFrameUses = requestAnimationFrameUses;
    })();

  // TerrainUses stuff.
  var terrainUses = document.getElementById("terUsesCanvas"),
  backgroundUses = document.getElementById("bgUsesCanvas"),
  terUsesCtx = terrainUses.getContext("2d"),
  bgUsesCtx = backgroundUses.getContext("2d"),
  width = window.innerWidth,
  height = document.body.offsetHeight;
  (height < 400)?height = 400:height;

  terrainUses.width = backgroundUses.width = width;
  terrainUses.height = backgroundUses.height = height;

  // Some random pointsUses
  var pointsUses = [],
  displacementUses = 140,
  powerUses = Math.pow(2,Math.ceil(Math.log(width)/(Math.log(2))));

  // set the starUsest height and end height for the terrainUses
  pointsUses[0] = (height - (Math.random()*height/2))-displacementUses;
  pointsUses[powerUses] = (height - (Math.random()*height/2))-displacementUses;

  // create the rest of the pointsUses
  for(var i = 1; i<powerUses; i*=2){
    for(var j = (powerUses/i)/2; j <powerUses; j+=powerUses/i){
      pointsUses[j] = ((pointsUses[j - (powerUses/i)/2] + pointsUses[j + (powerUses/i)/2]) / 2) + Math.floor(Math.random()*-displacementUses+displacementUses );
    }
    displacementUses *= 0.6;
  }


  // Second canvas used for the starUsess
  bgUsesCtx.fillStyle = '#131929';
  bgUsesCtx.fillRect(0,0,width,height);

  // starUsess
  function StarUses(options){
    this.size = Math.random()*2;
    this.speed = Math.random()*.1;
    this.x = options.x;
    this.y = options.y;
  }

  StarUses.prototype.reset = function(){
    this.size = Math.random()*2;
    this.speed = Math.random()*.1;
    this.x = width;
    this.y = Math.random()*height;
  }

  StarUses.prototype.update = function(){
    this.x-=this.speed;
    if(this.x<0){
      this.reset();
    }else{
      bgUsesCtx.fillRect(this.x,this.y,this.size,this.size);
    }
  }

  function ShootingStarUses(){
    this.reset();
  }

  ShootingStarUses.prototype.reset = function(){
    this.x = Math.random()*width;
    this.y = 0;
    this.len = (Math.random()*80)+10;
    this.speed = (Math.random()*10)+6;
    this.size = (Math.random()*1)+0.1;
    // this is used so the shooting starUsess arent constant
    this.waitTime =  new Date().getTime() + (Math.random()*3000)+500;
    this.active = false;
  }

  ShootingStarUses.prototype.update = function(){
    if(this.active){
      this.x-=this.speed;
      this.y+=this.speed;
      if(this.x<0 || this.y >= height){
        this.reset();
      }else{
        bgUsesCtx.lineWidth = this.size;
        bgUsesCtx.beginPath();
        bgUsesCtx.moveTo(this.x,this.y);
        bgUsesCtx.lineTo(this.x+this.len, this.y-this.len);
        bgUsesCtx.stroke();
      }
    }else{
      if(this.waitTime < new Date().getTime()){
        this.active = true;
      }
    }
  }

  var entitiesUses = [];

  // init the starUsess
  for(var i=0; i < height; i++){
    entitiesUses.push(new StarUses({x:Math.random()*width, y:Math.random()*height}));
  }

  // Add 2 shooting starUsess that just cycle.
  entitiesUses.push(new ShootingStarUses());
  entitiesUses.push(new ShootingStarUses());

  //animateUses backgroundUses
  function animateUses(){

    bgUsesCtx.fillStyle = '#131929';

    bgUsesCtx.fillRect(0,0,width,height);
    bgUsesCtx.strokeStyle = '#ffffff';

    var entUsesLen = entitiesUses.length;

    while(entUsesLen--){
      entitiesUses[entUsesLen].update();
    }

    requestAnimationFrameUses(animateUses);
  }
  animateUses();