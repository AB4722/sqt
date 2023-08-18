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

/**
 * Update the lines cleared and score based on the number of lines cleared.
 * @function
 * @memberof Score
 * @param {number} linesCleared The number of lines cleared in a single move.
 * @param {Score.Score} score The current score object.
 * @returns {Score.Score} The updated score object.
 */
 Score.cleared_lines = function (linesCleared, score, softDropCount, hardDropCount) {
    let additionalScore = 0;

    switch (linesCleared) {
        case 1:
            additionalScore = 100;
            break;
        case 2:
            additionalScore = 300;
            break;
        case 3:
            additionalScore = 500;
            break;
        case 4:
            additionalScore = 800;
            break;
    }

    additionalScore += softDropCount;

    additionalScore += hardDropCount;

    if (score.last_cleared_lines === 4) {
        additionalScore = additionalScore * 1.5;
    }

    const updatedScore = score.score + additionalScore;
    const updatedLinesCleared = score.lines_cleared + linesCleared;

    return {
        score: updatedScore,
        lines_cleared: updatedLinesCleared,
        last_cleared_lines: linesCleared
    };
};






export default Object.freeze(Score);

