/*jslint browser: true, indent: 3 */

// CS 3312, spring 2017
// Final Project: Sudoku Puzzles
// YOUR NAME(S): Anna Porter and Michael McCarver


// ASK ABOUT INNERHTML
// ASK ABOUT BYID AND BYCLASS
// neat and maybe to check in css find old version
/*

   Solver
   selected button does not switch to gray after 9 spaces are filled
 */
document.addEventListener('DOMContentLoaded', function () {
   'use strict';
   var easy0, easy1, easy2, medium0, medium1, medium2, hard0, hard1, hard2, fiendish0, fiendish1, fiendish2, nightmare0, nightmare1, nightmare2, userPuzzle0, userPuzzle1, puzzles, h2, seconds, minutes, hours, timer, add, t, selectedNum, resetUserError;

   // Hard code 15 default puzzles
   easy0 = [[7, 9, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 6, 9, 0, 0],
            [8, 0, 0, 0, 3, 0, 0, 7, 6],
            [0, 0, 0, 0, 0, 5, 0, 0, 2],
            [0, 0, 5, 4, 1, 8, 7, 0, 0],
            [4, 0, 0, 7, 0, 0, 0, 0, 0],
            [6, 1, 0, 0, 9, 0, 0, 0, 8],
            [0, 0, 2, 3, 0, 0, 0, 0, 0],
            [0, 0, 9, 0, 0, 0, 0, 5, 4]];
            //https://www.sudoku.ws/1-1.png
   easy1 = [[0, 0, 3, 0, 4, 2, 0, 9, 0],
            [0, 9, 0, 0, 6, 0, 5, 0, 0],
            [5, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 7, 0, 0, 2, 8, 5],
            [0, 0, 8, 0, 0, 0, 1, 0, 0],
            [3, 2, 9, 0, 0, 8, 7, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 5, 0, 9, 0, 0, 2, 0],
            [0, 8, 0, 2, 1, 0, 6, 0, 0]];
            //https://www.sudoku.ws/1-11.png
   easy2 = [[0, 0, 0, 0, 9, 0, 0, 0, 4],
            [4, 1, 0, 0, 0, 3, 0, 0, 0],
            [8, 0, 7, 6, 0, 4, 2, 1, 0],
            [0, 0, 1, 0, 0, 7, 0, 0, 2],
            [0, 6, 0, 0, 4, 0, 0, 9, 0],
            [2, 0, 0, 5, 0, 0, 7, 0, 0],
            [0, 4, 8, 3, 0, 6, 9, 0, 7],
            [0, 0, 0, 4, 0, 0, 0, 2, 1],
            [6, 0, 0, 0, 1, 0, 0, 0, 0]];
            //https://www.sudoku.ws/1-6.png
   medium0 = [[0, 0, 5, 0, 9, 0, 0, 0, 1],
              [0, 0, 0, 0, 0, 2, 0, 7, 3],
              [7, 6, 0, 0, 0, 8, 2, 0, 0],
              [0, 1, 2, 0, 0, 9, 0, 0, 4],
              [0, 0, 0, 2, 0, 3, 0, 0, 0],
              [3, 0, 0, 1, 0, 0, 9, 6, 0],
              [0, 0, 1, 9, 0, 0, 0, 5, 8],
              [9, 7, 0, 5, 0, 0, 0, 0, 0],
              [5, 0, 0, 0, 3, 0, 7, 0, 0]];
              //https://www.sudoku.ws/standard-1.htm
   medium1 = [[0, 6, 0, 0, 0, 3, 2, 0, 0],
              [0, 1, 0, 9, 0, 0, 6, 0, 4],
              [0, 0, 0, 0, 8, 0, 0, 0, 5],
              [0, 0, 0, 8, 0, 0, 7, 4, 0],
              [9, 0, 0, 3, 0, 2, 0, 0, 6],
              [0, 7, 3, 0, 0, 4, 0, 0, 0],
              [3, 0, 0, 0, 5, 0, 0, 0, 0],
              [2, 0, 7, 0, 0, 9, 0, 6, 0],
              [0, 0, 6, 7, 0, 0, 0, 9, 0]];
               //https://www.sudoku.ws/standard-2.htm
   medium2 = [[1, 0, 8, 0, 0, 5, 0, 0, 6],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [5, 0, 3, 8, 2, 0, 7, 0, 0],
              [2, 0, 0, 1, 5, 0, 9, 0, 8],
              [0, 0, 0, 0, 8, 0, 0, 0, 0],
              [8, 0, 9, 0, 4, 2, 0, 0, 5],
              [0, 0, 5, 0, 9, 8, 2, 0, 4],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [9, 0, 0, 2, 0, 0, 6, 0, 1]];
              //https://www.sudoku.ws/standard-3.htm
   hard0 = [[0, 0, 0, 2, 0, 0, 0, 6, 3],
            [3, 0, 0, 0, 0, 5, 4, 0, 1],
            [0, 0, 1, 0, 0, 3, 9, 8, 0],
            [0, 0, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 5, 3, 8, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 6, 3, 0, 0, 5, 0, 0],
            [5, 0, 3, 7, 0, 0, 0, 0, 8],
            [4, 7, 0, 0, 0, 1, 0, 0, 0]];
            //https://www.sudoku.ws/hard-1.htm
   hard1 = [[0, 1, 0, 0, 0, 4, 0, 0, 0],
            [0, 0, 6, 8, 0, 5, 0, 0, 1],
            [5, 0, 3, 7, 0, 1, 9, 0, 0],
            [8, 0, 4, 0, 0, 7, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 0, 0, 6, 0, 9],
            [0, 0, 1, 5, 0, 8, 2, 0, 4],
            [6, 0, 0, 4, 0, 3, 1, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 5, 0]];
            //https://www.sudoku.ws/hard-2.htm
   hard2 = [[1, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 5, 0, 0, 3, 0],
            [0, 0, 9, 0, 0, 2, 0, 8, 0],
            [5, 0, 0, 3, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 6, 0, 0, 0],
            [0, 1, 0, 0, 0, 5, 0, 0, 7],
            [0, 9, 0, 4, 0, 0, 3, 0, 0],
            [0, 8, 0, 0, 2, 0, 5, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 6, 4]];
            //https://www.sudoku.ws/hard-3.htm
   fiendish0 = [[0, 0, 6, 0, 0, 0, 0, 0, 4],
                [0, 0, 0, 8, 6, 0, 7, 3, 0],
                [0, 4, 0, 3, 5, 0, 0, 0, 2],
                [1, 7, 0, 4, 0, 0, 6, 0, 0],
                [0, 9, 0, 0, 0, 0, 0, 8, 0],
                [0, 0, 8, 0, 0, 6, 0, 1, 7],
                [2, 0, 0, 0, 8, 1, 0, 4, 0],
                [0, 6, 7, 0, 4, 3, 0, 0, 0],
                [8, 0, 0, 0, 0, 0, 3, 0, 0]];
                //https://www.sudoku.ws/expert-1.htm
   fiendish1 = [[7, 0, 9, 0, 0, 0, 0, 0, 8],
                [0, 0, 0, 1, 9, 0, 0, 0, 2],
                [0, 2, 0, 8, 0, 0, 0, 9, 0],
                [0, 7, 0, 0, 0, 0, 0, 4, 3],
                [2, 0, 4, 0, 0, 0, 5, 0, 9],
                [9, 8, 0, 0, 0, 0, 0, 7, 0],
                [0, 3, 0, 0, 0, 5, 0, 6, 0],
                [8, 0, 0, 0, 2, 3, 0, 0, 0],
                [5, 0, 0, 0, 0, 0, 3, 0, 7]];
                //https://www.sudoku.ws/expert-2.htm
   fiendish2 = [[3, 7, 0, 4, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 7, 6, 4, 3, 0],
                [0, 0, 0, 0, 8, 2, 0, 0, 0],
                [0, 0, 8, 0, 5, 4, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 7, 0, 0],
                [0, 0, 0, 9, 2, 0, 6, 0, 0],
                [0, 0, 0, 2, 6, 0, 0, 0, 0],
                [0, 6, 9, 7, 4, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 9, 0, 6, 8]];
                //https://www.sudoku.ws/expert-3.htm
   nightmare0 = [[0, 0, 9, 7, 4, 8, 0, 0, 0],
                 [7, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 2, 0, 1, 0, 9, 0, 0, 0],
                 [0, 0, 7, 0, 0, 0, 2, 4, 0],
                 [0, 6, 4, 0, 1, 0, 5, 9, 0],
                 [0, 9, 8, 0, 0, 0, 3, 0, 0],
                 [0, 0, 0, 8, 0, 3, 0, 2, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 6],
                 [0, 0, 0, 2, 7, 5, 9, 0, 0]];
                 //https://www.sudoku.ws/extreme-1.htm
   nightmare1 = [[0, 0, 0, 3, 0, 8, 0, 7, 0],
                 [3, 0, 0, 7, 1, 0, 0, 0, 4],
                 [6, 0, 0, 0, 4, 0, 0, 0, 0],
                 [1, 0, 0, 0, 0, 0, 6, 3, 0],
                 [2, 0, 6, 0, 0, 0, 5, 0, 8],
                 [0, 5, 3, 0, 0, 0, 0, 0, 7],
                 [0, 0, 0, 0, 8, 0, 0, 0, 1],
                 [7, 0, 0, 0, 6, 4, 0, 0, 5],
                 [0, 1, 0, 2, 0, 7, 0, 0, 0]];
                    //https://www.sudoku.ws/extreme-2.htm
   nightmare2 = [[2, 0, 0, 0, 1, 0, 0, 5, 0],
                 [3, 0, 5, 0, 4, 2, 0, 0, 0],
                 [0, 1, 8, 0, 0, 9, 0, 0, 2],
                 [0, 3, 2, 1, 0, 0, 8, 0, 0],
                 [0, 0, 1, 0, 2, 0, 3, 0, 0],
                 [0, 0, 9, 0, 0, 3, 2, 6, 0],
                 [1, 0, 0, 7, 0, 0, 9, 8, 0],
                 [0, 0, 0, 2, 6, 0, 5, 0, 7],
                 [0, 6, 0, 0, 8, 0, 0, 0, 3]];
                 //https://www.sudoku.ws/extreme-3.html
   userPuzzle0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]];
   userPuzzle1 = [[7, 9, 0, 0, 0, 0, 3, 0, 0],
                  [0, 0, 0, 0, 0, 6, 9, 0, 0],
                  [8, 0, 0, 0, 3, 0, 0, 7, 6],
                  [0, 0, 0, 0, 0, 5, 0, 0, 2],
                  [0, 0, 5, 4, 1, 8, 7, 0, 0],
                  [4, 0, 0, 7, 0, 0, 0, 0, 0],
                  [6, 1, 0, 0, 9, 0, 0, 0, 8],
                  [0, 0, 2, 3, 0, 0, 0, 0, 0],
                  [0, 0, 9, 0, 0, 0, 0, 5, 4]];

   puzzles = {easy0: easy0, easy1: easy1, easy2: easy2, medium0: medium0, medium1: medium1, medium2: medium2, hard0: hard0, hard1: hard1, hard2: hard2, fiendish0: fiendish0, fiendish1: fiendish1, fiendish2: fiendish2, nightmare0: nightmare0, nightmare1: nightmare1, nightmare2: nightmare2, userPuzzle0: userPuzzle0, userPuzzle1: userPuzzle1};
   (function () {
      // The timer won't run when I put its variables in here
      // For the entire timer, Anna used https://jsfiddle.net/Daniel_Hug/pvk6p/
      // Get the timer span and initialize minutes, seconds and hours to 0
      h2 = document.querySelector('.timer');
      seconds = 0;
      minutes = 0;
      hours = 0;
      // make a timer function that sets t to calls add every 1000 milliseconds 
      // and return t
      timer = function () {
         t = setTimeout(add, 1000);
         return t;
      };
      add = function () {
         var timeString;
         // increment seconds
         seconds += 1;
         // if seconds is greater than or equal to sixty
         if (seconds >= 60) {
            // reset seconds to zero and add a minute
            seconds = 0;
            minutes += 1;
            // if minutes is greater than sixty
            if (minutes >= 60) {
               // reset minutes to zero and add an hour.
               minutes = 0;
               hours += 1;
            }
         }
         // initialize timestring
         timeString = "";
         // if hours is greater than 9, no problem, add it to the string
         // followed by :
         if (hours > 9) {
            timeString += hours + ':';
         } else {
            // otherwise, we need a leading zero
            timeString += '0' + hours + ':';
         }
         // similarly for everything else
         if (minutes > 9) {
            timeString += minutes + ':';
         } else {
            timeString += '0' + minutes + ':';
         }
         if (seconds > 9) {
            timeString += seconds;
         } else {
            timeString += '0' + seconds;
         }
         // set the textContent of the span to the new timeString
         h2.textContent = timeString;
         // and call timer.
         timer();
      };
   }());

   // Displaying the puzzle, adding event listeners to empty spaces.
   (function () {
      var sudokuValues, addEventListeners, updateValues, validateAsYouGo, validateAlways, userInput, checkForGrayButtons, removeSelected, wrongCells, displayPuzzle, deleteUserInputs, deleteUserErrors, removeFinishedInputs, currentPuzzle;

      // Default the selectedNum to be placed in the cells next to one.
      selectedNum = 1;

      // Initialize some arrays
      sudokuValues = [];
      userInput = [];
      wrongCells = [];

      // By default, do not validate as you input numbers
      validateAsYouGo = false;

      // Add an event listener to every difficulty button
      Array.prototype.forEach.call(document.querySelectorAll('.dropdown'), function (buttonElement) {

         // When the button is clicked, show the buttons underneath it
         buttonElement.addEventListener('click', function () {
            buttonElement.querySelector('#my-dropdown').classList.toggle('show');
            // Add event listener to the drop-down buttons
            Array.prototype.forEach.call(buttonElement.querySelectorAll('.puzzle-select'), function (puzzleElement, whichPuzzle) {
               // when the buttons in the drop down are clicked
               puzzleElement.addEventListener('click', function () {
                  // set the current puzzle to the one selected and display it.
                  currentPuzzle = [puzzleElement, whichPuzzle];
                  displayPuzzle(puzzleElement, whichPuzzle);
               });
            });
         }, false);
      });

      displayPuzzle = function (puzzleElement, whichPuzzle) {
         // Try to make a puzzle appear
         var name, display, array, puzzlePlace, insidePuzzlePlace, i, j, k;
         // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
         // The name is the parent's parent's id, converted to a string with the number of whichPuzzle
         name = puzzleElement.parentNode.parentNode.id.toString() + whichPuzzle;

         // MCCARVER COMMENT THIS LINE
         display = puzzleElement.parentNode.parentNode.id.toString() + ' ' + (whichPuzzle + 1);
         // the text content of the whichpuzzle span is the display.
         document.querySelector('#which-puzzle').textContent = display;

         // The array is stored as a property of puzzles
         array = puzzles[name];

         // Get the current puzzle element.
         puzzlePlace = document.querySelector('#currentPuzzle');

         // If anything exists here, delete it.
         while (puzzlePlace.hasChildNodes()) {
            puzzlePlace.removeChild(puzzlePlace.firstChild);
         }

         sudokuValues = []; // reset the values

         // For every cell,
         for (i = 0; i < 9; i += 1) {
            // Insert a div with id row and class happy, because this was before
            // our souls were crushed
            puzzlePlace.insertAdjacentHTML('beforeend', '<div id="row' + i + '" class="happy">');

            for (j = 0; j < 9; j += 1) {
               // select rowi
               insidePuzzlePlace = puzzlePlace.querySelector('#row' + i);

               // If the array has a value here,
               if (array[i][j] !== 0) {
                  // Insert that value inside of the div.
                  insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div>' + array[i][j] + '</div>');

                  // push this value onto the array for future use,
                  sudokuValues.push(array[i][j]);

                  // Push false onto the userInput array to signify this cell as a value of the original puzzle
                  userInput.push(false);

               } else {
                  // k is the raw index number. something from 0 to 80
                  k = i * 9 + j;

                  // create an empty space, and give it the id of its index.
                  insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div class="empty-space" id = ' + k + '>&nbsp</div>');

                  // push 0 onto the values to represent an empty cell.
                  sudokuValues.push(0);

                  // push true, to signify this cell can be edited.
                  userInput.push(true);
               }
            }
            // close off the row div.
            puzzlePlace.insertAdjacentHTML('beforeend', '</div>');
         }
         // Add event listeners to every empty cell.
         addEventListeners();

         // Timer stuff
         clearTimeout(t);

         h2.textContent = '00:00:00';

         seconds = 0;

         minutes = 0;

         hours = 0;

         t = timer();
      };

      addEventListeners = function () {
         // get every empty div and for each of them, add a click event listener
         var emptyCells = document.querySelectorAll('div.empty-space');

         emptyCells.forEach(function (emptyCellElement, whichBlank) {
            emptyCellElement.addEventListener('click', function () {
               // once clicked, the cell should contain the selected number
               emptyCellElement.textContent = selectedNum;

               // It is no longer an empty space, but a space where the user has inputted.
               if (emptyCellElement.classList.contains('empty-space')) {
                  emptyCellElement.classList.remove('empty-space');

                  emptyCellElement.classList.add('user-input');
               }

               // Update the values of the array
               updateValues(whichBlank, emptyCellElement);

               // And check to see if any numbers have reached their maximum occurances.
               checkForGrayButtons();
            }, false);
         });
      };

      // Initialize board?
      displayPuzzle(document.querySelector('#easy-1'), 0);

      updateValues = function (whichBlank, emptyCellElement) {
         var index, whichBlankCopy;

         whichBlankCopy = whichBlank;

         index = 0;

         sudokuValues.forEach(function () {
            if (whichBlankCopy >= 0) {
               if (sudokuValues[index] > 0 && !userInput[index]) {

                  index += 1;

               } else {
                  index += 1;

                  whichBlankCopy -= 1;
               }
            }
         });

         index -= 1;

         sudokuValues[index] = selectedNum;

         validateAlways(index, emptyCellElement);
      };

      validateAlways = function (index, emptyCellElement) {
         var row, column, i, j, k, lowerI, upperI, lowerJ, upperJ, errorFound;

         errorFound = false;

         row = Math.floor(index / 9);

         column = index % 9;

         // checking the rest of the row
         for (i = 9 * row; i < 9 * row + 9; i += 1) {
            if (index !== i) {
               if (selectedNum === sudokuValues[i]) {
                  errorFound = true;

                  if (userInput[i]) {
                     //FIX TO QUERYSELECTOR
                     wrongCells.push(document.getElementById(i));
                  }

                  if (validateAsYouGo) {
                     if (emptyCellElement.classList.contains('user-input')) {
                        emptyCellElement.classList.remove('user-input');

                        emptyCellElement.classList.add('user-error');
                     }
                  }
               }
            }
         }

         // Checking the rest of the column
         for (i = column; i < 81; i += 9) {
            if (index !== i) {
               if (selectedNum === sudokuValues[i]) {

                  errorFound = true;

                  if (validateAsYouGo) {
                     if (emptyCellElement.classList.contains('user-input')) {
                        emptyCellElement.classList.remove('user-input');

                        emptyCellElement.classList.add('user-error');
                     }
                  }
               }
            }
         }

         if (column < 3) {
            lowerI = 0;

            upperI = 3;

         } else if (column >= 3 && column < 6) {
            lowerI = 3;

            upperI = 6;

         } else {
            lowerI = 6;

            upperI = 9;
         }

         if (row < 3) {
            lowerJ = 0;

            upperJ = 3;

         } else if (row >= 3 && row < 6) {
            lowerJ = 3;

            upperJ = 6;

         } else {
            lowerJ = 6;

            upperJ = 9;
         }

         // Checking the 3x3
         for (i = lowerI; i < upperI; i += 1) {
            for (j = lowerJ; j < upperJ; j += 1) {
               k = j * 9 + i;

               if (index !== k) {
                  if (selectedNum === sudokuValues[k]) {
                     errorFound = true;

                     if (validateAsYouGo) {
                        if (emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');

                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }

         if (errorFound && !validateAsYouGo) {
            wrongCells.push(emptyCellElement);
         }

         if (!errorFound && emptyCellElement.classList.contains('user-error')) {
            emptyCellElement.classList.remove('user-error');

            emptyCellElement.classList.add('user-input');

            for (i = 0; i < wrongCells.length; i += 1) {
               if (emptyCellElement.isEqualNode(wrongCells[i])) {
                  wrongCells.splice(i, 1);
               }
            }
         }
      };

      checkForGrayButtons = function () {
         var numCount;
         numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];

         sudokuValues.forEach(function (sudokuElement) {
            if (sudokuElement > 0) {
               numCount[sudokuElement - 1] += 1;
            }
         });

         //alert(numCount);
         Array.prototype.forEach.call(document.querySelectorAll('.input'), function (selectorElement) {
            var i, tmp;
            for (i = 0; i < 9; i += 1) {
               if (numCount[i] >= 9) {
                  tmp = i + 1;
                  if (selectorElement.id === tmp + 'b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     }

                     selectorElement.classList.add('finished-input');
                  }
               }
            }
         }, false);

         Array.prototype.forEach.call(document.querySelectorAll('.selected'), function (selectorElement) {
            var i, tmp;
            for (i = 0; i < 9; i += 1) {
               if (numCount[i] >= 9) {
                  tmp = i + 1;

                  if (selectorElement.id === tmp + 'b') {
                     if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }

                     selectorElement.classList.add('finished-input');
                  }
               }
            }
         }, false);

         Array.prototype.forEach.call(document.querySelectorAll('.finished-input'), function (selectorElement) {
            var i, tmp;

            for (i = 0; i < 9; i += 1) {
               if (numCount[i] < 9) {
                  tmp = i + 1;

                  if (selectorElement.id === tmp + 'b') {
                     if (selectorElement.classList.contains('finished-input')) {
                        //alert('a');
                        selectorElement.classList.remove('finished-input');
                     }

                     selectorElement.classList.add('input');
                  }
               }
            }
         });
      };

      document.querySelector('#clear').addEventListener('click', function () {
         var userInputs, userErrors, oneButton, finishedInputs;

         displayPuzzle(currentPuzzle[0], currentPuzzle[1]);

         userInputs = Array.from(document.getElementsByClassName('user-input'));

         while (userInputs.length > 0) {
            deleteUserInputs();
            userInputs = Array.from(document.getElementsByClassName('user-input'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();

            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();

            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();

            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();

            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));

         while (userErrors.length > 0) {
            deleteUserErrors();

            userErrors = Array.from(document.getElementsByClassName('user-error'));
         }

         removeSelected();

         finishedInputs = Array.from(document.getElementsByClassName('finished-input'));

         while (finishedInputs.length > 0) {
            removeFinishedInputs();

            finishedInputs = Array.from(document.getElementsByClassName('finished-input'));
         }
         selectedNum = 1;
         oneButton = document.getElementsByClassName('input')[0];
         oneButton.classList.remove('input');
         oneButton.classList.add('selected');
         checkForGrayButtons();
         removeFinishedInputs();
         clearTimeout(t);
         h2.textContent = '00:00:00';
         seconds = 0;
         minutes = 0;
         hours = 0;
         t = timer();
      });

      removeFinishedInputs = function () {
         Array.prototype.forEach.call(document.getElementsByClassName('finished-input'), function (element) {
            if (element.classList.contains('finished-input')) {
               element.classList.remove('finished-input');

               element.classList.add('input');
            }
         });
      };

      deleteUserInputs = function () {
         Array.prototype.forEach.call(document.getElementsByClassName('user-input'), function (element) {
            element.classList.remove('user-input');

            element.classList.add('empty-space');

            element.innerHTML = '&nbsp;';
         });
      };

      deleteUserErrors = function () {
         Array.prototype.forEach.call(document.getElementsByClassName('user-error'), function (element) {
            element.classList.remove('user-error');

            element.classList.add('empty-space');

            element.innerHTML = '&nbsp';
         });
      };

      document.querySelector('#validate-always').addEventListener('click', function () {
         var element;
         element = document.querySelector('#validate-always');
         if (validateAsYouGo === false) {
            element.classList.remove('utility');
            element.classList.add('utility-toggle');
            validateAsYouGo = true;
            wrongCells.forEach(function (element) {
               if (element.classList.contains('user-input')) {
                  element.classList.remove('user-input');
                  element.classList.add('user-error');
               }
            });
         } else {
            element.classList.remove('utility-toggle');
            element.classList.add('utility');
            validateAsYouGo = false;
            resetUserError();
         }
      });

      resetUserError = function () {
         document.querySelectorAll('.user-error').forEach(function (element) {
            element.classList.remove('user-error');

            element.classList.add('user-input');
         });
      };

      document.querySelector('#validate-once').addEventListener('click', function () {
         wrongCells.forEach(function (element) {
            if (element.classList.contains('user-input')) {
               element.classList.remove('user-input');

               element.classList.add('user-error');
            }
         });
      });

      Array.prototype.forEach.call(document.querySelectorAll('.input'), function (selectorElement, whichButton) {
         selectorElement.addEventListener('click', function () {
            removeSelected();

            selectedNum = whichButton + 1;

            if (selectorElement.classList.contains('input')) {
               selectorElement.classList.remove('input');

               selectorElement.classList.add('selected');
            }
         }, false);
      });

      (function () {
         var oneButton;
         //alert('selected')
         selectedNum = 1;

         oneButton = document.querySelector('.input');

         oneButton.classList.remove('input');

         oneButton.classList.add('selected');
      }());

      removeSelected = function () {
         Array.prototype.forEach.call(document.querySelectorAll('.selected'), function (selectorElem) {
            selectorElem.classList.remove('selected');

            selectorElem.classList.add('input');
         });
      };
   }());

   (function () {
      document.querySelector('#solve').addEventListener('click', function () {
         var kids, parents, solverValues, rows, i, solveSudoku, checkRow, checkCol, check3x3, findEmptySpace, isCellSafe, displaySolution, testing, totalKids, rose;

         solverValues = [];

         rows = [];

         i = 0;

         testing = 0;

         totalKids = 0;

         parents = document.querySelectorAll('div.happy');
         //https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
         parents.forEach(function (parentNode) {
            kids = parentNode.children;

            kids = Array.from(kids);

            totalKids += kids.length;

            kids.forEach(function (childNode) {
               if (childNode.textContent === '1' || childNode.textContent === '2' || childNode.textContent === '3' || childNode.textContent === '4' || childNode.textContent === '5' || childNode.textContent === '6' || childNode.textContent === '7' || childNode.textContent === '8' || childNode.textContent === '9') {
                  rows.push(childNode.textContent);

                  i += 1;

                  testing += 1;

               } else {
                  rows.push('0');

                  i += 1;

                  testing += 1;
               }
            });
         });

         for (i = 0; i < 9; i += 1) {
            rose = rows.slice(i * 9, (i + 1) * 9);

            solverValues.push(rose);
         }
      });
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
      window.addEventListener('click', function (event) {
         Array.prototype.forEach.call(document.querySelectorAll('.dropdown-content'), function (dropdownElement) {
            if (dropdownElement.parentNode.id !== event.target.parentNode.id) {
               if (dropdownElement.classList.contains('show')) {
                  dropdownElement.classList.remove('show');
               }
            }
         });
      });
   }());
}, false);
