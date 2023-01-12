const canvas = document.querySelector('canvas')
//console.log(canvas)
const c = canvas.getContext('2d')

// added minus 5 to prevent canvas from being slightly too large, 
// which caused it to move when using arrow keys
canvas.width = innerWidth -5
canvas.height = innerHeight -5

class Player {

    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0

        const image = new Image()

        image.src = './img/spaceship.png'        
        
        image.onload = () => { 
            const scale = 0.10
            this.image = image,
            this.width = image.width * scale
            this.height = image.height * scale 
            //this.width = 100
            //this.height = 100

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }        
        }
    } // constructor

    draw() {
        // dead code, next two lines; just for early development
        //c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.save()

        //console.log(player.position.x + player.width / 2 )
        //console.log(player.position.y + player.height / 2 )

        c.translate(player.position.x + player.width / 2, 
                    player.position.y + player.height / 2)
        
        c.rotate(this.rotation)

        c.translate(-player.position.x - player.width / 2, 
                    -player.position.y - player.height / 2)


        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
            this.width, 
            this.height)
        
        c.restore()
    } //draw()

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x  // temporarily knocked out
        }
    } //update()
} // player() class


class Invader {

    /* {position} */
    constructor({position} ) {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = './img/invader.png'        
        image.onload = () => { 
            const scale = 1
            this.image = image,
            this.width = image.width * scale
            this.height = image.height * scale 
            this.position = {
                //x: canvas.width / 2 - this.width / 2,
                //y: canvas.height / 2
                x: position.x,
                y: position.y
            }        
        }
    } // constructor

    draw() {

        c.drawImage(
            this.image, 
            this.position.x, 
            this.position.y,
            this.width, 
            this.height)
        
    } //draw()

    update({velocity}) {
        if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
        }
    } //update()
} // Invader() class

class Grid {
    constructor({position}) {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        //this.invaders = [new Invader()]
        this.invaders = []

        const cols = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = cols * 30

        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({position: {
                    x: x * 30,
                    y: y * 30
                }}
            ))
        }
        //console.log(this.invaders) 
    } // constructor
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0 

        if (this.position.x +this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }

} // end Grid class



class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, 
            this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


const player = new Player()
const projectiles = []
//const pos = {x:0, y:0}  //move into animate()
//const grids = [new Grid({pos})]
const grids = []

//player.update()

const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    }

}


let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 650)  


function animate() {
    requestAnimationFrame(animate)
    //console.log(sdgd)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    player.update()

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }

    })

    grids.forEach(grid => {
        grid.update()
        grid.invaders.forEach(invader => {
            invader.update({velocity: grid.velocity})
        })
    })

    
    if (keys.ArrowLeft.pressed && player.position.x >= 0 ) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }

    //console.log(frames)
    const pos = {x:0, y:0}
    randomInterval = Math.floor(Math.random() * 500 + 666)
    if (frames % randomInterval === 0) {
        grids.push(new Grid({pos}))
        frames = 0
        console.log(randomInterval)

    }

    frames++
}

animate()

addEventListener('keydown', ({key}) => {
    //console.log(key)
    switch (key) {
        case 'ArrowLeft':
            //console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            //console.log('right')
            keys.ArrowRight.pressed = true
            break
        case ' ':
            //console.log('space')
            projectiles.push(
                new Projectile({
                    position: { 
                        x: player.position.x + player.width / 2, 
                        y: player.position.y },
                    velocity: {
                        x: 0,
                        y: -10
                    }
                }))
            //keys.space = true
            //console.log(projectiles)
            break
    }
})

addEventListener('keyup', ( {key}) => {
    //console.log(key)
    switch (key) {
        case 'ArrowLeft':
            //console.log('left')
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            //console.log('right')
            keys.ArrowRight.pressed = false
            break
        case ' ':
            //console.log('space')
            break
    }
})

