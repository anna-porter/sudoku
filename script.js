/*jslint browser: true, indent: 3 */

// CS 3312, spring 2017
// Final Project: Sudoku Puzzles
// YOUR NAME(S): Anna Porter and Michael McCarver

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
      var sudokuValues, addEventListeners, updateValues, validateAsYouGo, validateAlways, userInput, checkForGrayButtons, removeSelected, wrongCells, displayPuzzle, deleteUserInputs, removeSelectedInputs, displayFinished, deleteUserErrors, removeFinishedInputs, currentPuzzle;

      // Default the selectedNum to be placed in the cells next to one.
      selectedNum = 1;

      // Initialize some arrays
      sudokuValues = [];
      userInput = [];
      wrongCells = [];

      // Set up default values for currentPuzzle so that the clear button will work from the beginning
      currentPuzzle = [document.querySelector('#easy-1'), 0];

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

         // Reset timer stuff
         clearTimeout(t);
         h2.textContent = '00:00:00';
         seconds = 0;
         minutes = 0;
         hours = 0;
         t = timer();
      };

      // Add event listeners for every empty cell.
      addEventListeners = function () {
         // get every empty div and for each of them, add a click event listener
         var emptyCells;
         emptyCells = document.querySelectorAll('div.empty-space');

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
               displayFinished();
            }, false);
         });
      };

      // Initialize board to the first easy puzzle
      displayPuzzle(document.querySelector('#easy-1'), 0);

      // Update the values of our stuff.
      updateValues = function (whichBlank, emptyCellElement) {
         var index, whichBlankCopy;

         // Make a copy of whichBlank, because I'm too nervous to change the original
         whichBlankCopy = whichBlank;
         // set the index to zero.
         index = 0;
         // For each sudoku value,
         sudokuValues.forEach(function () {
            // If we still ahve blanks,
            if (whichBlankCopy >= 0) {
               // And the value of our index is positive, and not a user input
               if (sudokuValues[index] > 0 && !userInput[index]) {
                  // increment index.
                  index += 1;
               } else {
                  // increment index and decrement whichblank.
                  index += 1;
                  whichBlankCopy -= 1;
               }
            }
         });
         // decrement index, not sure why we have to do this, but it works
         // so don't dwell on it.
         index -= 1;
         // at that index, make it the selected num.
         sudokuValues[index] = selectedNum;
         // call Validatealways.
         validateAlways(index, emptyCellElement);
      };

      validateAlways = function (index, emptyCellElement) {
         var row, column, i, j, k, lowerI, upperI, lowerJ, upperJ, errorFound;

         errorFound = false;

         row = Math.floor(index / 9);

         column = index % 9;

         // checking the rest of the row
         for (i = 9 * row; i < 9 * row + 9; i += 1) {
            // Make sure its not comparing against itself
            if (index !== i) {
               // If our number matches, we have an error
               if (selectedNum === sudokuValues[i]) {
                  errorFound = true;
                  // If it was user input,
                  if (userInput[i]) {
                     //FIX TO QUERYSELECTOR
                     var fix;
                     fix = '#' + i;

                     wrongCells.push(document.getElementById(i));
                  }
                  // If we are validating as we go,
                  if (validateAsYouGo) {
                     // change the class to user error.
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
            // dont check urself
            if (index !== i) {
               // if its the same
               if (selectedNum === sudokuValues[i]) {
                  // we found an error
                  errorFound = true;
                  // if we're validating as we go, change it to a user error.
                  if (validateAsYouGo) {
                     if (emptyCellElement.classList.contains('user-input')) {
                        emptyCellElement.classList.remove('user-input');
                        emptyCellElement.classList.add('user-error');
                     }
                  }
               }
            }
         }
         // For checking a 3x3 grid, set the upper and lower bounds of i and j
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
               // Get the index of the cell
               k = j * 9 + i;
               // As long as we aren't checking ourselves
               if (index !== k) {
                  // And the number is the same as our value
                  if (selectedNum === sudokuValues[k]) {
                     // We have an error
                     errorFound = true;
                     // if we're validating as we go, change the class of it.
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

         // If we found an error, but we aren't validating as we go
         if (errorFound && !validateAsYouGo) {
            // push it onto a wrong cells array, to change things to red if we validate once
            wrongCells.push(emptyCellElement);
         }
         // if we didn't find an error, but our cell says it is, fix that.
         if (!errorFound && emptyCellElement.classList.contains('user-error')) {
            emptyCellElement.classList.remove('user-error');
            emptyCellElement.classList.add('user-input');
            // For all the wrong cells,
            for (i = 0; i < wrongCells.length; i += 1) {
               // https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode
               // If the empty cell is the same as the wrong cell, delete it from wrongCells
               if (emptyCellElement.isEqualNode(wrongCells[i])) {
                  wrongCells.splice(i, 1);
               }
            }
         }
      };

      // Checking to see if we have 9 of a number, then making the button gray.
      checkForGrayButtons = function () {
         var numCount;
         numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
         // for each nonzero value, increment the corresponding element of the array.
         sudokuValues.forEach(function (sudokuElement) {
            if (sudokuElement > 0) {
               numCount[sudokuElement - 1] += 1;
            }
         });

         // for each input button,
         Array.prototype.forEach.call(document.querySelectorAll('.input'), function (selectorElement) {
            var i, tmp;
            // check to see if the numCount has gotten too big.
            for (i = 0; i < 9; i += 1) {
               if (numCount[i] >= 9) {
                  // increment tmp,
                  tmp = i + 1;
                  // get the element's id and see if its equal to temp with b on hte end.
                  //https://developer.mozilla.org/en-US/docs/Web/API/Element/id
                  if (selectorElement.id === tmp + 'b') {
                     // Remove the input class, and add the finished input class.
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     }
                     selectorElement.classList.add('finished-input');
                  }
               }
            }
         }, false);

         // To change the selected button from gray to green when 9 of that number happen.
         Array.prototype.forEach.call(document.querySelectorAll('.selected'), function (selectorElement) {
            var i, tmp;
            // go through and see if any have reached 9 or higher.
            for (i = 0; i < 9; i += 1) {
               // similar to the above stuff.
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
         // To change back if the numbers change,
         Array.prototype.forEach.call(document.querySelectorAll('.finished-input'), function (selectorElement) {
            var i, tmp;
            // check to see if the numCount is less than 9
            for (i = 0; i < 9; i += 1) {
               if (numCount[i] < 9) {
                  tmp = i + 1;
                  // if it is, grab the id and throw a b onto it.
                  if (selectorElement.id === tmp + 'b') {
                     // and change its class from finished-input back to input.
                     if (selectorElement.classList.contains('finished-input')) {
                        selectorElement.classList.remove('finished-input');
                     }
                     selectorElement.classList.add('input');
                  }
               }
            }
         });
      };

      // Check if the user has correctly finished the puzzle
      displayFinished = function () {
         var emptyCells, errorCells;
         // get arrays of the empty space and user errors
         emptyCells = document.querySelectorAll('div.empty-space');
         errorCells = document.querySelectorAll('div.user-error');
         // If these are both of length zero, they finished correctly
         if (emptyCells.length === 0 && errorCells.length === 0) {
            alert('Congratulations! You finished the puzzle correctly!');
         }
      };
      // when the cear button is clicked,
      document.querySelector('#clear').addEventListener('click', function () {
         // took out userErrors and finishedInputs
         var oneButton;
         // redisplay the current puzzle.
         displayPuzzle(currentPuzzle[0], currentPuzzle[1]);
         // default the selected number back to 1,
         selectedNum = 1;
         // Remove selected and finished classes from the buttons
         removeFinishedInputs();
         removeSelectedInputs();
         // set oneButton to the first button in the table
         oneButton = document.querySelector('table button');
         // remove the input class and add the selected class
         if (oneButton.classList.contains('input')) {
            oneButton.classList.remove('input');
         }
         oneButton.classList.add('selected');
         // Reset the timer,
         clearTimeout(t);
         h2.textContent = '00:00:00';
         seconds = 0;
         minutes = 0;
         hours = 0;
         t = timer();
      });
      removeSelectedInputs = function () {
         // for every finished input button, remove that and put input
         Array.prototype.forEach.call(document.querySelectorAll('.selected'), function (element) {
            element.classList.remove('selected');
            element.classList.add('input');
         });
      };
      
      removeFinishedInputs = function () {
         // for every finished input button, remove that and put input
         Array.prototype.forEach.call(document.querySelectorAll('.finished-input'), function (element) {
            if (element.classList.contains('finished-input')) {
               element.classList.remove('finished-input');
               element.classList.add('input');
            }
         });
      };

      // when validate alwyas is clicked,
      document.querySelector('#validate-always').addEventListener('click', function () {
         var element;
         // for the validate always element
         element = document.querySelector('#validate-always');
         // If we weren't validating before, we are now, change the color to green
         // and set validateAsYouGo to true.
         if (validateAsYouGo === false) {
            element.classList.remove('utility');
            element.classList.add('utility-toggle');
            validateAsYouGo = true;
            // for every wrong cell, change it to user error from user input.
            wrongCells.forEach(function (element) {
               if (element.classList.contains('user-input')) {
                  element.classList.remove('user-input');
                  element.classList.add('user-error');
               }
            });
         // otherwise, we aren't validating as we go anymore, so change back to blue,
         // and set the boolean to false, and reset all  user errors
         } else {
            element.classList.remove('utility-toggle');
            element.classList.add('utility');
            validateAsYouGo = false;
            resetUserError();
         }
      });

      // take away all the user errors and change them to user inputs,
      resetUserError = function () {
         document.querySelectorAll('.user-error').forEach(function (element) {
            element.classList.remove('user-error');
            element.classList.add('user-input');
         });
      };

      // when validate once is clicked, 
      document.querySelector('#validate-once').addEventListener('click', function () {
         // for all the wrong cells, if they contained user input, change to user error
         wrongCells.forEach(function (element) {
            if (element.classList.contains('user-input')) {
               element.classList.remove('user-input');
               element.classList.add('user-error');
            }
         });
      });

      // for every input button
      Array.prototype.forEach.call(document.querySelectorAll('.input'), function (selectorElement, whichButton) {
         // when its clicked,
         selectorElement.addEventListener('click', function () {
            // remove selected from all other buttons
            removeSelected();
            // the new selected number is one more than which button
            selectedNum = whichButton + 1;
            // change the class from input to selected
            if (selectorElement.classList.contains('input')) {
               selectorElement.classList.remove('input');
               selectorElement.classList.add('selected');
            }
         }, false);
      });
       // IFFE
      (function () {
         // set the default number to 1 and make the button green
         var oneButton;
         selectedNum = 1;
         oneButton = document.querySelector('.input');
         oneButton.classList.remove('input');
         oneButton.classList.add('selected');
      }());

      // removing the selected class from all buttons
      removeSelected = function () {
         // for every selected button
         Array.prototype.forEach.call(document.querySelectorAll('.selected'), function (selectorElem) {
            // switch from selected back to input.
            selectorElem.classList.remove('selected');
            selectorElem.classList.add('input');
         });
      };
   }());

   /*(function () {
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
      */
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
      // when anywhere in the window is clicked, make the dropdowns disappear
      window.addEventListener('click', function (event) {
         Array.prototype.forEach.call(document.querySelectorAll('.dropdown-content'), function (dropdownElement) {
            if (dropdownElement.parentNode.id !== event.target.parentNode.id) {
               if (dropdownElement.classList.contains('show')) {
                  dropdownElement.classList.remove('show');
               }
            }
         });
      });
}, false);
