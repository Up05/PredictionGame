let target = []
let targetCount, c
let particle = []
let mouseTrail = []
let o, pg


function setup(){
    c = createCanvas(innerWidth - 60, innerHeight - 20)
    c.position(30, 10) // querrySelector('canvas').style.position = relative; ... .style.left...
    c.style('border','1px solid #aaa5')
    newTarget()
    noStroke()
    targetCount = 1
    noStroke(); fill(250, 0, 60)
    noCursor()

    o = new p5.Oscillator()
    o.start()
    o.setType('sine')
    o.amp(0)
    o.freq(200)

    pg = createGraphics(width, height)
    pg.background(255, 0)
    u_fog()
    
    let parag = select('p')
    parag.position(width / 2, 80) // this ain't gonna be changing alot... sooo 
}

function draw(){

    if(targetCount == 0){cursor() ;return}

    background(20)
    push()
        noStroke()
        fill(255,0,80,240)
        ellipse(mouseX, mouseY, 10)
    pop()
    makeMouseTrail()
    for(let i in target){
        if(target[i] == 'undefined'){
            continue; // <-- main optimization! （￣︶￣）↗　
        }

        push()
            noStroke(); fill(250, 0, 60)
            u_defaultTriangle(target[i].x, target[i].y, target[i].speed)
        pop()

        target[i].x += target[i].speed 

        if(target[i].l > 0){
            target[i].l --

            let futureX = target[i].x + (target[i].speed * 240)
            push()
                fill(250, 90, 60, target[i].l)
                stroke(255, 200, 160, target[i].l)
                rect(futureX, target[i].y, 40, 30)
            pop()
    }

        if(target[i].x < -20 || target[i].x > width + 20){
            delete target[i]
            targetCount --
        }
    }

    document.getElementById("0").innerText = targetCount + "/" + 50

    if(targetCount > 49){
        target.length = 0
        console.log("%c good job", "color: #0f0")
    }

    if(document.hasFocus){
        mousePressed()
    }

    if(particle){
        for(let i in particle){
            particle[i].update()
            particle[i].show()
            if(particle[i].l < 1){
                particle.shift()
            }
        }
    } 

    image(pg, 0, 0);
}
    
function mousePressed(){
    
    for(let i in target){
        let futureX = target[i].x + (target[i].speed * 240)
        let y = target[i].y
 
        if(mouseX > futureX && mouseX < futureX + 40 && mouseY > y && mouseY < y + 30){
            delete target[i]; targetCount --; newParticle(mouseX, mouseY)
            o.amp(1); setTimeout(() => {o.amp(0.0)}, 10)
            freq = midiToFreq(int(random(30,50))); o.freq(freq) 
            let il = round(random(0.5,2))
            for(let i = 1; i <= il; i ++){
                newTarget()
            }}}
} 


function makeMouseTrail(){
    mouseTrail.push(mouseX)
    mouseTrail.push(mouseY)

    if(mouseTrail.length >= 20){
        let temp = mouseTrail.shift()
            temp = mouseTrail.shift()
    }

    push()
        for(let i = 0; i <= mouseTrail.length; i += 2){
            stroke(255, 0, 80, (i * 10)); strokeWeight(2)
            if(mouseTrail[i + 1] && mouseTrail[i - 2]){
                line(mouseTrail[i - 2], mouseTrail[i - 1], mouseTrail[i], mouseTrail[i + 1])
            }
        }
    pop()   
}

function u_fog(){
    push()
// * stars
        for(let i = 0; i <= 80; i ++){
            let x = random(width)
            let dist = abs(width / 2 - x)
            pg.noStroke()
            pg.fill(255, 0, 80, 150 - (dist / 6))
            pg.ellipse(x, random(height), 10)
        }
        pg.filter(BLUR, 1)
// * main star
        pg.fill(255, 0, 30, 10)
        pg.noStroke()
        let a = PI;
        let r = 500
        let gx, gy
        for(let i = 0; i <= 300; i ++){
            a += 1; r -= 1.5
            gx = cos(a) * r + width / 2
            gy = sin(a) * r + height /2
            pg.ellipse(gx, gy, 160)
        }
        pg.filter(BLUR, 1)
// * vertical lines
        pg.strokeWeight(1); pixelDensity(1)
        for(let x = 0; x <= width; x ++){
            let rand = floor(Math.random() * 100) * 2
            pg.stroke(rand, 3)
            pg.line(x, 0, x, height)
        }
    pop()
}

function u_defaultTriangle(x, y, speed){
    let dir = (speed > 0) ? 1 : -1
    triangle(x, y, x + (dir * 60), y + 20, x, y + 40)
    push()
        fill(255, 50)
        triangle(x, y, x + (dir * 60) - 2, y + 18, x, y + 18)
    pop()
}