import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (equation === "") {
      setEquation(`${inputValue} ${nextOperator} `);
    } else if (!waitingForOperand) {
      const currentEquation = equation.split(" ");
      const prevValue = parseFloat(currentEquation[0]);
      const operator = currentEquation[1];

      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setEquation(`${result} ${nextOperator} `);
    } else {
      setEquation(`${inputValue} ${nextOperator} `);
    }

    setWaitingForOperand(true);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "−":
        return firstOperand - secondOperand;
      case "×":
        return firstOperand * secondOperand;
      case "÷":
        return firstOperand / secondOperand;
      case "=":
        return secondOperand;
      default:
        return secondOperand;
    }
  };

  const performCalculation = () => {
    if (equation !== "" && !waitingForOperand) {
      const currentEquation = equation.split(" ");
      const prevValue = parseFloat(currentEquation[0]);
      const operator = currentEquation[1];
      const inputValue = parseFloat(display);

      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setEquation("");
      setWaitingForOperand(true);
    }
  };

  const percentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const handleButtonClick = (btn: string) => {
    switch (btn) {
      case "C":
        clear();
        break;
      case "±":
        toggleSign();
        break;
      case "%":
        percentage();
        break;
      case "=":
        performCalculation();
        break;
      case "+":
      case "−":
      case "×":
      case "÷":
        performOperation(btn);
        break;
      case ".":
        inputDot();
        break;
      default:
        if (!isNaN(Number(btn))) {
          inputNumber(btn);
        }
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-1 min-h-4">
          {equation}
        </div>
        <Input 
          className="text-right text-xl font-mono h-12" 
          value={display} 
          readOnly 
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["C", "±", "%", "÷",
          "7", "8", "9", "×",
          "4", "5", "6", "−",
          "1", "2", "3", "+",
          "0", "", ".", "="].map((btn, index) => (
          btn && (
            <Button
              key={index}
              variant={["C", "±", "%", "÷", "×", "−", "+", "="].includes(btn) ? "secondary" : "outline"}
              className={`h-12 ${btn === "0" ? "col-span-2" : ""}`}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </Button>
          )
        ))}
      </div>
    </div>
  );
};