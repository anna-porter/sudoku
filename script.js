/*jslint browser: true, indent: 3 */

// CS 3312, spring 2017
// Final Project: Sudoku Puzzles
// YOUR NAME(S): Anna Porter and Michael McCarver

/*

   Solver
   selected button does not switch to gray after 9 spaces are filled
 */
document.addEventListener('DOMContentLoaded', function () {
   'use strict';
   var easy1, easy2, easy3, medium1, medium2, medium3, hard1, hard2, hard3, fiendish1, fiendish2, fiendish3, nightmare1, nightmare2, nightmare3, userPuzzle1, userPuzzle2, puzzles, h2, seconds, minutes, hours, timer, add, t, selectedNum, resetUserError;
   // Hard code 15 default puzzles
   easy1 = [[7, 9, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 6, 9, 0, 0],
            [8, 0, 0, 0, 3, 0, 0, 7, 6],
            [0, 0, 0, 0, 0, 5, 0, 0, 2],
            [0, 0, 5, 4, 1, 8, 7, 0, 0],
            [4, 0, 0, 7, 0, 0, 0, 0, 0],
            [6, 1, 0, 0, 9, 0, 0, 0, 8],
            [0, 0, 2, 3, 0, 0, 0, 0, 0],
            [0, 0, 9, 0, 0, 0, 0, 5, 4]];
            //https://www.sudoku.ws/1-1.png
   easy2 = [[0, 0, 3, 0, 4, 2, 0, 9, 0],
            [0, 9, 0, 0, 6, 0, 5, 0, 0],
            [5, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 7, 0, 0, 2, 8, 5],
            [0, 0, 8, 0, 0, 0, 1, 0, 0],
            [3, 2, 9, 0, 0, 8, 7, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 5, 0, 9, 0, 0, 2, 0],
            [0, 8, 0, 2, 1, 0, 6, 0, 0]];
            //https://www.sudoku.ws/1-11.png
   easy3 = [[0, 0, 0, 0, 9, 0, 0, 0, 4],
            [4, 1, 0, 0, 0, 3, 0, 0, 0],
            [8, 0, 7, 6, 0, 4, 2, 1, 0],
            [0, 0, 1, 0, 0, 7, 0, 0, 2],
            [0, 6, 0, 0, 4, 0, 0, 9, 0],
            [2, 0, 0, 5, 0, 0, 7, 0, 0],
            [0, 4, 8, 3, 0, 6, 9, 0, 7],
            [0, 0, 0, 4, 0, 0, 0, 2, 1],
            [6, 0, 0, 0, 1, 0, 0, 0, 0]];
            //https://www.sudoku.ws/1-6.png
   medium1 = [[0, 0, 5, 0, 9, 0, 0, 0, 1],
              [0, 0, 0, 0, 0, 2, 0, 7, 3],
              [7, 6, 0, 0, 0, 8, 2, 0, 0],
              [0, 1, 2, 0, 0, 9, 0, 0, 4],
              [0, 0, 0, 2, 0, 3, 0, 0, 0],
              [3, 0, 0, 1, 0, 0, 9, 6, 0],
              [0, 0, 1, 9, 0, 0, 0, 5, 8],
              [9, 7, 0, 5, 0, 0, 0, 0, 0],
              [5, 0, 0, 0, 3, 0, 7, 0, 0]];
              //https://www.sudoku.ws/standard-1.htm
   medium2 = [[0, 6, 0, 0, 0, 3, 2, 0, 0],
              [0, 1, 0, 9, 0, 0, 6, 0, 4],
              [0, 0, 0, 0, 8, 0, 0, 0, 5],
              [0, 0, 0, 8, 0, 0, 7, 4, 0],
              [9, 0, 0, 3, 0, 2, 0, 0, 6],
              [0, 7, 3, 0, 0, 4, 0, 0, 0],
              [3, 0, 0, 0, 5, 0, 0, 0, 0],
              [2, 0, 7, 0, 0, 9, 0, 6, 0],
              [0, 0, 6, 7, 0, 0, 0, 9, 0]];
               //https://www.sudoku.ws/standard-2.htm
   medium3 = [[1, 0, 8, 0, 0, 5, 0, 0, 6],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [5, 0, 3, 8, 2, 0, 7, 0, 0],
              [2, 0, 0, 1, 5, 0, 9, 0, 8],
              [0, 0, 0, 0, 8, 0, 0, 0, 0],
              [8, 0, 9, 0, 4, 2, 0, 0, 5],
              [0, 0, 5, 0, 9, 8, 2, 0, 4],
              [0, 0, 0, 0, 0, 0, 0, 0, 0],
              [9, 0, 0, 2, 0, 0, 6, 0, 1]];
              //https://www.sudoku.ws/standard-3.htm
   hard1 = [[0, 0, 0, 2, 0, 0, 0, 6, 3],
            [3, 0, 0, 0, 0, 5, 4, 0, 1],
            [0, 0, 1, 0, 0, 3, 9, 8, 0],
            [0, 0, 0, 0, 0, 0, 0, 9, 0],
            [0, 0, 0, 5, 3, 8, 0, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 6, 3, 0, 0, 5, 0, 0],
            [5, 0, 3, 7, 0, 0, 0, 0, 8],
            [4, 7, 0, 0, 0, 1, 0, 0, 0]];
            //https://www.sudoku.ws/hard-1.htm
   hard2 = [[0, 1, 0, 0, 0, 4, 0, 0, 0],
            [0, 0, 6, 8, 0, 5, 0, 0, 1],
            [5, 0, 3, 7, 0, 1, 9, 0, 0],
            [8, 0, 4, 0, 0, 7, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 3, 0, 0, 6, 0, 9],
            [0, 0, 1, 5, 0, 8, 2, 0, 4],
            [6, 0, 0, 4, 0, 3, 1, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 5, 0]];
            //https://www.sudoku.ws/hard-2.htm
   hard3 = [[1, 3, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 5, 0, 0, 3, 0],
            [0, 0, 9, 0, 0, 2, 0, 8, 0],
            [5, 0, 0, 3, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 6, 0, 0, 0],
            [0, 1, 0, 0, 0, 5, 0, 0, 7],
            [0, 9, 0, 4, 0, 0, 3, 0, 0],
            [0, 8, 0, 0, 2, 0, 5, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 6, 4]];
            //https://www.sudoku.ws/hard-3.htm
   fiendish1 = [[0, 0, 6, 0, 0, 0, 0, 0, 4],
                [0, 0, 0, 8, 6, 0, 7, 3, 0],
                [0, 4, 0, 3, 5, 0, 0, 0, 2],
                [1, 7, 0, 4, 0, 0, 6, 0, 0],
                [0, 9, 0, 0, 0, 0, 0, 8, 0],
                [0, 0, 8, 0, 0, 6, 0, 1, 7],
                [2, 0, 0, 0, 8, 1, 0, 4, 0],
                [0, 6, 7, 0, 4, 3, 0, 0, 0],
                [8, 0, 0, 0, 0, 0, 3, 0, 0]];
                //https://www.sudoku.ws/expert-1.htm
   fiendish2 = [[7, 0, 9, 0, 0, 0, 0, 0, 8],
                [0, 0, 0, 1, 9, 0, 0, 0, 2],
                [0, 2, 0, 8, 0, 0, 0, 9, 0],
                [0, 7, 0, 0, 0, 0, 0, 4, 3],
                [2, 0, 4, 0, 0, 0, 5, 0, 9],
                [9, 8, 0, 0, 0, 0, 0, 7, 0],
                [0, 3, 0, 0, 0, 5, 0, 6, 0],
                [8, 0, 0, 0, 2, 3, 0, 0, 0],
                [5, 0, 0, 0, 0, 0, 3, 0, 7]];
                //https://www.sudoku.ws/expert-2.htm
   fiendish3 = [[3, 7, 0, 4, 0, 0, 0, 0, 0],
                [0, 2, 0, 0, 7, 6, 4, 3, 0],
                [0, 0, 0, 0, 8, 2, 0, 0, 0],
                [0, 0, 8, 0, 5, 4, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 7, 0, 0],
                [0, 0, 0, 9, 2, 0, 6, 0, 0],
                [0, 0, 0, 2, 6, 0, 0, 0, 0],
                [0, 6, 9, 7, 4, 0, 0, 2, 0],
                [0, 0, 0, 0, 0, 9, 0, 6, 8]];
                //https://www.sudoku.ws/expert-3.htm
   nightmare1 = [[0, 0, 9, 7, 4, 8, 0, 0, 0],
                 [7, 0, 0, 0, 0, 0, 0, 0, 0],
                 [0, 2, 0, 1, 0, 9, 0, 0, 0],
                 [0, 0, 7, 0, 0, 0, 2, 4, 0],
                 [0, 6, 4, 0, 1, 0, 5, 9, 0],
                 [0, 9, 8, 0, 0, 0, 3, 0, 0],
                 [0, 0, 0, 8, 0, 3, 0, 2, 0],
                 [0, 0, 0, 0, 0, 0, 0, 0, 6],
                 [0, 0, 0, 2, 7, 5, 9, 0, 0]];
                 //https://www.sudoku.ws/extreme-1.htm
   nightmare2 = [[0, 0, 0, 3, 0, 8, 0, 7, 0],
                 [3, 0, 0, 7, 1, 0, 0, 0, 4],
                 [6, 0, 0, 0, 4, 0, 0, 0, 0],
                 [1, 0, 0, 0, 0, 0, 6, 3, 0],
                 [2, 0, 6, 0, 0, 0, 5, 0, 8],
                 [0, 5, 3, 0, 0, 0, 0, 0, 7],
                 [0, 0, 0, 0, 8, 0, 0, 0, 1],
                 [7, 0, 0, 0, 6, 4, 0, 0, 5],
                 [0, 1, 0, 2, 0, 7, 0, 0, 0]];
                    //https://www.sudoku.ws/extreme-2.htm
   nightmare3 = [[2, 0, 0, 0, 1, 0, 0, 5, 0],
                 [3, 0, 5, 0, 4, 2, 0, 0, 0],
                 [0, 1, 8, 0, 0, 9, 0, 0, 2],
                 [0, 3, 2, 1, 0, 0, 8, 0, 0],
                 [0, 0, 1, 0, 2, 0, 3, 0, 0],
                 [0, 0, 9, 0, 0, 3, 2, 6, 0],
                 [1, 0, 0, 7, 0, 0, 9, 8, 0],
                 [0, 0, 0, 2, 6, 0, 5, 0, 7],
                 [0, 6, 0, 0, 8, 0, 0, 0, 3]];
                 //https://www.sudoku.ws/extreme-3.html
   userPuzzle1 = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]];
   userPuzzle2 = [[7, 9, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 6, 9, 0, 0],
            [8, 0, 0, 0, 3, 0, 0, 7, 6],
            [0, 0, 0, 0, 0, 5, 0, 0, 2],
            [0, 0, 5, 4, 1, 8, 7, 0, 0],
            [4, 0, 0, 7, 0, 0, 0, 0, 0],
            [6, 1, 0, 0, 9, 0, 0, 0, 8],
            [0, 0, 2, 3, 0, 0, 0, 0, 0],
            [0, 0, 9, 0, 0, 0, 0, 5, 4]];
   // Timer function.
   (function () {
      // The timer won't run when I put its variables in here
   // For the entire timer, Anna used https://jsfiddle.net/Daniel_Hug/pvk6p/
      h2 = document.getElementsByTagName('h2')[0];
      seconds = 0;
      minutes = 0;
      hours = 0;
      //timerOn = false;

      timer = function () {
         //var t;
         t = setTimeout(add, 1000);
         return t;
      };
      add = function () {
         var timeString;
         seconds += 1;
         if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
            if (minutes >= 60) {
               minutes = 0;
               hours += 1;
            }
         }

         timeString = "";
         if (hours > 9) {
            timeString += hours + ':';
         } else {
            timeString += '0' + hours + ':';
         }
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
         h2.textContent = timeString;
         timer();
      };
   }());
   puzzles = {easy0: easy1, easy1: easy2, easy2: easy3, medium0: medium1, medium1: medium2, medium2: medium3, hard0: hard1, hard1: hard2, hard2: hard3, fiendish0: fiendish1, fiendish1: fiendish2, fiendish2: fiendish3, nightmare0: nightmare1, nightmare1: nightmare2, nightmare2: nightmare3, userPuzzle0: userPuzzle1, userPuzzle1: userPuzzle2};

   // Displaying the puzzle, adding event listeners to empty spaces.
   (function () {
      var sudokuValues, addEventListeners, updateValues, validateAsYouGo, validateAlways, userInput, checkForGrayButtons, removeSelected, wrongCells, displayPuzzle, deleteUserInputs, deleteUserErrors, removeFinishedInputs;
      // Default the selectedNum to be placed in the cells next to one.
      selectedNum = 1;
      // Initialize some arrays
      sudokuValues = [];
      userInput = [];
      wrongCells = [];
      // By default, do not validate as you input numbers
      validateAsYouGo = false;
      // Add an event listener to every difficulty button
      Array.prototype.forEach.call(document.getElementsByClassName('dropdown'), function (buttonElement) {
         // When the button is clicked, show the buttons underneath it
         buttonElement.addEventListener('click', function () {
            buttonElement.querySelector('#my-dropdown').classList.toggle('show');
            // Add event listener to the drop-down buttons
            Array.prototype.forEach.call(buttonElement.getElementsByClassName('puzzle-select'), function (puzzleElement, whichPuzzle) {
               // TOOK EVENT OUT OF THE PARENTHESIS TO APPEASE JSLINT
               puzzleElement.onclick = function () {
                  // Call displayPuzzle
                  displayPuzzle(puzzleElement, whichPuzzle);
               };
            });
         }, false);
      });

      /*var a = document.getElementsByClassName('puzzle-select')[0];
      var evnt = a["onclick"];

      if (typeof(evnt) == "function") {
         evnt.call(a);
      }*/
      /*var elem = document.getElementsByClassName('puzzle-select')[0];
      if (typeof elem.onclick == "function") {
          elem.onclick.apply(elem);
      }*/
      /*(function () {
         var puzzleElement, whichPuzzle;
         puzzleElement = document.getElementByClassName('puzzle-select');
         whichPuzzle = 0;
         alert(puzzleElement);
         displayPuzzle(puzzleElement, whichPuzzle);
      }());*/

      displayPuzzle = function (puzzleElement, whichPuzzle) {
         // Try to make a puzzle appear
         var name, display, array, puzzlePlace, insidePuzzlePlace, i, j, k;
         // The name is the parent's parent's id, converted to a string with the number of whichPuzzle
         name = puzzleElement.parentNode.parentNode.id.toString() + whichPuzzle;
         display = puzzleElement.parentNode.parentNode.id.toString() + ' ' + (whichPuzzle + 1);
         document.getElementById('which-puzzle').textContent = display;
         // The array is stored as a property of puzzles
         array = puzzles[name];
         // Get the current puzzle element.
         puzzlePlace = document.getElementById('currentPuzzle');
         // If anything exists here, delete it.
         while (puzzlePlace.hasChildNodes()) {
            puzzlePlace.removeChild(puzzlePlace.firstChild);
         }
         sudokuValues = []; // reset the values
         // For every cell,
         for (i = 0; i < 9; i += 1) {
            // Insert a div with id row and class happy
            puzzlePlace.insertAdjacentHTML('beforeend', '<div id="row' + i + '" class="happy">');
            for (j = 0; j < 9; j += 1) {
               // select rowi
               insidePuzzlePlace = puzzlePlace.querySelector('#row' + i);
               //insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div>' + name + ' ' + i + ',' + j +'</div>');
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

      updateValues = function (whichBlank, emptyCellElement) {
         var index, whichBlankCopy;
         //numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                     wrongCells.push(document.getElementById(i));
                  }
                  if (validateAsYouGo) {
                  //alert ('error in ' + i + ' when checking row');
                     if (emptyCellElement.classList.contains('user-input')) {
                        emptyCellElement.classList.remove('user-input');
                        emptyCellElement.classList.add('user-error');
                        //alert(errorFound);
                     }
                  }
               }
            }
         }
         // Checking the rest of the column
         for (i = column; i < 81; i += 9) {
            if (index !== i) {
               if (selectedNum === sudokuValues[i]) {
                  //alert ('error in ' + i + ' when checking column');
                  errorFound = true;
                  if (validateAsYouGo) {
                  //alert ('error in ' + i + ' when checking row');
                     if (emptyCellElement.classList.contains('user-input')) {
                        emptyCellElement.classList.remove('user-input');
                        emptyCellElement.classList.add('user-error');
                        //alert(errorFound);
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
               //alert('checking ' + k + ' in 3x3');
               if (index !== k) {
                  if (selectedNum === sudokuValues[k]) {
                     errorFound = true;
                     //alert ('error for ' + index + ' at ' + k + ' when checking 3x3');
                     //alert ('lowerI = ' + lowerI + ' upperI = ' + upperI);
                     //alert ('lowerJ = ' + lowerJ + ' upperJ = ' + upperJ);
                     if (validateAsYouGo) {
                     //alert ('error in ' + i + ' when checking row');
                        if (emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                           //alert(errorFound);
                        }
                     }
                  }
               }
            }
         }
         if (errorFound && !validateAsYouGo) {
            wrongCells.push(emptyCellElement);
         }
         //alert(errorFound);
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
         var numCount, k;
         //alert(sudokuValues);
         numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
         sudokuValues.forEach(function (sudokuElement) {
            if (sudokuElement > 0) {
               numCount[sudokuElement - 1] += 1;
            }
         });
         //numCount[selectedNum - 1] += 1;

         Array.prototype.forEach.call(document.getElementsByClassName('input'), function (selectorElement) {
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

         Array.prototype.forEach.call(document.getElementsByClassName('selected'), function (selectorElement) {
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
         //removeFinishedInputs();
//alert('insideCheckforGray above finished');
         k = Array.from(document.getElementsByClassName('finished-input'));
         k.forEach(function (selectorElement) {
            var i, tmp;
//alert('insideCheckforGray above for');
            for (i = 0; i < 9; i += 1) {
               if (numCount[i] < 9) {
                  tmp = i + 1;
//alert('insideCheckforGray inside finished');
                  if (selectorElement.id === tmp + 'b') {
                     if (selectorElement.classList.contains('finished-input')) {
                        selectorElement.classList.remove('finished-input');
                     }
                     //alert(numCount[i]);
                     //alert('addingINput');
                     selectorElement.classList.add('input');
                  }
               }
            }
         });
      };
      document.querySelector('#clear').addEventListener('click', function () {
         var userInputs, userErrors, oneButton, finishedInputs;
         /*userInputs = document.querySelectorAll('#user-input');
         userInputs.forEach(function (element) {
            element.classList.remove('user-input');
            element.classList.add('empty-space');
            element.html('&nbsp');
            //element.textContent = ""
            //element.innerHTML = '&nbsp';
         });*/
         //userInputs = document.getElementsByClassName('user-input');
         userInputs = Array.from(document.getElementsByClassName('user-input'));
         //alert(userInputs.length);
         while (userInputs.length > 0) {
            //alert('callingDeleteInputs');
            deleteUserInputs();
            userInputs = Array.from(document.getElementsByClassName('user-input'));
         }

         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
         }
         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
         }
         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
         }
         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
         }
         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
         }
         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
         }
         userErrors = Array.from(document.getElementsByClassName('user-error'));
         while (userErrors.length > 0) {
            deleteUserErrors();
            userErrors = Array.from(document.getElementsByClassName('user-errorr'));
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
         //alert('calling check for gray');
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
         //alert('deleting');
         Array.prototype.forEach.call(document.getElementsByClassName('user-input'), function (element) {
            element.classList.remove('user-input');
            element.classList.add('empty-space');
            element.innerHTML = '&nbsp';
         });
      };

      deleteUserErrors = function () {
         Array.prototype.forEach.call(document.getElementsByClassName('user-error'), function (element) {
            element.classList.remove('user-error');
            element.classList.add('empty-space');
            //element.html('&nbsp');
            //element.textContent = "";
            element.innerHTML = '&nbsp';
         });
      };

            document.querySelector('#validate-always').addEventListener('click', function () {
         var element;
         element = document.getElementById('validate-always');
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
        })
      };
      document.querySelector('#validate-once').addEventListener('click', function () {
         wrongCells.forEach(function (element) {
            if (element.classList.contains('user-input')) {
               element.classList.remove('user-input');
               element.classList.add('user-error');
               //alert(errorFound);
            }
         });
      });
      Array.prototype.forEach.call(document.getElementsByClassName('input'), function (selectorElement, whichButton) {
         selectorElement.addEventListener('click', function () {
            //alert('a');
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
         selectedNum = 1;
         oneButton = document.getElementsByClassName('input')[0];
         oneButton.classList.remove('input');
         oneButton.classList.add('selected');
      }());
      removeSelected = function () {
         //alert('removeSel');
         Array.prototype.forEach.call(document.getElementsByClassName('selected'), function (selectorElem) {
            selectorElem.classList.remove('selected');
            selectorElem.classList.add('input');
         });
      };
   }());
   (function () {
      document.querySelector('#solve').addEventListener('click', function () {
         //alert('inside solve');
         var kids, parents, solverValues, rows, i, solveSudoku, checkRow, checkCol, check3x3, findEmptySpace, isCellSafe, displaySolution, testing, totalKids, rose;
         /*kids = Array.prototype.slice.call(children);
         alert(kids[0]);
         kids.forEach.call(children, function (child) {
            alert(children);
            alert(child);
         });*/
         solverValues = [];
         rows = [];
         i = 0;
         testing = 0;
         totalKids = 0;
         parents = document.querySelectorAll('div.happy');
         //alert(parents);
         parents.forEach(function (parentNode) {
            kids = parentNode.children;
            //alert(kids);
            //totalKids += kids.length;
            kids = Array.from(kids);
            totalKids += kids.length;

            kids.forEach(function (childNode) {
               //alert(childNode.textContent);
               //alert(childNode.textContent.length);
               //if (i < 9) {
               if (childNode.textContent === '1' || childNode.textContent === '2' || childNode.textContent === '3' || childNode.textContent === '4' || childNode.textContent === '5' || childNode.textContent === '6' || childNode.textContent === '7' || childNode.textContent === '8' || childNode.textContent === '9') {
               //if (typeof parseInt(childNode.textContent) === 'number' ){
                  rows.push(childNode.textContent);
                  //alert(rows);
                  i += 1;
                  testing += 1;
               } else {
                  //alert('pushing 0');
                  rows.push('0');
                  i += 1;
                  testing += 1;
               }
               /*} else {
                  //alert(row);
                  solverValues.push(rows);
                  rows = [];
                  i = 0;
               }*/
            });
         });
         //rose = [];
         for (i = 0; i < 9; i += 1) {
            rose = rows.slice(i * 9, (i + 1) * 9);
            solverValues.push(rose);
         }
         //alert(rose);
         //alert(solverValues);
         //alert('calling Solver');
         //alert(solveSudoku(solverValues));
         //alert(solverValues);
//         alert(totalKids);
  //       alert(testing);
    //     alert(solverValues);
         //alert(solverValues);
         /*solveSudoku = function (solverValues) {
            var emptyCell, row, column, numberToTry;

            emptyCell = findEmptySpace(solverValues, 0, 0);
            row = emptyCell[0];
            column = emptyCell[1];
            // base case: if no empty cell
            if (row === -10) {
               return true;
            }

            for (numberToTry = 1; numberToTry <= 9; numberToTry += 1) {

               if (isCellSafe(solverValues, row, column, numberToTry)) {
                  solverValues[row][column] = numberToTry;
                  if (solveSudoku(solverValues)) {
                     return true;
                  }
                  // else                    // mark cell as empty (with 0)
                  solverValues[row][column] = 0;
               }
            }
             // trigger back tracking
            return false;
         };


         findEmptySpace = function (solverValues, row, column) {
            var finished, cellReturn;
            finished = false;
            cellReturn = [-10, -10];
            while (!finished) {
               if (row === 9) {
                  return cellReturn;
               }// else {
               if (solverValues[row][column] === 0) {
                  cellReturn[0] = row;
                  cellReturn[1] = column;
                  return cellReturn;
               }// else {
               if (column < 8) {
                  column += 1;
               } else {
                  row += 1;
                  column = 0;
               }
            }
            return cellReturn;
         };

         isCellSafe = function (solverValues, row, column, numberToTry) {
            return checkRow(solverValues, column, numberToTry) && checkCol(solverValues, column, numberToTry) && check3x3(solverValues, row, column, numberToTry);
         };

         checkRow = function (solverValues, row, numberToTry) {
            var j;
            for (j = 0; j < 9; j += 1) {
               if (numberToTry === solverValues[row][j]) {
                  return false;
               }
            }
            return true;
         };
         checkCol = function (solverValues, column, numberToTry) {
            var aye;
            for (aye = 0; aye < 9; aye += 1) {
               if (numberToTry === solverValues[aye][column]) {
                  return false;
               }
            }
            return true;
         };
         check3x3 = function (solverValues, row, column, numberToTry) {
            var eye, j;
            row = Math.floor(row / 3) * 3;
            column = Math.floor(column / 3) * 3;

            for (eye = 0; eye < 3; eye += 1) {
               for (j = 0; j < 3; j += 1) {
                  if (numberToTry === solverValues[row + eye][column + j]) {
                     return false;
                  }
               }
            }
            return true;
         };*/
      });
      window.onclick = function (event) {
         Array.prototype.forEach.call(document.getElementsByClassName("dropdown-content"), function (dropdownElement) {
            if (dropdownElement.parentNode.id !== event.target.parentNode.id) {
               if (dropdownElement.classList.contains('show')) {
                  dropdownElement.classList.remove('show');
               }
            }
         });
      };
   }());
}, false);
