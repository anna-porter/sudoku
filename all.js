$.extend(
$.easing,{
   easeInBack:function(t,e,r,i,o,s) {
      return s=s||1.70158,i*(e/=o)*e*((s+1)*e-s)+r
      },
   easeOutBack:function(t,e,r,i,o,s) {
         return s=s||1.70158,i*((e=e/o-1)*e*((s+1)*e+s)+1)+r
         }});
         var dlx={
            dlx_cover:function (t) {
               t.right.left=t.left,
               t.left.right=t.right;
               for(var e=t.down;e!=t;e=e.down)
                  for(var r=e.right;r!=e;r=r.right)
                     r.down.up=r.up,
                     r.up.down=r.down,
                     r.column.size--
            },
            dlx_uncover:function(t){
               for(var e=t.up;e!=t;e=e.up)
                  for(var r=e.left;r!=e;r=r.left)
                     r.column.size++,
                  r.down.up=r,
                  r.up.down=r;
                  t.right.left=t,
                  t.left.right=t
                  }
                  ,dlx_search:function(t,e,r,i,o){
                     var s=this;
                     if(t.right==t)
                        return i.push(e.slice(0)),i.length>=o?i:null;
                     for(var n=null,a=99999,l=t.right;l!=t;l=l.right) {
                        if(0==l.size)return null;
                        l.size<a&&(a=l.size,n=l)}s.dlx_cover(n);
                        for(var d=n.down;d!=n;d=d.down) {
                           e[r]=d.row;
                           for(var l=d.right;l!=d;l=l.right)
                              s.dlx_cover(l.column);
                        var a=s.dlx_search(t,e,r+1,i,o);
                        if(null!=a)
                           return a;
                        for(var l=d.left;l!=d;l=l.left)
                           s.dlx_uncover(l.column)
                        }
                        return s.dlx_uncover(n),null
                        },
                  dlx_solve:function(t,e,r){
                     for(var i=new Array(t[0].length),o=i.length,s=0;s<o;s++)i[s]={};for(var s=0;s<o;s++)i[s].index=s,i[s].up=i[s],i[s].down=i[s],s>=e?(s-1>=e&&(i[s].left=i[s-1]),s+1<o&&(i[s].right=i[s+1])):(i[s].left=i[s],i[s].right=i[s]),i[s].size=0;for(var s=0,n=t.length;s<n;s++)for(var a=null,l=0,d=t[s].length;l<d;l++)if(t[s][l]){var u={};u.row=s,u.column=i[l],u.up=i[l].up,u.down=i[l],a?(u.left=a,u.right=a.right,a.right.left=u,a.right=u):(u.left=u,u.right=u),i[l].up.down=u,i[l].up=u,i[l].size++,a=u}var h={},c=[];return h.right=i[e],h.left=i[o-1],i[e].left=h,i[o-1].right=h,this.dlx_search(h,[],0,c,r),c},solve:function(t){for(var e=[],r=[],i=0;i<9;i++)for(var o=0;o<9;o++){var s=t[i][o]-1;if(s>=0){var n=new Array(324);n[9*i+o]=1,n[81+9*i+s]=1,n[162+9*o+s]=1,n[243+9*(3*Math.floor(i/3)+Math.floor(o/3))+s]=1,e.push(n),r.push({row:i,col:o,n:s+1})}else for(var a=0;a<9;a++){var n=new Array(324);n[9*i+o]=1,n[81+9*i+a]=1,n[162+9*o+a]=1,n[243+9*(3*Math.floor(i/3)+Math.floor(o/3))+a]=1,e.push(n),r.push({row:i,col:o,n:a+1})}}var l=this.dlx_solve(e,0,2);if(l.length>0){for(var d=l[0],i=0;i<d.length;i++)t[r[d[i]].row][r[d[i]].col]=r[d[i]].n;return l.length}return 0}};
                        self.addEventListener("message",function(t){var e=dlx.solve(t.data);self.postMessage(e)},!1);var texts={share:"Copy the link below to share the currently displayed board",exp:"This string represent the board, with '0' as empty cell",imp:"Enter a string of 81 characters (blanks can be 0, or anything but a number)",import_invalid:"Your submission is invalid, please check again",board_invalid:"Invalid board: no single solution found",saveGame:"Game saved",loadGame:"Game loaded",newGame:"New game loaded",win:"You won! very impressive",loose:"Solution is not valid, please verify",pause:"Game paused",clear_cell:"Clear cell",no_games_in_level:"No games for this level, try again",no_solution:"Solution is missing"},options={button:{levelMenu:$("header > div.output > ul"),undo:$("#options > button.undo"),restart:$("#options > button.restart"),newGame:$("#options > button.new"),solution:$("#options > button.solution").data("state",0),notes:$("#options > button.notes"),note:$("#options > button.note"),clearNotes:$("#options > button.clearNotes"),save:$("#options_advanced > button.save"),load:$("#options_advanced > button.load"),Import:$("#options_advanced > button.import"),Export:$("#options_advanced > button.export"),share:$("#options_advanced > button.share"),set:function(t,e){e=!e,this[t].prop("disabled",e)}},bind_buttons:function(){var t=this;$("#options > button").prop("disabled",!1),this.button.undo.bind("click",t.undo),this.undoToggle(),this.button.restart.bind("click",$.proxy(t,"restart")),this.button.newGame.bind("click",$.proxy(t,"newGame")),this.button.solution.bind("click",$.proxy(t,"solution")),this.button.Import.bind("click",function(){t.Import()}),this.button.Export.bind("click",function(){t.Export()}),this.button.share.bind("click",$.proxy(t,"share")),this.button.notes.bind("click",function(){t.candidates.set()}),this.button.note.bind("click",function(){t.notes.set()}),this.button.clearNotes.bind("click",function(){t.notes.remove()}),utility.support.storage?(this.button.save.bind("click",function(){t.save()}),this.button.load.bind("click",function(){t.load()}),localStorage&&this.button.save.add(this.button.load).show(),localStorage&&localStorage["sudoku.arr"]||this.button.load.prop("disabled",!0)):this.button.save.add(this.button.load).hide(),this.levelMenu()},levelMenu:function(){function t(t){t.stopPropagation(),$(this).addClass("on").siblings(".on").removeClass("on"),board.level=this.innerHTML,board.loadGameByLevel(board.level)}var e=this,r=e.button.levelMenu;r.find("li").filter(function(){return $(this).text()==board.level}).addClass("on"),r.on("click","li",t)},reset:function(t){t||(board.movesHistory.length=0,board.timer.restart()),this.candidates.remove(),this.notes.remove(),this.undoToggle(),options.button.solution.data("state",0).removeClass("on")},undo:function(){board.changeCell(),board.movesHistory.splice(-1),options.undoToggle()},undoToggle:function(){var t=board.movesHistory.length>0;options.button.set("undo",t)},restart:function(){this.reset(),board.arr=$.extend(!0,[],board.arr_original),board.userCells.find("> div span:first").empty(),board.numberOfMoves=utility.countEmtpyCells()},newGame:function(){window.location.search&&(window.location.search=""),this.reset(),options.button.set("newGame",0),board.loadGameByLevel(board.level),utility.alert.say(texts.newGame+" ("+solver.score()+")"),options.button.set("newGame",1)},solution:function(){var t,e,r=options.button.solution;if(!board.solution||"string"!=typeof board.solution)return utility.alert.say(texts.no_solution),void r.data("state",0).removeClass("on");if(e=r.data("state"),t=utility.decodeStr(board.solution),e){for(var i in t)board.$cellsArr[i].removeClass("filled");t=utility.getDiffArrays(utility.flattenBoard(board.arr),utility.flattenBoard(board.arr_original)),board.renderCellValues(t)}else board.renderCellValues(t);r.data("state",!e).toggleClass("on")},save:function(){localStorage["sudoku.arr"]=JSON.stringify(board.arr),localStorage["sudoku.gameStr"]=board.solution,localStorage["sudoku.movesHistory"]=JSON.stringify(board.movesHistory),localStorage["sudoku.score"]=board.level,localStorage["sudoku.time"]=board.timer.hour+":"+board.timer.min+":"+board.timer.sec,this.button.load.prop("disabled",!1),utility.alert.say(texts.saveGame)},load:function(){this.reset(!0),board.arr=JSON.parse(localStorage["sudoku.arr"]),board.solution=localStorage["sudoku.gameStr"],board.movesHistory=JSON.parse(localStorage["sudoku.movesHistory"]),solver.setScore(localStorage["sudoku.score"]),board.solution=board.solution;var t=function(){var t,e={};for(t=board.movesHistory.length;t--;)e[board.movesHistory[t][0]]=1;return e}();board.numberOfMoves=utility.countEmtpyCells(),board.load({arr:board.arr,filledCells:t}),board.timer.paused&&board.timer.el.trigger("click"),board.timer.set(localStorage["sudoku.time"]).go(!0),utility.alert.say(texts.loadGame)},share:function(){var t=window.location.host+"?"+utility.flattenBoard(board.arr_original).join("");prompt(texts.share,t)},Export:function(){prompt(texts.exp,board.solution)},Import:function(t){if(t=t||prompt(texts.imp)){if(81!=t.length)return void utility.alert.shout(texts.import_invalid);var e,r=[];for(e=0;e<9;e++){var i=t.substr(9*e,9).split("");for(var o in i)i[o]=0|i[o];r.push(i)}1!=dlx.solve($.extend(!0,[],r))&&utility.alert.shout(texts.board_invalid);var r=utility.transformArray(r);this.reset(),board.solution=t,board.load({arr:r}),board.numberOfMoves=utility.countEmtpyCells(),solver.init(r).step(0),solver.setScore()}},notes:{possibilities:{},toggle:!1,set:function(){this.toggle=!this.toggle,options.button.note.toggleClass("on",this.toggle),!this.toggle&&options.candidates.toggle&&options.candidates.set()},update:function(t,e){var r=this.possibilities;if(t in r){var i=r[t].indexOf(e);i!=-1?r[t].splice(i,1):r[t].push(e)}else r[t]=[e];r[t].sort()},check:function(t,e){t&&(delete this.possibilities[e],board.userCells.filter(function(){return $(this).data("pos")==e}).find("table.candidates td").empty(),this.possibilities=analyzer.evaluatePosib.apply(this,[board]),this.render())},render:function(){var t,e,r,i,o=this.possibilities;for(t in o)for(r=board.userCells.not(".filled").filter(function(){return $(this).data("pos")==t}),i=r.find("table.candidates td").empty(),e=0;e<9;e++)i.eq(o[t][e]-1).html(o[t][e])},remove:function(){board.userCells.length&&(this.possibilities={},options.candidates.toggle&&options.candidates.set(),board.userCells.find("table.candidates td").empty())}},candidates:{toggle:!1,set:function(){this.toggle?this.remove():(options.button.notes.addClass("on"),options.notes.toggle&&options.notes.set(),this.render())},render:function(){var t,e,r,i,o;this.toggle=!0,t=analyzer.evaluateTotal(board),e=board.userCells.not(".filled"),e.each(function(){for(i=$(this).data("pos"),r=$(this).find("table.candidates td"),r.empty(),o=0;o<9;o++)r.eq(t[i][o]-1).text(t[i][o])})},remove:function(){board.userCells.length&&(options.button.notes.removeClass("on"),board.userCells.each(function(){$(this).find("table.candidates td").empty()}),Object.keys(options.notes.possibilities).length&&options.notes.render(),this.toggle=!1)}}},utility={endcodeKey:"-ABCDEFGHI",alert:{alertObj:$("<div>").addClass("alert").append("<div>"),toggle:!1,timeout:null,value:null,say:function(t){function e(){r.alertObj.find("div").text(t),clearTimeout(r.timeout),r.timeout=window.setTimeout(function(){r.hide()},1500)}if(t){var r=this;this.toggle&&(r.alertObj.find("div").text(t),e()),this.toggle=!0,this.value=t,e(),this.render()}},shout:function(t){var e=this,r=$("<button/>").html("&times;");r.bind("click",function(){e.hide()}),clearTimeout(this.timeout),this.alertObj.addClass("shout").find("div").text(t).append(r),this.render()},render:function(){this.alertObj.removeClass("hide").appendTo(document.body)},hide:function(){var t=this;this.toggle=!1,this.alertObj.addClass("hide"),setTimeout(function(){t.alertObj.remove().removeAttr("style")},500)}},transformArray:function(t){var e,r,i,o,s,n=[];for(r=0;r<3;r++)for(i=0;i<3;i++){for(e=[],o=0;o<3;o++)for(s=0;s<3;s++)e.push(t[o+3*r][s+3*i]);n.push(e)}return n},flatten:function(t){return t.reduce(function(t,e){return t.concat(e)})},isCharNum:function(t){return 0*t==0},flattenBoard:function(t){t=t.slice(0),t=this.transformArray(t),t=this.flatten(t);for(var e=t.length;e--;)t[e]||(t[e]=0);return t},getDiffArrays:function(t,e){var r={};for(var i in t)e[i]!=t[i]&&(r[i]=t[i]);return r},mergeEncode:function(t,e){for(var r=t.length;r--;)t[r]!=e[r]&&(t[r]=utility.endcodeKey[e[r]])},decodeStr:function(t){if(t.length<81)return!1;var e,r={};for(e in t)this.isCharNum(t[e])||(r[e]=t.charCodeAt(e)-64);return $.isEmptyObject(r)&&(r=!1),r},support:{storage:function(){try{return"localStorage"in window&&null!==window.localStorage}catch(t){return!1}}()},generateNumber:function(t,e){return t=t||1,e=e||9,Math.random()*e+t>>0},countEmtpyCells:function(t){t=t||board.arr;var e=utility.flatten(t);return e.length-e.filter(Number).length}},board={mainBoard:null,level:"easy",$cellsArr:[],userCells:{},arr:[],arr_original:[],movesHistory:[],spawnQueue:[],games:{},boards:[],numberOfMoves:0,numOfBoards:0,boardsReadyTimeout:0,domFragments:{userCell:'<div><div><span></span></div><button title="'+texts.clear_cell+'">&times;</button></div>'},timerElm:$("<time>").attr("title","Click to pasue/play"),init:function(t){this.container=t,this.mainBoard=this.generateMainTable(),this.timer=new Timer(this.timerElm),this.timerElm.prependTo("#header"),82==window.location.search.length?options.Import(window.location.search.split("?")[1],!0):(this.games[this.level]&&this.loadGameByLevel(this.level),this.spawnBoards(10)),this.bindUserEvents(),this.selectBox.init(),options.bind_buttons(),t.append(this.mainBoard)},spawnBoards:function(t){t=t||2,this.numOfBoards+=t;var e,r,i;for(e=t;e--;)r=this.populate(),i=new board.CreateGame(r)},generateMainTable:function(){var t,e,r=this;return this.$cellsArr=[],t=this.makeTable(),t.find("td").each(function(t){e=r.makeTable(t).addClass("box b"+t),r.$cellsArr.push(e.find("td").map(function(){return $(this)})),$(this).append(e)}),this.$cellsArr=utility.flatten(utility.transformArray(this.$cellsArr)),t},bindUserEvents:function(){function t(t){i=$(t.currentTarget).data("pos")}function e(t){i=null}function r(t){l=t.which,o=l<58&&l>48,s=l<106&&l>96,n=46==l||110==l,i&&(d.selectBox.hide(),o||s?(a=0|String.fromCharCode(96<=l&&l<=105?l-48:l),options.notes.toggle?d.changeNote(a,i):d.changeCell(a,i)):n&&board.changeCell("",i),options.undoToggle())}var i,o,s,n,a,l,d=this;$(d.mainBoard).on("click","td.user",d.cellClick).on("click","td.user button",d.clearCell).on("mouseenter","td.user",t).on("mouseleave","td.user",e),$(document).bind("keyup",r)},selectBox:function(){function t(){n=board,this.obj=n.makeTable().addClass("num_select"),$(n.mainBoard).on("click","table.num_select td:not(.disabled)",o)}function e(t){var e=n.arr[t[0]][t[1]];n.arr[t[0]][t[1]]="",n.selectBox.obj.find("td").each(function(e){this.innerHTML=e+1,this.className=n.checkNumber(e+1,t)?"":"disabled"}),n.arr[t[0]][t[1]]=e}function r(t,r){e(r),$(t).children("div").append(n.selectBox.obj),setTimeout(function(){n.selectBox.obj.toggleClass("show"),$(document).on("click.selectBox",s)},20)}function i(t){t=t||100,n.selectBox.obj.removeClass("show"),$(document).off("click.selectBox",s)}function o(t){var e=0|t.target.innerHTML,r=$(t.target).parents("td.user").data("pos");options.notes.toggle?n.changeNote(e,r):n.changeCell(e,r),i()}function s(t){var e=$(t.target),r=e.hasClass("num_select")||e.parents("table").hasClass("num_select");return!r&&void i()}var n;return{init:t,show:r,hide:i}}(),cellClick:function(t){if(!$(t.target).closest("table").hasClass("num_select")){var e=board,r=t.currentTarget,i=$(r).data("pos");e.selectBox.obj.is(":visible")&&e.selectBox.hide(0),e.selectBox.show(r,i)}},clearCell:function(t){t.stopPropagation();var e=$(t.target).closest("td.user").data("pos");board.changeCell("",e),options.undoToggle()},changeCell:function(t,e){var r,i;arguments.length?this.movesHistory.push([e,this.arr[e[0]][e[1]]]):(e=this.movesHistory.slice(-1)[0][0],t=this.movesHistory.slice(-1)[0][1]),r=this.arr[e[0]][e[1]],this.arr[e[0]][e[1]]=t,i=this.userCells.filter(function(){return $(this).data("pos")==e}),t&&i.find("> div span").text(t),t?i.addClass("filled"):i.removeClass("filled"),options.undoToggle(),this.checkWin(r,t),options.notes.check(t,e),options.candidates.toggle&&options.candidates.render()},checkWin:function(t,e){if(t?e||board.numberOfMoves++:e&&board.numberOfMoves--,board.numberOfMoves)return!1;for(var r=utility.flattenBoard(this.arr).join(""),i=1;i<=9;i++)if(r.split(i).length-1<9)return utility.alert.say(texts.loose),!1;board.endGame()},changeNote:function(t,e){var r,i;r=board.userCells.filter(function(){return $(this).data("pos")==e}),i=r.find("table.candidates td").eq(t-1),r.removeClass("filled").find("> div span:first").text(""),board.arr[e[0]][e[1]]="",t=i.is(":empty")?t:"",i.html(t),options.notes.update(e,t)},makeTable:function(t){var e,r,i,o,s=$("<table>");for(s.attr("cellpadding",0).attr("cellspacing",0),e=0;e<3;e++)for(r=$("<tr>").appendTo(s),i=0;i<3;i++)o=$("<td>"),t+1&&o.data("pos",t+""+(3*e+i)),r.append(o);return s},populate:function(){for(var t=0,e=this,r=[4,9],i=function(t){for(;t.push([])<9;);return t}([]),o={arr:i},s=[],n=0;n<9;n++){for(var a=0;a<9;a++){t++,r[1]=9,s.length=0;for(var l=utility.generateNumber();!e.checkNumber.apply(o,[l,[n,a],!0])&&r[1];){if(t++,t>5e4)return;s.indexOf(l)==-1?(s.push(l),l=utility.generateNumber(),r[1]--):l=utility.generateNumber()}if(!r[1]){r[0]--,o.arr[n].length=0,n=r[0]?n-1:n-2;break}9==a&&(r[0]=4),o.arr[n][a]=l}r[0]||(r[0]=4)}return o.arr},checkNumber:function(t,e,r){var i,o=this;return i={square:function(e){return o.arr[e].join("").indexOf(t)!=-1},row:function(e){if(0==Math.ceil(e[0]%3)&&r)return!1;var i,s,n,a;for(i=Math.ceil(((0|e[0])+1)/3)-1,s=Math.ceil(((0|e[1])+1)/3)-1,n=0;n<3;n++)for(a=0;a<3;a++)if(t==o.arr[3*i+n][3*s+a])return!0;return!1},col:function(e){if(e[0]<3&&r)return!1;var i,s,n,a;for(i=Math.ceil((0|e[0])%3),s=Math.ceil((0|e[1])%3),n=0;n<3;n++)for(a=0;a<3;a++)if(t==o.arr[i+3*n][s+3*a])return!0;return!1}},o.arr[0|e[0]].join("").indexOf(t)==-1&&(!i.row(e)&&!i.col(e))},removeItems:function(t){t=t||{cells:0};var e=t.arr||this.arr,r=[];do r[0]=utility.generateNumber()-1,r[1]=utility.generateNumber()-1;while(""==e[r[0]][r[1]]);var i=[r,e[r[0]][r[1]],e[8-r[0]][8-r[1]]];return e[r[0]][r[1]]="",e[8-r[0]][8-r[1]]="",t.userCells>1&&this.removeItems({cells:--t.userCells,arr:e}),i},renderCellValues:function(t){for(var e in t)this.$cellsArr[e].addClass("filled").find("span:first").html(t[e])},load:function(t){function e(){for(r=0,i=c.arr.length;r<i;r++)for(s=h.eq(r),o=0;o<i;o++)a=s.find("> tbody > tr > td").eq(o),n=board.arr[r][o],""==n||d[r+""+o]?(a.addClass("user").html(board.domFragments.userCell),""!=n&&a.addClass("filled").find("> div span:first").html(n)):a.html("<span>"+board.arr[r][o]+"</span>").removeAttr("class");c.mainBoard.contents().replaceWith(u.contents()),setTimeout(function(){c.mainBoard.removeClass("hideCells")},50),board.userCells=h.find("td.user"),board.userCells.each(function(){l=board.makeTable().addClass("candidates"),this.children[0].appendChild(l[0])})}t=t||{};var r,i,o,s,n,a,l,d=t.filledCells||{},u=this.generateMainTable(),h=u.find("table.box"),c=this,C=this.mainBoard.data("timeout")||null,f=200;this.arr=t.arr?$.extend(!0,[],t.arr):this.arr,this.arr_original=$.extend(!0,[],this.arr),this.mainBoard.addClass("hideCells"),C&&"placeholder"in document.createElement("input")?(clearTimeout(C),C=null):f=0;var C=setTimeout(e,f);this.mainBoard.data("timeout",C)},loadGameByLevel:function(t){if(t in this.games&&this.games[t].length){var e=utility.generateNumber(0,this.games[t].length),r=this.games[t].splice(e,1)[0];r&&options.Import(r)}else utility.alert.say(texts.no_games_in_level);this.spawnBoards(4)},endGame:function(){function t(){i+=.15,o=utility.generateNumber(0,80);var e=r.eq(o);e.css("backgroundColor","rgba(190, 190, 190,.24)"),setTimeout(function(){e.removeAttr("style")},200),s=setTimeout(t,0|i)}function e(){clearTimeout(s),$("#options > button").prop("disabled",!1)}var r,i,o,s;this.timer.stop(),utility.alert.shout(texts.win),r=$("table.box > tbody > tr > td"),i=0,t(),$("#options > button").prop("disabled",!0),setTimeout(e,5e3)},CreateGame:function(){var t=0,e=function(e){if(!e||!e.length)return void console.warn("CreateGame: invalid or missing game array:",e);this.origArr=$.extend(!0,[],e),this.matrix_arr=[],this.arr=$.extend(!0,[],e),this.solutionCounter,this.triesCounter=16,this.verifySolutionCounter=0,this.state,t++,window.Worker&&t>20?board.spawnQueue.push(this):this.init()};return e.prototype={init:function(){window.Worker&&(this.worker=new Worker("js/DLX.js"),this.worker.addEventListener("message",this.workerMessage.bind(this),!1)),board.removeItems({cells:8,arr:this.arr}),this.removeAndCheck()},workerMessage:function(t){this.solutionCounter=t.data,this.verifySolution()},verifySolution:function(){return this.verifySolutionCounter++,2==this.solutionCounter?(this.triesCounter--,this.restoreState(this.arr),void(this.triesCounter?this.removeAndCheck():this.done())):this.verifySolutionCounter>81?(console.warn("verifySolution: too much recursion"),void this.done()):void this.removeAndCheck()},restoreState:function(t){this.arr[this.state[0][0]][this.state[0][1]]=this.state[1],this.arr[8-this.state[0][0]][8-this.state[0][1]]=this.state[2]},done:function(){t--,board.initCreatedGame($.extend(!0,[],this.arr),$.extend(!0,[],this.origArr),this.worker)}},window.Worker?e.prototype.removeAndCheck=function(){this.state=board.removeItems({arr:this.arr}),this.matrix_arr=utility.transformArray(this.arr),this.worker.postMessage(this.matrix_arr)}:e.prototype.removeAndCheck=function(){this.state=board.removeItems({arr:this.arr}),this.matrix_arr=utility.transformArray(this.arr),this.solutionCounter=dlx.solve(this.matrix_arr),this.verifySolution()},e}(),initCreatedGame:function(t,e,r){var i;return this.numOfBoards--,r.terminate(),board.spawnQueue.length&&board.spawnQueue.pop().init(),utility.countEmtpyCells(t)<45?(console.warn("generated board has too few moves. make a new game"),void(this.numOfBoards||this.boards.length||this.spawnBoards(2))):(solver.init(t).step(0),this.boards.push([solver.grade,t]),i=this.addBoards(t,e),void(1==this.boards.length&&this.arr.length<9&&solver.score()==board.level&&(this.preloadBoard(),this.solution=i)))},preloadBoard:function(){var t=this;if(!this.boards.length)return void(this.boardsReadyTimeout=setTimeout(function(){t.preloadBoard()},150));var e=this.boards[0];this.numberOfMoves=utility.countEmtpyCells(e[1]),this.load({arr:e[1]}),solver.grade=e[0],solver.setScore(),this.boards.splice(0,1),this.timer.go(),this.numOfBoards<4&&this.boards.length<4&&this.spawnBoards(8)},addBoards:function(t,e){var r,i=solver.score();return r=this.getGameString(t,e),this.games[i]||(this.games[i]=[]),this.games[i].push(r),r},getGameString:function(t,e){return t=utility.flattenBoard(t),e=utility.flattenBoard(e),utility.mergeEncode(t,e),t.join("")}},solver={init:function(t,e){return this.debug=e||0,this.grade=this.steps=this.singles=0,this.arr=t?$.extend(!0,[],t):$.extend(!0,[],board.arr),this.numberOfMoves=utility.countEmtpyCells(t),analyzer.evaluateTotal(solver),this},step:function(t){var e=0;switch(t){case 0:analyzer.evaluatePosib();break;case 1:analyzer.singleInBox();break;case 2:analyzer.singleInRowCol();break;case 3:e+=analyzer.nakedPairsTriples();break;case 4:e+=analyzer.hiddenPairsTriples();break;default:return!1}return this.makeSingleMoves(),this.grade+=10,2==t&&(this.grade+=10*this.singles),t>3&&e&&(this.grade+=10*e),4==t&&!e||0==this.numberOfMoves?(this.grade+=30*this.numberOfMoves,!1):void(this.steps>150||(t=this.singles>0||e>0?0:t+1,this.step(t)))},makeSingleMoves:function(){this.steps++,this.singles=0;var t=analyzer.possibilities;for(var e in t)t.hasOwnProperty(e)&&1===t[e].length&&(this.singles++,this.numberOfMoves--,this.advance(e,t[e][0]),delete t[e])},advance:function(t,e){this.arr[t[0]][t[1]]=e,this.debug&&board.mainBoard.find(".box").eq(t[0]).find("> tbody > tr > td").eq(t[1]).html("<span>"+e+"</span")},score:function(t){var e="very easy";return this.grade>1400?e="extreme":this.grade>1200?e="very tough":this.grade>900?e="tough":this.grade>350?e="medium":this.grade>150&&(e="easy"),e},setScore:function(t){t=t||this.score(),$("div.output:first > span").text(t).attr({"data-value":solver.grade,title:"more or less"}).hide().show(0)}},analyzer={possibilities:{},evaluateTotal:function(t){var e,r,i,o=this.possibilities={};for(e=0;e<9;e++)for(r=0;r<9;r++)if(""==t.arr[e][r])for(o[e+""+r]=[],i=1;i<10;i++)board.checkNumber.apply(t,[i,[e,r]])&&o[e+""+r].push(i);return o},evaluatePosib:function(t){var e,r,i,o=this.possibilities,t=t||solver;for(e in o)for(r=o[e].length;r--;)board.checkNumber.apply(t,[o[e][r],[0|e[0],0|e[1]]])===!1&&(i=o[e].indexOf(o[e][r]),o[e].splice(i,1));return o},singleInBox:function(){var t=this.possibilities,e=Object.keys(t)[0][0],r=this.boxPosib=[{}];for(var i in t)i[0]==e?r[r.length-1][i]=t[i]:(e=i[0],r.push({}),r[r.length-1][i]=t[i]);for(var o=r.length;o--;)this.hiddenSingles(r[o])},singleInRowCol:function(){for(var t=this.possibilities,e=this.colPosib=[],r=this.rowPosib=[],i=9;i--;)e.push({}),r.push({});for(var o in t){var s=3*Math.ceil(o[0]%3)+Math.ceil(o[1]%3),n=3*(Math.ceil(((0|o[0])+1)/3)-1)+(Math.ceil(((0|o[1])+1)/3)-1);e[s][o]=t[o],r[n][o]=t[o]}for(var i=0;i<9;i++)this.hiddenSingles(e[i]),this.hiddenSingles(r[i])},hiddenSingles:function(t){var e="";for(var r in t)e+=t[r].join("");for(var r in t)for(var i=t[r].length;i--;){var o=t[r][i];if(e.indexOf(o)==e.lastIndexOf(o)){this.possibilities[r]=[o];break}}},nakedPairsTriples:function(){for(var t=0,e=9;e--;)t+=this.findNakedPairs(this.rowPosib[e])+this.findNakedPairs(this.colPosib[e])+this.findNakedPairs(this.boxPosib[e])+this.findNakedTriples(this.rowPosib[e])+this.findNakedTriples(this.colPosib[e])+this.findNakedTriples(this.boxPosib[e]);return t},hiddenPairsTriples:function(){for(var t=0,e=9;e--;)t+=this.findHiddenPairsTriples(this.rowPosib[e])+this.findHiddenPairsTriples(this.colPosib[e])+this.findHiddenPairsTriples(this.boxPosib[e]);return t},findNakedPairs:function(t){if("object"!=typeof t||Object.keys(t).length<3)return 0;var e=[],r=0;for(var i in t)2==t[i].length&&e.push(i);for(var o=e.length,s=0;s<o;s++)for(var n=s+1;n<o;n++)if(2==t[e[s]].length&&t[e[s]].join("")==t[e[n]].join("")){var a=t[e[s]].join("");for(var l in t)if(l!=e[s]&&l!=e[n])for(var d=t[l].length;d--;)a.indexOf(t[l][d])!=-1&&(r++,this.possibilities[l].splice(d,1))}return r},findNakedTriples:function(t){if("object"!=typeof t||Object.keys(t).length<4)return 0;var e=[],r=0;for(var i in t)t[i].length<4&&e.push(i);for(var o=[],s=e.length,n=0;n<s;n++)for(var a=n+1;a<s;a++)for(var l=a+1;l<s;l++){o.push(e[n],e[a],e[l]);for(var d="",u=o.length;u--;)for(var h=t[o[u]].length;h--;){var c=t[o[u]][h];d.indexOf(c)==-1&&(d+=c)}if(3==d.length)for(var u in t)if(o.indexOf(u)==-1)for(var h=t[u].length;h--;)d.indexOf(t[u][h])!=-1&&(r++,this.possibilities[u].splice(h,1));o.length=0}return r},findHiddenPairsTriples:function(t){function e(t,e){for(var o=t.length;o--;)r.possibilities[i[t[o]]]=$.extend(!0,[],e)}var r=this,i=[],o="",s=[],n=0;for(var a in t)i.push(a),o+=t[a].join("");for(var l=0;l<i.length;l++)for(var d=l+1;d<i.length;d++){s.length=0;for(var u=0;u<t[i[l]].length;u++){var h=t[i[l]][u];if(t[i[l]].length+t[i[d]].length>4&&3==o.split(h).length&&t[i[d]].indexOf(h)!=-1&&s.push(h),2==s.length){n++,e([l,d],s);break}}for(var c=d+1;c<i.length;c++){s.length=0;for(var u=0;u<t[i[l]].length;u++){var h=t[i[l]][u];if(t[i[l]].length+t[i[d]].length+t[i[c]].length>9&&4==o.split(h).length&&t[i[d]].indexOf(h)!=-1&&t[i[c]].indexOf(h)!=-1&&s.push(h),3==s.length){n++,e([l,d,c],s);break}}}}return n}},Timer=function(t){return this.el=t,this.sec=0,this.min=0,this.hour=0,this.refresh=null,this.focus=null,this.paused=!1,t.html("00:00"),this.events(),this};Timer.prototype={set:function(t){return t=t.split(":"),this.hour=t[0],this.min=t[1],this.sec=t[2],this},bindFocus:function(){var t=this;clearInterval(this.focus),document.hasFocus&&(t.focus=setInterval(function(){document.hasFocus()?t.paused&&(window.clearInterval(this.refresh),t.go()):t.stop()},200))},events:function(){function t(t){i&&(i=!1,e.paused===!1?(e.stop(),window.clearInterval(e.focus),$("#options > button").prop("disabled",!0),board.mainBoard.fadeOut(400,function(){r.css({letterSpacing:"25px",opacity:0}),$(this).after(r).detach(),r.parent().addClass("paused"),r.animate({opacity:1},{queue:!1,duration:400}).animate({letterSpacing:"-4px"},700,"easeOutBack",function(){i=!0})}),e.el.addClass("pause")):($("#options > button").prop("disabled",!1),options.undoToggle(),r.animate({opacity:0,letterSpacing:"25px"},600,"easeInBack",function(){$(this).parent().removeClass("paused").end().remove(),board.container.prepend(board.mainBoard).removeAttr("style"),board.mainBoard.fadeIn(400),e.go(),i=!0}),this.className=""))}var e=this,r=$("<h2>").addClass("pauseGame").text(texts.pause),i=!0;this.el.on("click",t)},restart:function(t){this.sec=this.min=this.hour=0,this.el.text("00:00"),this.stop().go()},go:function(t){function e(){r.sec++,60==r.sec&&(r.sec=0,r.min++),r.sec<10&&(r.sec="0"+r.sec),60==r.min&&(r.min=0,r.hour++);var t=r.hour>0?(r.hour<=9?"0"+r.hour:r.hour)+":":"";r.el.html(t+(r.min<=9?"0"+r.min:r.min)+":"+r.sec)}var r=this;return this.paused=!1,t&&e(),window.clearInterval(this.refresh),r.refresh=window.setInterval(e,1e3),this},stop:function(){return this.paused=!0,window.clearInterval(this.refresh),this}},board.games={easy:["2IC8E1GDFGFD2CI5HAEH14FGI3BF79C8BDA5HC5A7D6BI4ABE9F87CC4HIA52FGIB7FD3AEHAEF7B8CI4","DEH6IG2ACIA3E248GFG6B3AH5DI5HFGC1I2DA47I5B63HC2I4HFGE1BC5HD9A6GHG126C4IEFI4AG5CHB","2HG4CE1FIDC69GAEHBI51HFB73DF7E18D9B3HICEBGDAF1D2F93H5GG68BAI34ECADGE62IHEB9CD8FG1","FAG2I3E8DHIBDE6CGAE34AG8BFIG53FBDA9828FC1ID5714IGHE63BDGE9CB81FIFH5DAGBCC2A8F7IDE","B34FGA5H9I6EHD32A7GHA59BDFCHECGB91D6F4ICAHG5B1G24EFCIHCAFB85IGD4I81CGF2E5B7IFD83A","52H16C4GII7D825C1FFCA9DGBHEB1IFCDHE745CG8AF927HFEIBA3DHDBCG9EFAA6G258I4CCI5D16G28","4BCEA6IG857HIBCFA4AI6478CEB742FH9ACEFE1C4B8IGCHI1EG246IFE2347HA8CDGFAE292AG8IEDF3","BIFHDGEC1C8A56ID7BG4EAB369HAEDICHB6762H714C5993GFEBAHDE732HAI4FD1IC76H2E8FBDIEGAC","5DBG9H3AF97CFD1BH5H1FBEC9GDA5G82F4CIBC4A7I5FHFH9E34A2GGB1IHEF4C4FE3AGH92CI8D6BGE1","16G53H2D9DICFG2EAHEHBDI1C6731HIEF7B4BG9CAD8EF6E4HBGA9382F1DCIGEGDE2HIFCA9C1G65D82"],extreme:["FE741BHCIA985FCGDB2CDIH7E1FGFB1C49E8DA5BIH3FG9H37E6DBAE2F8DIAG3HGACB569DCDIF712HE","79C6DH52ABE13GIDF8D68EBACIGHBG1IDF5C6A4B5C8G9I3EHF7ADBCGIDAE28F5HBIC67ADA46GH2I35","E69A4CB7HA3GBH95FD2HD7FEIC13IA8EDF27GBEFIAHDC64HCG2AI59EFDA7CH2HG35BFD1ID1BI3H75F","DAC2F785I6IEHDA7C28BGCEIA6DGFD5HCIB1EC29146HG9HAGB6CDEA4HFIBEG33E9DGHBA6B761C5DIH","6I3H4A5GB54GIF2CAHB18EG3IF48GDC29AEFAEBF8GDCICFI41EBH77BF1ED89CIHE2CFG41DC1G9H6B5","IB53H7A6DHGAFD2EC9D3F51IBH7EICHGD61BAF2I5C4GHG48ABFIEC2EDG31H9F6HG4IECBAC1I2F87DE","1G6H93ED25DB6AGC98ICHEB4G6AB8C4EFAGI6IGA3HDB5DAEBG9H3FG5I3HBFAD82DGF1IE33FA94E2H7","DE1FIBGC8H3B4AG96EI7F5H31DBA6D25IHGC2ICAGHDE6EHGC64B1ICD87B6E9AG25IC1F8D6AIHDE3BG","DFC89BGE15B73FAI4H19HDE7BFCHGDFB5C199C5GAD6H221F9HCDGEFHB1DIE37C5ABG68I47DIE38ABF","FI5CA4HBGGA8BEIF3423DH6GIEAHE97BFADCAB39487FEDGFEC12IHCFAD8BE7958GFIC4ABIDB1GE3HF"],medium:["6EDC2HIGAG195FDBHC8C2AIGE4648391BGFEEIF4G3ABHABGF8539424EGCF8A9CGAHD965BIFHB5ADC7","IF7HCAED2A2D7EF93HCH5DB96GAHGB1D5CIF49FCGBH15EAC6I8GBDBE89AG4FCF39BH4A5G7DAEFC2HI","BGE9HF1C4DIA37EB863FH2AD5IGEBCAI7FD8H16DEC72I7DI6BHCEAAC4HF2IG595BG41HFC6H7EC9DAB","BIHFA3GE4G1EI8D63BC4FB5G8IA9B7E4ACF8AHC7F9BDE6EDC2H9A7EF1H9BD7CH39D7EA2F4GB1CFEHI","D9AGH6BCEH23AEIG4FGF54B3A8IIE68ABC7D1CGE9DFB8B8DFC75IAF7H3D19EBE1BIGH46CCDI2FEH1G","A2EHGD6393IG5BFHAD6DHAI37BEGEA6CBI48DFBI1HEGC83IDE7BFAIG42HACE6BHFCD5AI7513GFID8B","6BGEAHC9DC9E46GBHAD1HIB3E6GGD3H5BFA99E13G64B88FBA4I7CEA7F2IEH4CECDF81I7BB8IGCDAE6","G836I5A4BBDA3H7IEF96EDA28CG8B71EI36D3IDG6HBA5E16BD37I8FE98GAD23DGB9C6EHAA3H5B467I","9AG2HCDEFH53AD6GBIF4B5GI1HCC8FI2AE4G1I4F5G2C8B7ED3HI6AEF9CA4H7BGBA8FE39DDCHGI2FA5","I13F7H5D2EBFADI7CH8D72C519FAG98FCDBE2EH9A4FG3CFDEB79HAD923E18F7FH1GIBCED7C5D8F21I"],tough:["2C1GE6DIHI7DBH3EA6HF5I1D3BG618CIBGDE4ECHGABF9GIBFDE183AH9E2G6CD5BF4CHI7ACDG1FI8E2","G5D9BFH1C3AB8GDI5F98FA5CBDG1G84IB6CE4FE381GB9BI3GF54H1FBIE3HA74E4GBA9CF8H3AFD7E9B","A8D27IECF3EGFD19H2I6BHE3GADH7CA6BDIE619E3D827DBEG9HC6AEIF3BGA4H2C84AEFG9GDAI86B5C","B5AFGC8DI4FG8EIB13H9CA4B5FGE3I76DAB8AD2C9H6GE7HFB15C9DIA8D3FG5B62EIH7DC1CG4EBAI8F","8DFG395BA75C1FB9DHB1ID5HCFGECHIA467B4IB6G5AH3F718BCDIEIHGE4AB3FCF5BI7H14AB438FGE9","D87I6CA252CA4EG98FI6E8BAGCD57BCIDHFAF1C7H5B4IHDIBAFE73GBDEC9F1HA98FD2CE735FA7H49B","IH631GDEBA45FB9HC7C2GE8DFI1GI8B61CDEB537D816IDFA95C7BH5GDH3BI1F6CI1GE28DHABD965GC","FDAIEB3HGC7H6ADB5I529CH7ADF7CBDF5I18I14GCH62E85F2IADG3AIE8DC762D6GEB9H3ABH3AGFEID","81GIBD53FICFHG5D21DE21FC9H7EB37IFADH7F84123E9AIDCE87FB2G5FC18ID38A2DIFGEF49EHGB13","7F3DIAEHBBH4CGE6IA9A5H26CG4ECIAH2G4F8DF537AB9A2G6DIHCE6GH91D2E3CI1BEH4FGDEBGFC9A8"],"very easy":["9BHCGAED6DGA2E6IC85634H9AG2GEBHID6ACH961C275DCA4GFEBHI2CE6D78916HI5A3DBG1DGIBHCF5","4BF7I8E1C53GFBADH9H1I3DEF72F82A7CIEDIDE286ACGAGCD5I26H36DHA2G9E2IAECGH46G5H9F4CB1","BE3AFDIGHA9D5GHCBFGF832I54AH3BGD16E994A635G825G69HBD1CF25D138IGCHIBE7A6DDAGHIF2CE","738FE91BDFBDCGAH5IEIA8D27CFC1GD9F58B2DI5A8FG3H56B3GD9AIG51B4CFHA6BGHCIDEDH39FE217","9GDH3EA2FC16BIGHEDH251DF3795D1G896CBGCBF1DEIHFI852C4A7257CF894AAHIDEB76CD6CI7ABH5","DE7FI82AC6BHG3159D1IC45BHFG9HFBGC45ACA2EFD7HIE74HAICB6GDEI86AC2H3912GFD5BF13DE9GH","CH7AFBD95I2E4C8GA6F147EIB3HAFCH24EGIHG29156DCDEI67CHBAG9HCD615B5CA2H7I6D24FEIA3HG","E9FBG3D81CA4IHF5B77BH1D5IFC6H2C9AGED9G1DEB8C6DCEG6H1I2HFG5C4BA92E9FAG3DH14C8BIF7E","7F39H14EBI84BE7CA61E2CD6HI7398DGBE6ADBEA6CGHIF1GEIH2432CF8AE9G48GI6CD12EED17B96C8","DB8C5I71FF57DAB9H3I1C6H7BE48IDG2ECFA7CA8F4EI2EFBA9CHD73HI2D1F7E2D5IGF13HA76E3H4BI"],
"very tough":["5HFD12G3IIBG3E8ADFC4AF7IHBEH75AB64ICD6CIHGE1BAI25DC67HFCDH9AB5GBEI7F4CHAG1H23EIF4","6BE7IDC18GA8B6CI4EDI31EH6B7BDG5AFHCI9C6H7B1E4HEACD9GFB5G9FB14HCC6BD8G5IA18DIC5BG6","DG3I28F1EF5HA4GCIB9BA5FCDH7G8I6AEB3D21EG3DH69C6DBH9E7A8IGCE2AD6EDFH7AI2CA3B49F7EH","FIHAGC5D257DFB8I3A21C94E8GFADE7FI3BH8BIC5DFA7CF7HA2DEIDH2E97A63G3A4HFB959E6BCAGHD","DGC58ABFI529D6CAHGA6HIB7CD5IH4CA67EBG52HID63AFC12GE8ID8AG6EID2CBDEA3H976CIFG42EAH","2GAFIHCD5DI83BE1G63EF1G49H2FDC9E2G1HEH2D1G6CIG1I8C6BED8B47F1EI31C5BD98FG9FGEHCDB1","EDF7HIBACCI7FB1DH52AH43EF9GA8B5F37DI96DBGHC51GE39A4H2FD7EH96AC28BA3EG9FDFCIAD2EGH","IDFGE1H23BCH9DF5GAA5GBH3964GB3195FDH8ADC6GBI5EFI4281CG4958CBG1FCH1FG9DEB67B5ADCHI","EG26CDA8IF8IA72E4CAD3IEHGB6D1H79CBF5BFG4A5ICH9CEB86D7A8EACDG6IBG9F82AC5DC2DEF98AG","86EDBCAG9D7C98AB5FIA26E7HCD3I8E74FBABDA3I6EHGFEG81B9D3AHF7D53IBE2DA39G6H7CIBFHD15"]};