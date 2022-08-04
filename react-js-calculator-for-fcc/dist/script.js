const buttons = [
{ id: 'clear', value: 'AC' },
{ id: 'divide', value: '/' },
{ id: 'multiply', value: 'x' },
{ id: 'subtract', value: '-' },
{ id: 'seven', value: 7 },
{ id: 'eight', value: 8 },
{ id: 'nine', value: 9 },
{ id: 'add', value: '+' },
{ id: 'four', value: 4 },
{ id: 'five', value: 5 },
{ id: 'six', value: 6 },
{ id: 'decimal', value: '.' },
{ id: 'one', value: 1 },
{ id: 'two', value: 2 },
{ id: 'three', value: 3 },
{ id: 'zero', value: 0 },
{ id: 'equals', value: '=' }];

const ops = ['AC', '/', 'x', '+', '-', '='];
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const Display = ({ input, output }) => /*#__PURE__*/
React.createElement("div", { className: "output" }, /*#__PURE__*/
React.createElement("span", { className: "result" }, output), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
React.createElement("span", { id: "display", className: "input" }, input));


const Key = ({ keyData: { id, value }, displayInput }) => /*#__PURE__*/
React.createElement("button", { id: id, onClick: () => displayInput(value) }, value);

const Keypad = ({ displayInput }) => /*#__PURE__*/
React.createElement("div", { className: "keys" },
buttons.map((key) => /*#__PURE__*/
React.createElement(Key, { key: key.id, keyData: key, displayInput: displayInput })));




function App() {
  const [input, setInput] = React.useState('0');
  const [output, setOutput] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  const displaySubmit = () => {
    const total = eval(answer);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setAnswer(`${total}`);

  };
  const displayClear = () => {
    setInput("0");
    setAnswer("");
  };

  const displayDecimal = () => {;
    const lastChar = answer.charAt(answer.length - 1);
    if (!answer.length) {
      setInput("0.");
      setAnswer("0.");
    } else {
      if (lastChar === "*" || ops.includes(lastChar)) {
        setInput("0.");
        setAnswer(`${answer} 0.`);
      } else {
        setInput(
        lastChar === "." || input.includes(".") ? `${input}` : `${input}.`);

        const formattedValue =
        lastChar === "." || input.includes(".") ?
        `${answer}` :
        `${answer}.`;
        setAnswer(formattedValue);
      }
    }
  };

  const displayNumbers = val => {
    if (!answer.length) {
      setInput(`${val}`);
      setAnswer(`${val}`);
    } else {
      if (val === 0 && (answer === '0' || input === '0')) {
        setAnswer(`${setAnswer}`);
      } else {
        const lastChar = answer.charAt(answer.length - 1);
        const isLastCharOperator = lastChar === "*" || ops.includes(lastChar);
        setInput(isLastCharOperator ? `${val}` : `${input}${val}`);
        setAnswer(`${answer}${val}`);
      }
    }
  };

  const displayOperator = val => {
    if (answer.length) {
      setInput(`${val}`);
      const beforeLastChar = answer.charAt(answer.length - 2);

      const beforeLastCharIsOperator =
      ops.includes(beforeLastChar) || beforeLastChar === "*";

      const lastChar = answer.charAt(answer.length - 1);

      const lastCharIsOperator = ops.includes(lastChar) || lastChar === "*";

      const validOp = val === "x" ? "*" : val;
      if (
      lastCharIsOperator && val !== "-" ||
      beforeLastCharIsOperator && lastCharIsOperator)
      {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${answer.substring(
          0,
          answer.length - 2)
          }${val}`;
          setAnswer(updatedValue);
        } else {
          setAnswer(`${answer.substring(0, answer.length - 1)}${validOp}`);
        }
      } else {
        setAnswer(`${answer}${validOp}`);
      }
    }
  };

  const displayInput = val => {
    const digit = digits.find(dig => dig === val);
    const operator = ops.find(op => op === val);

    switch (val) {
      case "=":
        displaySubmit("");
        break;
      case "AC":
        displayClear();
        break;
      case digit:
        displayNumbers(val);
        break;
      case ".":
        displayDecimal();
        break;
      case operator:
        displayOperator(val);
        break;
      default:
        break;}

  };

  const displayOutput = () => {
    setOutput(answer);
  };

  React.useEffect(() => {
    displayOutput();
  }, [answer]);

  return /*#__PURE__*/(

    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("div", { className: "calc" }, /*#__PURE__*/
    React.createElement(Display, { input: input, output: output }), /*#__PURE__*/
    React.createElement(Keypad, { displayInput: displayInput }))));



}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#root'));