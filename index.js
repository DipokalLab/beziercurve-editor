const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let start = { x: 50,    y: 200  };
let end =   { x: 450,   y: 200 };
let cp = {
    "cp1": { x: 230,   y: 30  },
    "cp2": { x: 150,   y: 80  }
}

let move = {
    mouse: {x: 0, y: 0},
    target: 'none'
}

document.addEventListener('mousemove', (event) => {
    if (move.target !== 'none') {
        document.querySelector(`#${move.target}`).style.top = `${event.clientY-5}px`
        document.querySelector(`#${move.target}`).style.left = `${event.clientX-5}px`

        cp[move.target].x = event.clientX
        cp[move.target].y = event.clientY
        update()
    }
});

document.getElementById('cp1').addEventListener('mousedown', (event) => {
    move.target = 'cp1'
});
document.getElementById('cp2').addEventListener('mousedown', (event) => {
    move.target = 'cp2'
});
document.addEventListener('mouseup', (event) => {
    move.target = 'none'
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    cp1 = cp.cp1
    cp2 = cp.cp2

    clear()

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);
    ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cp1.x-5, cp1.y-5);
    ctx.moveTo(end.x, end.y);
    ctx.lineTo(cp2.x-5, cp2.y-5);
    ctx.stroke();

    ctx.beginPath();
    ctx.fill();
}

update()