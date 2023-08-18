import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";

const example_game = Tetris.new_game();
const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe("Score", function () {
    it(
        `A new tetris game
        * Starts on level one
        * With no lines cleared
        * With a score of zero`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it(
        `The score tracks the lines that get cleared`,
        function () {
            let game = example_game;
            // Slot an I tetromino into the hole and drop.
            game.current_tetromino = Tetris.I_tetromino;
            game = Tetris.rotate_ccw(game);
            game = Tetris.hard_drop(game);

            if (game.score.lines_cleared !== 4) {
                throw new Error("Expecting 4 lines to clear");
            }
        }
    );

    it(
        `A single line clear scores 100 × level`,
        function () {
            let game = example_game;
            // Slot a T tetromino into the hole and drop.
            // This can only go one deep.
            game.current_tetromino = Tetris.Z_tetromino;

            // I could use hard_drop here, but that would also score.
            // Instead wait for it to drop 22 times.
            R.range(0, 22).forEach(function () {
                game = Tetris.next_turn(game);
            });

            if (game.score.score !== 100) {
                throw new Error("A single row cleared should score 100");
            }
        }
    );

    it(
        `A double line clear scores 300 × level`,
        function () {
            let game = example_game;
            // Slot one of those L tetrominos in we have to rotate it vertical maybe? but the point of the L can be pointing either way.
            // This will go 2 deep unlike the above and get two Tetris
            game.current_tetromino = Tetris.L_tetromino
            R.range(0,23).forEach(function () { //Making it drop 23 times as it has to go one lower than the other one
                game.Tetris.next_turn(game);
            });

            if(game.score.score !==300) {
                throw new Error("A double row cleared on Level 1 should score 300");
            }
        }
    );

    it(
        `A triple line clear scores 500 × level`,
        function () {
            let game = example_game
            //I reckon easiest way to do this is to put the L shaped one when the point is to the left followed by a horizontal long one
            game.current_tetromino = Tetris.I_tetromino//this needs to go 3 to the right and has to go first otherwise we are just going to get 2 straight away
            
            R.range(0,3).forEach(function () { //Making it go right 3 times
                game = Tetris.right(game);
            });

            R.range(0,21).forEach(function () { //Making it drop 21 times so it gets there
                game.Tetris.next_turn(game);
            });

            game.current_tetromino = Tetris.L_tetromino //is this gonna mess with the game.current on line 110?
            R.range(0,23).forEach(function () { //Making it drop 23 times
                game.Tetris.next_turn(game);
            });
    
            if(game.score.score !==300) {
                throw new Error("A triple row cleared on Level 1 should score 500");
            }

        }
    );

    it(
        `A tetris scores 800 × level`,
        function () {
            //just realised i can set up a board...
            let game = Tetris.new_game();
            let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-`; //now we can just slot an I in easy peasy
            game.current_tetromino = Tetris.I_tetromino
            game = Tetris.rotate_ccw(game)
            R.range(0,5).forEach(function () { //Making it go right 5 times
                game = Tetris.right(game);
            });
            R.range(0,26).forEach(function () { 
                game.Tetris.next_turn(game);
            }); //let it drop allllll the way

            if(game.score.score !==800) {
                throw new Error("A Tetris should score 800");
            }
        }
    );

    it(
        `Back to back tetrises score 1200 × level`,
        function () {
            // Lets just do the above twice...
            let game = Tetris.new_game();
            let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-`; //now we can just slot an I in easy peasy
            game.current_tetromino = Tetris.I_tetromino
            game = Tetris.rotate_ccw(game)
            R.range(0,5).forEach(function () { //Making it go right 5 times
                game = Tetris.right(game);
            });
            R.range(0,26).forEach(function () { 
                game.Tetris.next_turn(game);
            }); //let it drop allllll the way

            //now again
            game.current_tetromino = Tetris.I_tetromino
            game = Tetris.rotate_ccw(game)
            R.range(0,5).forEach(function () { //Making it go right 5 times
                game = Tetris.right(game);
            });
            R.range(0,26).forEach(function () { 
                game.Tetris.next_turn(game);
            }); //let it drop allllll the way

            if(game.score.score !==1200) {
                throw new Error("Back to back Tetris should score 1200");
            }
        }
    );

    it(
        `A soft drop score 1 point per cell descended`,
        function () {
            // Lets just create a board then do one soft drop and check the score has changed by 1 after
            let game = example_game //use any board 
            let game.score.score = '0' //lets make sure score starts at 0
            game.current_tetromino = Tetris.I_tetromino //random tetromino
            game = Tetris.soft_drop(game); //do 1 soft drop which should be 1 point
            game.Tetris.next_turn(game); //go to next turn
            if(game.score.score !== 1) { //if the score isnt 1 
                throw new Error("Score should be 1 point");
            }
        }
    );

    it(
        `A hard drop score 2 point per cell descended`,
        function () {
            // Lets just create a board then do one hard drop and check the score has changed by 2 per cell
            let game = Tetris.new_game();
            let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-
OOOOOOOOI-`; //hard drop would send it down 13 rows
            game.current_tetromino = Tetris.I_tetromino //random tetromino
            game = Tetris.hard_drop(game); //do 13 rows of hard drop which should be 26 points
            game.Tetris.next_turn(game); //go to next turn
            if(game.score.score !== 26) { //if the score isnt 26 
                throw new Error("Score should be 26 points");
            }
        }
    );

    it(
        `Advancing the turn without manually dropping scores nothing.`,
        function () {
            let game = example_game //doesnt rlly matter what game we setup as long as no immediate Tetris
            const score_before = game.score.score //set the current score to a score_before
            game = Tetris.next_turn(game); //one turn goes by

            if(game.score.score !== score_before) {
                throw new Error("Score should not be affected");
            }
        }
    );
});
