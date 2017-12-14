var term,
  protocol,
  socketURL,
  socket,
  pid;

var terminalContainer = document.getElementById('terminal-container'),
  actionElements = {
    findNext: document.querySelector('#find-next'),
    findPrevious: document.querySelector('#find-previous')
  },
  optionElements = {
    cursorBlink: document.querySelector('#option-cursor-blink'),
    cursorStyle: document.querySelector('#option-cursor-style'),
    scrollback: document.querySelector('#option-scrollback'),
    tabstopwidth: document.querySelector('#option-tabstopwidth'),
    bellStyle: document.querySelector('#option-bell-style')
  },
  colsElement = document.getElementById('cols'),
  rowsElement = document.getElementById('rows');

function setTerminalSize() {
  var cols = parseInt(colsElement.value, 10);
  var rows = parseInt(rowsElement.value, 10);
  var viewportElement = document.querySelector('.xterm-viewport');
  var scrollBarWidth = viewportElement.offsetWidth - viewportElement.clientWidth;
  var width = (cols * term.charMeasure.width + 20 /*room for scrollbar*/ ).toString() + 'px';
  var height = (rows * term.charMeasure.height).toString() + 'px';

  terminalContainer.style.width = width;
  terminalContainer.style.height = height;
  term.resize(cols, rows);
}

colsElement.addEventListener('change', setTerminalSize);
rowsElement.addEventListener('change', setTerminalSize);

actionElements.findNext.addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    term.findNext(actionElements.findNext.value);
  }
});
actionElements.findPrevious.addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    term.findPrevious(actionElements.findPrevious.value);
  }
});

optionElements.cursorBlink.addEventListener('change', function() {
  term.setOption('cursorBlink', optionElements.cursorBlink.checked);
});
optionElements.cursorStyle.addEventListener('change', function() {
  term.setOption('cursorStyle', optionElements.cursorStyle.value);
});
optionElements.bellStyle.addEventListener('change', function() {
  term.setOption('bellStyle', optionElements.bellStyle.value);
});
optionElements.scrollback.addEventListener('change', function() {
  term.setOption('scrollback', parseInt(optionElements.scrollback.value, 10));
});
optionElements.tabstopwidth.addEventListener('change', function() {
  term.setOption('tabStopWidth', parseInt(optionElements.tabstopwidth.value, 10));
});

createTerminal();

function createTerminal() {
  // Clean terminal
  while (terminalContainer.children.length) {
    terminalContainer.removeChild(terminalContainer.children[0]);
  }
  term = new Terminal({
    rows: 12,
    cols: 80,
    readOnly: true,
    cursorBlink: optionElements.cursorBlink.checked,
    scrollback: parseInt(optionElements.scrollback.value, 10),
    tabStopWidth: parseInt(optionElements.tabstopwidth.value, 10)
  });

  term.open(terminalContainer);

  term.fit();

  //console.log(term.parent.clientHeight);
  // console.log("height:= " + Math.floor((term.element.clientHeight - 15)/term.charMeasure.height));
//  term.resize();

  var i;
  term.writeln("testA");
  term.writeln("testB");

  // term.writeln("Test for test");
  // term.writeln("\u001B[31;1;4mTest\u001B[0mffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffkkk8");
  //
  for (i = 1; i <= 31; i++) {
    term.writeln("test " + i);
  }
  //
  // term.writeln("first line");
  //
  // console.log(term.lines);
  // console.log("vertical scroll width = " + term.verticalScrollWidth);
  // //term.resize(88, 24);
  // term.writeln("test");
  // term.writeln("Test for ");
  // console.log("Step " + term.cols);
  //
  //
  term.writeln("\u001B[31;1;4mTest\u001B[0mfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffWWW");
  // term.writeln("test");
  // term.writeln("Next line");
  //
  // for (i = 1; i <= 4; i++) {
  //   term.writeln("line " + i);
  // }
}
