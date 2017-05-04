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
   var easy1, easy2, easy3, medium1, medium2, medium3, hard1, hard2, hard3, fiendish1, fiendish2, fiendish3, nightmare1, nightmare2, nightmare3, userPuzzle1, puzzles, h2, seconds, minutes, hours, timer, add, t;
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
   puzzles = {easy0: easy1, easy1: easy2, easy2: easy3, medium0: medium1, medium1: medium2, medium2: medium3, hard0: hard1, hard1: hard2, hard2: hard3, fiendish0: fiendish1, fiendish1: fiendish2, fiendish2: fiendish3, nightmare0: nightmare1, nightmare1: nightmare2, nightmare2: nightmare3, userPuzzle0: userPuzzle1};

   // Displaying the puzzle, adding event listeners to empty spaces.
   (function () {
      var sudokuValues, addEventListeners, updateValues, validateAsYouGo, validateAlways, userInput, selectedNum, checkForGrayButtons, removeSelected, wrongCells, displayPuzzle;
      selectedNum = 1;
      sudokuValues = [];
      userInput = [];
      wrongCells = [];
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
                  displayPuzzle(puzzleElement, whichPuzzle);
               };
            });
         }, false);
      });

      displayPuzzle = function (puzzleElement, whichPuzzle) {
         // Try to make a puzzle appear
         var name, array, puzzlePlace, insidePuzzlePlace, i, j, k;
         name = puzzleElement.parentNode.parentNode.id.toString() + whichPuzzle;
         //alert(name);
         //alert(whichPuzzle);
         array = puzzles[name];
         puzzlePlace = document.getElementById('currentPuzzle');
         while (puzzlePlace.hasChildNodes()) {
            puzzlePlace.removeChild(puzzlePlace.firstChild);
         }
         sudokuValues = []; // reset the values
         for (i = 0; i < 9; i += 1) {
            puzzlePlace.insertAdjacentHTML('beforeend', '<div id="row' + i + '" class="happy">');
            for (j = 0; j < 9; j += 1) {
               insidePuzzlePlace = puzzlePlace.querySelector('#row' + i);
               //insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div>' + name + ' ' + i + ',' + j +'</div>');
               if (array[i][j] !== 0) {
                  insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div>' + array[i][j] + '</div>');
                  sudokuValues.push(array[i][j]);
                  userInput.push(false);
               } else {
                  //alert (j + ' * ' + 9 + ' + ' + i);
                  k = i * 9 + j;
                  insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div class="empty-space" id = ' + k + '>&nbsp</div>');
                  sudokuValues.push(0);
                  userInput.push(true);
                  /*insidePuzzlePlace.lastElementChild.addEventListener('click', function (emptySpace) {
                  emptySpace.textContent = selectedNum;
                  if (emptySpace.classList.contains('empty-space')) {
                     emptySpace.classList.remove('empty-space');
                     emptySpace.classList.add('user-input');
                  }
                  }, false);*/
                  //insidePuzzlePlace.getElementByID('empty-space').innerHTML = i;
               }
            }
            puzzlePlace.insertAdjacentHTML('beforeend', '</div>');
         }
         addEventListeners();
         clearTimeout(t);
         h2.textContent = '00:00:00';
         seconds = 0;
         minutes = 0;
         hours = 0;
         t = timer();
      };

      addEventListeners = function () {
         var emptyCells = document.querySelectorAll('div.empty-space');
         emptyCells.forEach(function (emptyCellElement, whichBlank) {
            emptyCellElement.addEventListener('click', function () {
               //var i;
               emptyCellElement.textContent = selectedNum;
               if (emptyCellElement.classList.contains('empty-space')) {
                  emptyCellElement.classList.remove('empty-space');
                  emptyCellElement.classList.add('user-input');
               }
               updateValues(whichBlank, emptyCellElement);
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
                  //alert(sudokuValues[index] + ' at ' + index);
                  //alert('numCount of ' + sudokuValues[index] + '+= 1');
                  //numCount[sudokuValues[index] - 1] += 1;
                  index += 1;
               } else {
                  //alert(sudokuValues[index] + ' at ' + index);
                  //alert(whichBlankCopy + ' = whichBlank');
                  index += 1;
                  whichBlankCopy -= 1;
               }
            }
         });
         index -= 1;
         sudokuValues[index] = selectedNum;
         //numCount[sudokuValues[index] - 1] += 1;
         //if (validateAsYouGo) {
         validateAlways(index, emptyCellElement);
         //}
         //checkForGrayButtons();
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
         var numCount;
         //alert(sudokuValues);
         numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
         sudokuValues.forEach(function (sudokuElement) {
            if (sudokuElement > 0) {
               numCount[sudokuElement - 1] += 1;
            }
         });
         numCount[selectedNum - 1] += 1;
         //alert(numCount);
         Array.prototype.forEach.call(document.getElementsByClassName('input'), function (selectorElement) {
            var i;
            //alert(document.getElementsByClassName('input'));
            for (i = 0; i < 9; i += 1) {
               if (numCount[i] >= 9) {
                  if (i === 0 && selectorElement.id === '1b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 1 && selectorElement.id === '2b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 2 && selectorElement.id === '3b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 3 && selectorElement.id === '4b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 4 && selectorElement.id === '5b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 5 && selectorElement.id === '6b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 6 && selectorElement.id === '7b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 7 && selectorElement.id === '8b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
                  if (i === 8 && selectorElement.id === '9b') {
                     if (selectorElement.classList.contains('input')) {
                        selectorElement.classList.remove('input');
                     } else if (selectorElement.classList.contains('selected')) {
                        //alert("removing Selected");
                        selectorElement.classList.remove('selected');
                     }
                     selectorElement.classList.add('finished-input');
                  }
               }
            }
         }, false);
      };
      document.querySelector('#validate-always').addEventListener('click', function () {
         if (validateAsYouGo === false) {
            validateAsYouGo = true;
         } else {
            validateAsYouGo = false;
         }
      });
      document.querySelector('#validate-once').addEventListener('click', function () {
         wrongCells.forEach(function (element) {
            if (element.classList.contains('user-input')) {
               element.classList.remove('user-input');
               element.classList.add('user-error');
               //alert(errorFound);
            }
         });
      });

      document.querySelector('#solve').addEventListener('click', function () {
         //alert('inside solve');
         var kids, parents, solverValues, rows, i, solveSudoku, checkRow, checkCol, check3x3, findEmptySpace, isCellSafe, displaySolution;
         /*kids = Array.prototype.slice.call(children);
         alert(kids[0]);
         kids.forEach.call(children, function (child) {
            alert(children);
            alert(child);
         });*/
         solverValues = [];
         rows = [];
         i = 0;
         parents = document.querySelectorAll('div.happy');
         //alert(parents);
         parents.forEach(function (parentNode) {
            kids = parentNode.children;
            //alert(kids);
            kids = Array.from(kids);
            kids.forEach(function (childNode) {
               //alert(childNode.textContent);
               //alert(childNode.textContent.length);
               if (i < 9) {
                  if (childNode.textContent === '1' || childNode.textContent === '2' || childNode.textContent === '3' || childNode.textContent === '4' || childNode.textContent === '5' || childNode.textContent === '6' || childNode.textContent === '7' || childNode.textContent === '8' || childNode.textContent === '9') {
                     rows.push(childNode.textContent);
                     //alert(row);
                     i += 1;
                  } else {
                     //alert('pushing 0');
                     rows.push(0);
                     i += 1;
                  }
               } else {
                  //alert(row);
                  solverValues.push(rows);
                  rows = [];
                  i = 0;
               }
            });
            alert('calling Solver');
            solveSudoku(solverValues);
            alert(solverValues);
         });
         solveSudoku = function (solverValues) {
            var emptyCell, row, column, numberToTry;
            emptyCell = findEmptySpace(solverValues, row, column);
            row = emptyCell[0];
            column = emptyCell[1];
            // base case: if no empty cell  
            if (row === -1) {
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
         };
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
      removeSelected = function () {
         //alert('removeSel');
         Array.prototype.forEach.call(document.getElementsByClassName('selected'), function (selectorElem) {
            selectorElem.classList.remove('selected');
            selectorElem.classList.add('input');
         });
      };
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
