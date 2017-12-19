var term;

Split(['#left', '#right'], {
  direction: 'horizontal',
  sizes: [50, 50],
  minSize: 1
});

Split(['#top', '#bottom'], {
  direction: 'vertical',
  sizes: [50, 50],
  minSize: 1
});

var terminalContainer = document.getElementById('terminal-container'),
  verticalResizer = document.getElementsByClassName('gutter gutter-vertical')[0],
  horizontalResizer = document.getElementsByClassName('gutter gutter-horizontal')[0],
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
  };

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

function resize() {
  verticalResizer.addEventListener('mousedown', initResize, false);
  horizontalResizer.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
      }

  function Resize(e) {
      terminalContainer.style.width = terminalContainer.parentNode.parentElement.width;
      terminalContainer.style.height = terminalContainer.parentNode.parentElement.height;
      console.log(terminalContainer.style.width);
      resizeTerminal();
    }

  function stopResize(e) {
      window.removeEventListener('mousemove', Resize, false);
      window.removeEventListener('mouseup', stopResize, false);
    }
}

resize();

function resizeTerminal() {
  var initialGeometry = term.proposeGeometry(),
  cols = term.verticalScrollWidth,
  rows = initialGeometry.rows;
  console.log("Resize: cols= " + initialGeometry.verticalScrollWidth);
  term.resize(cols, rows);
}

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

  // console.log("Rows after fit: " + term.rows);
  // console.log("Cols after fit: " + term.cols);

  setTimeout(function() {
    // var geometry = term.fit();
    // console.log(term.parent.clientHeight);
    console.log("height:= " + Math.floor((term.parent.clientHeight - term.scrollBarMeasure.getHorizontalWidth())/term.charMeasure.height));
    console.log("width:= " + Math.floor((term.parent.clientWidth - term.scrollBarMeasure.getVerticalWidth())/term.charMeasure.width));

    var newRows = Math.floor((term.parent.clientHeight - term.scrollBarMeasure.getHorizontalWidth())/term.charMeasure.height);
    var newCols = Math.floor((term.parent.clientWidth - term.scrollBarMeasure.getVerticalWidth())/term.charMeasure.width);
    term.resize(newCols, newRows);

    // term.writeln("testA");
    // term.writeln("testB");

    // console.log(term.charMeasure.width);
    // console.log(term.charMeasure.height);
    // console.log(term.scrollBarMeasure.getHorizontalWidth());
    // console.log(term.scrollBarMeasure.getVerticalWidth());
    //
    //
    // // term.writeln("Test for test");
    // term.writeln("\u001B[31;1;4mTest\u001B[0mffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffkkk8");
    // var i;
    for (i = 1; i <= 20; i++) {
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
  }, 0);

}
