(function() {
  "use strict";

  // Shortcut to get elements
   var el = function(element) {
    if (element.charAt(0) === "#") { // If passed an ID...
       return document.querySelector(element); // ... returns single element
    }

   return document.querySelectorAll(element); // Otherwise, returns a nodelist/   };
}
  // Variables
  var viewer = el("#viewer"), // Calculator screen where result is displayed
    equals = el("#equals"), // Equal button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    theNum = "", // Current number
    oldNum = "", // First number
    resO = "",
    disO = "",
    resultNum, // Result
    Odia = "",
    operator; // ops

  // When: Number is clicked. Get the current number selected
  var setNum = function() {
    if (resultNum) { // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
      Odia += document.getElementById(this.getAttribute("data-num")).textContent;
    }
   viewer.innerHTML = Odia; // Display current number

  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    Odia = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  var displayNum = function() {

    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

        // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }
     resO = resultNum.toString();
     for(var a = 0; a < resO.length; a++){
     disO += document.getElementById(resO[a]).textContent;
}  
  // Display result, finally!
    viewer.innerHTML = disO;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;

  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "";
    equals.setAttribute("data-result", resultNum);
    window.location.reload();
  };

  /* The click events */

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;

}());
