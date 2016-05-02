
function DrawParticles(gameCtx, canvas) {
    var W = canvas.width;
    var H = canvas.height;
    var particles = [];
    var mouse = {};
    
    //Lets create some particles now
    var particle_count = 50;
    for(var i = 0; i < particle_count; i++)
    {
        particles.push(new particle());
    }
    
    
   
    function particle()
    {
      var xdirection = -2.5,
        ydirection = 15;
        //speed, life, location, life, colors
        //speed.x range = -2.5 to 2.5 
        //speed.y range = -15 to -5 to make it move upwards
        //lets change the Y speed to make it look like a flame
        this.speed = {x: xdirection + Math.random()*5, y: ydirection + Math.random()*-5};
        //location = mouse coordinates
        //Now the flame follows the mouse coordinates
        
        this.location = {x: W/2 + 100, y: H/2};
        //radius range = 10-30
        this.radius = Math.random()*20;
        //life range = 20-30
        this.life = 20+Math.random()*10;
        this.remaining_life = this.life;
        //colors
        this.r = Math.round(Math.random()*255);
        this.g = Math.round(Math.random()*50);
        this.b = 0;
    }
    
    this.drawParticle = function()
    {
       
        // gameCtx.globalCompositeOperation = "lighter";
        
        for(var i = 0; i < particles.length; i++)
        {
            var p = particles[i];
            gameCtx.beginPath();
            //changing opacity according to the life.
            //opacity goes to 0 at the end of life of a particle
            p.opacity = Math.round(p.remaining_life/p.life*100)/100
            //a gradient instead of white fill
            var gradient = gameCtx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
            gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
            gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
            gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
            gameCtx.fillStyle = gradient;
            gameCtx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
            gameCtx.fill();
            
            //lets move the particles
            p.remaining_life--;
            p.radius--;
            p.location.x += p.speed.x;
            p.location.y += p.speed.y;
            
            //regenerate particles
            if(p.remaining_life < 0 || p.radius < 0)
            {
                //a brand new particle replacing the dead one
                particles[i] = new particle();
            }
        }
    }
    
}
