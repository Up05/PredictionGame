function newTarget(){
    targetCount ++
    let xDir = random([-1,1])
    let x = 0
    if(xDir < 0){
        x = -10
    } else {
        x = width + 10
    }
    target.push({
        x: x,
        y: random(height - 30),
        speed: -1 * xDir * random(0.1,3),
        l: 150
    })
}


function newParticle(x, y){
    for(let i = 0; i <= 10; i ++){
        particle.push({
            x: x,
            y: y,
            s: floor(random(5, 25)),
            xs: random(-2, 2),
            ys: random(-2, 2),
            l: 75,
            update: function(){
                this.x += this.xs
                this.y += this.ys
                this.l --
            },
            show: function(){
                push();
                    fill(200,0,40,this.l)
                    rect(this.x,this.y,this.s)
                pop()
            }
        })
    }
}
