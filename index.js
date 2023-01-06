const canvas = document.querySelector('canvas')
console.log(canvas)
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

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
            this.position.x += this.velocity.x
        }
    } //update()
} // player() class


class Invader {

    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()

        image.src = './img/invader.png'        
        
        image.onload = () => { 
            const scale = 0.55
            this.image = image,
            this.width = image.width * scale
            this.height = image.height * scale 
            //this.width = 100
            //this.height = 100

            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height / 2
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

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    } //update()
} // Invader() class




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
const invader = new Invader()

player.update()

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

function animate() {
    requestAnimationFrame(animate)
    //console.log(sdgd)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    invader.update() 
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

