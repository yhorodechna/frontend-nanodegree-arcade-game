const SCORE = 0;
const CANVAS = {
    width: 505,
    height: 605,
    cellHeight: 83,
    cellWidth: 101,
};
const RESET_ENEMIES_SPEED = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        allEnemies[i].speed = Math.floor(Math.random() * (100 - 40)) + 40;
    }
};
class Enemy {
    constructor({ x, y, speed, boardWidth, player, width, height, resetEnemiesSpeed }) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.defaultSpeed = speed;
        this.boardWidth = boardWidth;
        this.width = width;
        this.height = height;
        this.player = player;
        this.sprite = 'images/enemy-bug.png';
        this.score = 0;
        this.resetEnemiesSpeed = resetEnemiesSpeed
    };
    update = function (dt) {
        this.x += dt * this.speed;
        this.handleCollision();
        if (this.x >= this.boardWidth) {
            this.x = 0;
        };
        if (this.player.score !== this.score) {
            this.score = this.player.score;
            this.speed += 40;
        };
    };
    render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    handleCollision = function () {
        if (
            this.x + this.width > this.player.x &&
            this.y > this.player.y - this.player.height &&
            this.player.x + this.player.width > this.x &&
            this.player.y > this.y - this.height
        ) {
            this.player.score = 0;
            this.score = 0;
            this.resetEnemiesSpeed();
            alert(`You lose! Score: ${this.player.score}`);
            this.player.resetPosition();
        };
    };
};
class Player {
    constructor({ boardWidth, boardHeight, stepX, stepY, score }) {
        this.sprite = 'images/char-boy.png';
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.stepX = stepX;
        this.stepY = stepY;
        this.height = 50;
        this.width = 50;
        this.score = score;
        this.x = this.boardWidth - 3 * this.stepX;
        this.y = this.boardHeight - 2.5 * this.stepY;
    }
    update = function (dt) {
    };
    render = function (dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    resetPosition() {
        this.x = this.boardWidth - 3 * this.stepX;
        this.y = this.boardHeight - 2.5 * this.stepY;
    };
    handleInput = function (key) {
        switch (key) {
            case "up":
                if (this.y > 0) this.y -= this.stepY;
                if (this.y < 0) {
                    setTimeout(() => {
                        this.score++
                        alert(`You won! Score:  ${this.score}`);
                        this.resetPosition();
                    }, 50)
                };
                break;
            case "down":
                if (this.y < this.boardHeight - 3 * this.stepY) this.y += this.stepY;
                break;
            case "left":
                if (this.x > 0) this.x -= this.stepX;
                break;
            case "right":
                if (this.x < this.boardWidth - this.stepX) this.x += this.stepX;
                break;
            default:
                break;
        };
    };
};
const player = new Player({
    boardWidth: CANVAS.width,
    boardHeight: CANVAS.height,
    boardWidth: CANVAS.width,
    stepX: CANVAS.cellWidth,
    stepY: CANVAS.cellHeight,
    score: SCORE,
});
const allEnemies = [];
for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy({
        x: CANVAS.width - 6 * CANVAS.cellWidth,
        y: CANVAS.height - (4.5 + i) * CANVAS.cellHeight,
        speed: Math.floor(Math.random() * (100 - 40)) + 40,
        boardWidth: CANVAS.width,
        player: player,
        width: CANVAS.cellWidth,
        height: CANVAS.cellHeight,
        resetEnemiesSpeed: RESET_ENEMIES_SPEED,
    }));
};
console.log(allEnemies)
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


