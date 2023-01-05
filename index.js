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
            const scale = 0.15
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

const player = new Player()

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
    player.update()
    //console.log("it is: ", keys.a.pressed)
    
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
            console.log('space')
            keys.space = true
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
            console.log('space')
            break
    }
})

