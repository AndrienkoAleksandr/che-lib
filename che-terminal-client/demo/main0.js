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
  cols =  Math.max(initialGeometry.cols, term.maxLineWidth);
  rows = initialGeometry.rows;
  //console.log("Resize: cols= " + cols);
  term.resize(cols, rows);
}

createTerminal();

function createTerminal() {
  // Clean terminal
  while (terminalContainer.children.length) {
    terminalContainer.removeChild(terminalContainer.children[0]);
  }
  term = new Terminal({
    rows: 24,
    cols: 80,
    readOnly: true,
    // scrollback: 20,
    cursorBlink: optionElements.cursorBlink.checked,
    // scrollback: parseInt(optionElements.scrollback.value, 10),
    tabStopWidth: parseInt(optionElements.tabstopwidth.value, 10)
  });

  for (i = 1; i <= 2; i++) {
    term.writeln("test " + i);
  }
  //term.writeln("hello0 yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy oooooooooooooooooooooooooo yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy yyyyyyyyyyyyyyyyyyyyyyy  yyyyyyyyyyyyyyyyyyyyyyyyyy popup1");
  term.writeln("test 3");

  term.open(terminalContainer);

  // term.registerLinkMatcher(".*(Hello).*(World).*", function () {
  //   console.log("Hello!!!");
  // }, {matchIndex: 2, priority: 0});
  // term.writeln("Hello World");

  term.registerLinkMatcher("(\\s+at)\\s.+\\((.+\\.+java:\\d+)\\)", function (event, url, text) {
    console.log("Matcker handler works!!! Original line content = " + text);
  }, {matchIndex: 2, priority: 0});
  term.writeln(" at org.junit.Assert.fail(Assert.java:86)");


  // term.registerLinkMatcher("(\\s+at\\s.+\\(.+\\.java:\\d+)\\)", function () {
  //   console.log("Matcker handler works!!!");
  // }, {matchIndex: 2, priority: 0});
  // term.writeln(" at org.junit.Assert.fail(Assert.java:86)");

  resizeTerminal();
  // cols = term.maxLineLength();//term.maxLineWidth,

  // var geometry = term.proposeGeometry();
  // term.resize(geometry.cols, geometry.rows);

  // console.log("Rows after fit: " + term.rows);
  // console.log("Cols after fit: " + term.cols);

  // setTimeout(function() {
    // var geometry = term.fit();
    // console.log(term.parent.clientHeight);
    // console.log("height:= " + Math.floor((term.parent.clientHeight - term.scrollBarMeasure.getHorizontalWidth())/term.charMeasure.height));
    // console.log("width:= " + Math.floor((term.parent.clientWidth - term.scrollBarMeasure.getVerticalWidth())/term.charMeasure.width));

    // var newRows = Math.floor((term.parent.clientHeight - term.scrollBarMeasure.getHorizontalWidth())/term.charMeasure.height);
    // var newCols = Math.floor((term.parent.clientWidth - term.scrollBarMeasure.getVerticalWidth())/term.charMeasure.width);
    // term.resize(newCols, newRows);


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

    //term.writeln("oooooooooooooooooooooooooooooooooooooooooooooffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffkkk8yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy0");
    // console.log(term.maxLineLength() + " ~!!!!!!!!!!!!!!!!!!!!!!!!!!!!111");
    //
    // term.writeln("first line");
    //
    // console.log(term.lines);
    // console.log("vertical scroll width = " + term.maxLineWidth);
    // //term.resize(88, 24);
    // term.writeln("test");
    // term.writeln("Test for ");
    // console.log("Step " + term.cols);
    //
    //
    //term.writeln("\u001B[31;1;4mTest\u001B[0mffffffuuufffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffWWW");
    //term.writeln("\u001B[31;1;4mTest\u001B[0mfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffWWW");
    //term.writeln("\u001B[31;1;4mTest\u001B[0mffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffyyyyyyyyyyyyyfffWWW");
    // term.writeln("test");
    // term.writeln("Next line");
    //
    // for (i = 1; i <= 4; i++) {
    //   term.writeln("line " + i);
    // }

    // console.log("____________________________________________");
    // var max = 0;
    // this.term.lines._array.forEach(function(elem) {
    //   if (max < elem.length) {
    //     max = elem.length;
    //   }
    // });
    // console.log(max);
    // console.log("____________________________________________");
    //
    // max = this.term.lines._array.reduce(function(a, b) {
    //   return Math.max(a, b.length);
    // });
    // console.log(max);
    // console.log("____________________________________________");
    //console.log(this.term.lines);

    // setTimeout(function () {
    //   console.log("Max line length " + this.term.maxLineLength());
    //   console.log(this.term.cols);
    // }, 1000);


  // }, 0);

}
