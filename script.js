const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const print = (text) => { console.log(text) }

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

const Data = {
    COUNT_OF_DIVISIONS: 3,
    RADIUS: Math.PI * 50,
    Origin: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
    Velocity: Math.PI,
    InnerObjectRadius: 5,
    ValueOfInnerOriginX: 5
}

function toOrigin() {
    ctx.translate(Data.Origin.x, Data.Origin.y)
}

function drawLine(x1, y1, x2, y2, _rad = 0) {
    ctx.save()

    toOrigin()
    ctx.rotate(_rad)
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    ctx.restore()
}

class LinearUnit {
    constructor(radain) {
        this.radain = radain
        this.innerObjectX = -Data.RADIUS
        this.movementDirection = 1
    }
    draw() {
        ctx.save()
        //Line
        toOrigin()
        ctx.rotate(this.radain)
        ctx.moveTo(-Data.RADIUS, 0)
        ctx.lineTo(Data.RADIUS, 0)
        ctx.stroke()
        //Ball
        ctx.beginPath()

        ctx.arc(this.innerObjectX, 0, Data.InnerObjectRadius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        ctx.restore()
    }
    overLimit() {
        if (this.innerObjectX > Data.RADIUS) {
            this.innerObjectX = Data.RADIUS
            this.movementDirection *= -1
        }
        if (this.innerObjectX < -Data.RADIUS) {
            this.innerObjectX = -Data.RADIUS
            this.movementDirection *= -1
        }
    }
    move() {
        this.innerObjectX += Data.Velocity * this.movementDirection
        this.overLimit()
    }
}

let RenderList = []
for (var i = 0; i < Data.COUNT_OF_DIVISIONS; i++) {
    let _rad = i * Math.PI / Data.COUNT_OF_DIVISIONS
    RenderList.push(new LinearUnit(_rad))
    RenderList[i].innerObjectX += i * Math.PI * Data.ValueOfInnerOriginX
}

function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    for (var i = 0; i < Data.COUNT_OF_DIVISIONS; i++) {
        RenderList[i].draw()
        RenderList[i].move()
    }
    requestAnimationFrame(render)
}
render()