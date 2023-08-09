/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * Currently it is implemented as a single number,
 * but could include other information such as the number of lines cleared.
 * @typedef {number} Score
 * @memberof Score
 */

/**
 * Returns a game state for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game.
 */
Score.new_score = function () {
    return {
        score: 0,
        lines_cleared: 0
    };
};
/**
 * Calculates the current level based on the number of lines cleared.
 * The level increases by 1 for every 10 lines cleared.
 *
 * @function
 * @memberof Score
 * @param {Score.Score} score - The Score object containing information about the game score.
 * @returns {number} The current level calculated based on lines cleared.
 * @example
 * // Assuming scoreObj has { score: 200, lines_cleared: 23 }
 * const currentLevel = Score.level(scoreObj); // Returns 3
 */
Score.level = function (score) {
    const linesCleared = score.lines_cleared;
    return Math.floor(linesCleared / 10) + 1;
};

export default Object.freeze(Score);

