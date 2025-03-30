class DisplayInterface {
    getCurrentValue() {}
    appendButtonText(buttonText) {}
    deleteLastChar() {}
    clearInput() {}
  }
  
  // Class that handles the input display
  class InputDisplay extends DisplayInterface {
    constructor(inputElement) {
      super();
      this.inputElement = inputElement;
    }
  
    getCurrentValue() {
      return this.inputElement.value;
    }
  
    appendButtonText(buttonText) {
      this.inputElement.value += buttonText;
    }
  
    deleteLastChar() {
      this.inputElement.value = this.inputElement.value.slice(0, -1);
    }
  
    clearInput() {
      this.inputElement.value = "";
    }
  }
  
  // Calculator class
  class Calculator {
    constructor(inputDisplay) {
      this.inputDisplay = inputDisplay;
    }
  
    calculateResult() {
      try {
        const expression = this.inputDisplay.getCurrentValue();
        // Use a safe math parser for evaluating the expression
        this.inputDisplay.inputElement.value = this.evaluateExpression(expression);
      } catch (error) {
        this.inputDisplay.inputElement.value = "ERROR";
        setTimeout(() => this.inputDisplay.clearInput(), 1500); // Clear error after 1.5 seconds
      }
    }
  
    evaluateExpression(expression) {
      try {
        // This is a safer eval alternative using Function constructor
        return new Function('return ' + expression)(); 
      } catch (e) {
        throw new Error("Invalid Expression");
      }
    }
  }
  
  // Set up the input element
  let inputElement = document.getElementById("inputEl");
  let inputDisplay = new InputDisplay(inputElement);
  let calculator = new Calculator(inputDisplay);
  
  // Event listener for button clicks
  document.body.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      const buttonText = event.target.textContent;
  
      if (buttonText === "=") {
        calculator.calculateResult();
      } else if (buttonText === "C") {
        inputDisplay.clearInput();
      } else if (buttonText === "delete") {
        inputDisplay.deleteLastChar();
      } else {
        inputDisplay.appendButtonText(buttonText);
      }
    }
  });
  
  // Keyboard support for numeric and operator keys
  document.addEventListener("keydown", (event) => {
    const key = event.key;
  
    if (key >= "0" && key <= "9") {
      inputDisplay.appendButtonText(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      inputDisplay.appendButtonText(key);
    } else if (key === "Backspace") {
      inputDisplay.deleteLastChar();
    } else if (key === "Enter") {
      calculator.calculateResult();
    } else if (key === "Escape") {
      inputDisplay.clearInput();
    }
  });
  
  