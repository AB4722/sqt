import R from "./ramda.js";
import Tetris from "./Tetris.js";
import Score from "./Score.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;

let game = Tetris.new_game();

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);

const grid = document.getElementById("grid");

const cells = R.range(0, grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";

    const rows = R.range(0, grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});

const update_grid = function () {

    // First display the grid of locked in blocks
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
        });
    });

    // Display ghost tetromino
    const ghost_game = R.reduce(Tetris.soft_drop, game, R.range(0, 22));
    Tetris.tetromino_coordiates(
        ghost_game.current_tetromino,
        ghost_game.position
    ).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell ghost ${ghost_game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );

    // Display currently dropping tetromino
    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell current ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );

    // Add code below to display the score information.
    const currentScoreElement = document.getElementById("current-score");
    const linesClearedElement = document.getElementById("lines-cleared");
    const currentLevelElement = document.getElementById("current-level");

    const currentScore = game.score.score;
    const linesCleared = game.score.lines_cleared;
    const currentLevel = Score.level(game.score);

    currentScoreElement.textContent = currentScore;
    linesClearedElement.textContent = linesCleared;
    currentLevelElement.textContent = currentLevel;

};

// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};

let softDropCount = 0;
function incrementSoftDropCount() {
    softDropCount += 1;
    game.score.score += 1;
    console.log(`Soft Drop Count: ${softDropCount}`);
}

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        // game.score.softDropCount += 1; //this probs wont work
        incrementSoftDropCount(game);
        game = Tetris.soft_drop(game);
        //lets make it run a function in score that adds 1 every time its pressed
        //score = Tetris.soft()
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
        //lets make it run a function in score that adds 2 for every level when pressed
        //score = Tetris.hard_drop_scoring()
    }
    update_grid(); 
};

const timer_function = function () {

    const currentLevel = Score.level(game.score);

    const timeInterval = 2500 / (currentLevel + 4);

    game = Tetris.next_turn(game);
    update_grid();

    setTimeout(timer_function, timeInterval);
    //console.log(timeInterval)
};


// This first timeout starts the game. it's only called once.
// From here on the timer_function above is called.
setTimeout(timer_function, 500);

update_grid();

