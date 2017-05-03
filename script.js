/*jslint browser: true, indent: 3 */

// CS 3312, spring 2017
// Final Project: Sudoku Puzzles
// YOUR NAME(S): Anna Porter and Michael McCarver

/* 
   Validate as you go
   Validate once
   Solver
   gray out buttons once nine of that number are on the page.

 */
document.addEventListener('DOMContentLoaded', function () {
   'use strict';
   var easy1, easy2, easy3, medium1, medium2, medium3, hard1, hard2, hard3, fiendish1, fiendish2, fiendish3, nightmare1, nightmare2, nightmare3, puzzles, h2, seconds, minutes, hours, timer, add, t, selectedNum, validateAsYouGo, numCount;
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
   // Timer function.
   numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
   validateAsYouGo = false;
   (function () {
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
   puzzles = {easy0: easy1, easy1: easy2, easy2: easy3, medium0: medium1, medium1: medium2, medium2: medium3, hard0: hard1, hard1: hard2, hard2: hard3, fiendish0: fiendish1, fiendish1: fiendish2, fiendish2: fiendish3, nightmare0: nightmare1, nightmare1: nightmare2, nightmare2: nightmare3};

   // Displaying the puzzle, adding event listeners to empty spaces.
   (function () {
      var sudokuValues, addEventListeners, updateValues;
      selectedNum = 1;
      sudokuValues = [];
      // Add an event listener to every difficulty button
      Array.prototype.forEach.call(document.getElementsByClassName('dropdown'), function (buttonElement) {
         // When the button is clicked, show the buttons underneath it
         buttonElement.addEventListener('click', function () {
            buttonElement.querySelector('#my-dropdown').classList.toggle('show');
            // Add event listener to the drop-down buttons
            Array.prototype.forEach.call(buttonElement.getElementsByClassName('puzzle-select'), function (puzzleElement, whichPuzzle) {
               // TOOK EVENT OUT OF THE PARENTHESIS TO APPEASE JSLINT
               puzzleElement.onclick = function () {
                  // Try to make a puzzle appear
                  var name, array, puzzlePlace, insidePuzzlePlace, i, j;
                  name = puzzleElement.parentNode.parentNode.id.toString() + whichPuzzle;
                  array = puzzles[name];
                  puzzlePlace = document.getElementById('currentPuzzle');

                  while (puzzlePlace.hasChildNodes()) {
                     puzzlePlace.removeChild(puzzlePlace.firstChild);
                  }

                  for (i = 0; i < 9; i += 1) {
                     puzzlePlace.insertAdjacentHTML('beforeend', '<div id="row' + i + '" class="happy">');
                     for (j = 0; j < 9; j += 1) {
                        insidePuzzlePlace = puzzlePlace.querySelector('#row' + i);
                        //insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div>' + name + ' ' + i + ',' + j +'</div>');
                        if (array[i][j] !== 0) {
                           insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div>' + array[i][j] + '</div>');
                           sudokuValues.push(array[i][j]);
                        } else {
                           insidePuzzlePlace.insertAdjacentHTML('beforeend', '<div class="empty-space">&nbsp</div>');
                           sudokuValues.push(0);
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
                  clearTimeout(t);
                  h2.textContent = '00:00:00';
                  seconds = 0;
                  minutes = 0;
                  hours = 0;
                  t = timer();
               };
               addEventListeners();
            });
         }, false);
      });

      addEventListeners = function () {
         var emptyCells = document.querySelectorAll('div.empty-space');
         emptyCells.forEach(function (emptyCellElement, whichBlank) {
            emptyCellElement.addEventListener('click', function () {
               emptyCellElement.textContent = selectedNum;
               if (emptyCellElement.classList.contains('empty-space')) {
                  //alert('its true');
                  emptyCellElement.classList.remove('empty-space');
                  emptyCellElement.classList.add('user-input');
               }
               if (validateAsYouGo) {
                  updateValues(whichBlank, emptyCellElement);
               }
            }, false);
         });
      };

      updateValues = function (whichBlank, emptyCellElement) {
         var row, column, i, j, index, whichBlankCopy;
         index = 0;
         numCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
         whichBlankCopy = whichBlank;
         //firstRun = true;
         sudokuValues.forEach(function () {
            if (whichBlankCopy > 0) {
               if (sudokuValues[index] !== 0) {
                  index +=1;
               } else {
                  index += 1;
                  whichBlankCopy -= 1;
               } 
            }
            numCount[sudokuValues[index]] += 1;
         });
         sudokuValues[index] = selectedNum;
         row = index / 9;
         column = index % 9;
         // checking the rest of the row
         for (i = 9 * row; i < 9 * row + 9; i += 1) {
            if (selectedNum === sudokuValues[i]) {
               if(emptyCellElement.classList.contains('user-input')) {
                  emptyCellElement.classList.remove('user-input');
                  emptyCellElement.classList.add('user-error');
               }
            }
         }
         // Checking the rest of the column
         for (i = column; i < 81; i += 9) {
            if (selectedNum === sudokuValues[i]) {
               if(emptyCellElement.classList.contains('user-input')) {
                  emptyCellElement.classList.remove('user-input');
                  emptyCellElement.classList.add('user-error');
               }
            }
         }
         /*
         // Checking the top left 3x3
         if (column < 3 && row < 3) {
            for (i = 0; i < 3; i +=1) {
               for (j = 0; j < 3; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // checking the top middle 3x3
         if (column >= 3 && column < 6 && row < 3) {
            for (i = 3; i < 6; i +=1) {
               for (j = 0; j < 3; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // checking the top right 3x3
         if (column >= 6 && column < 9 && row < 3) {
            for (i = 6; i < 9; i +=1) {
               for (j = 0; j < 3; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // Checking the middle left 3x3
         if (column < 3 && row >= 3 && row < 6) {
            for (i = 0; i < 3; i +=1) {
               for (j = 3; j < 6; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // checking the center 3x3
         if (column >= 3 && column < 6 && row >= 3 && row < 6) {
            for (i = 3; i < 6; i +=1) {
               for (j = 3; j < 6; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // Checking the right middle 3x3
         if (column >= 6 && column < 9 && row >= 3 && row < 6) {
            for (i = 6; i < 9; i +=1) {
               for (j = 3; j < 6; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // Checking the middle left 3x3
         if (column < 3 && row >= 6 && row < 9) {
            for (i = 0; i < 3; i +=1) {
               for (j = 3; j < 6; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // checking the center 3x3
         if (column >= 3 && column < 6 && row >= 6 && row < 9) {
            for (i = 3; i < 6; i +=1) {
               for (j = 3; j < 6; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
         // Checking the right middle 3x3
         if (column >= 6 && column < 9 && row >= 6 && row < 9) {
            for (i = 6; i < 9; i +=1) {
               for (j = 0; j < 3; j += 1) {
                  if (index !== j * 9 + i) {
                     if (selectedNum === sudokuValues[j * 9 + i]) {
                        if(emptyCellElement.classList.contains('user-input')) {
                           emptyCellElement.classList.remove('user-input');
                           emptyCellElement.classList.add('user-error');
                        }
                     }
                  }
               }
            }
         }
*/
      };
      document.querySelector('#validate-always').addEventListener('click', function () {
         if (validateAsYouGo === false) {
            validateAsYouGo = true;
         } else {
            validateAsYouGo = false;
         }
      });
      Array.prototype.forEach.call(document.getElementsByClassName('input'), function (selectorElement, whichButton) {
         if (numCount[whichButton] === 9 && selectorElement.classList.contains('input')) {
            selectorElement.classList.remove('input');
            selectorElement.classList.add('finished-input');
         }
         selectorElement.addEventListener('click', function () {
            selectedNum = whichButton + 1;
         }, false);
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
