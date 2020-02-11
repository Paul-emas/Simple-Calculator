// Solution 1

// var calulateController = (function () {
//     var Values = function (value) {
//         this.value = value;
//     }

//     var data = {
//         string: '',
//         value: []
//     }

//     return {
//         storeVal: function (val) {
//             data.string += val;
//             if (val !== '+' && val !== '-' && val !== '*') {
//                 data.value.push(val);
//             }
//         },

//         clearData: function () {
//             data.string = '';
//             data.value = 0;
//         },

//         addValues: function (val) {
//             var sum = 0;

//             if (val === '+') {
//                 if (data.value[0] >= 0) {
//                     data.value.map(function (cur) {                        
//                         sum += cur;                        
//                     })
//                     console.log(sum);
//                 }
//             }            
//             return sum;            
//         },

//         getValues: function () {
//             return data;
//         },

//         testing: function () {
//             console.log(data);
//         }
//     }

// })();


// var UIController = (function () {

//     var DOMStrings = {
//         inputBtn: '.cal-box__btn',
//         inputField: 'numberValues',
//         operatorsBtn: '.op-btn',
//         clearBtn: '.clear',
//         add: '.add'
//     }

//     return {
//         getInput: function () {
//             return {
//                 input: document.querySelectorAll(DOMStrings.inputBtn),
//                 operators: document.querySelectorAll(DOMStrings.operatorsBtn)
//             }
//         },
//         getValues: function (val) {
//             document.getElementById(DOMStrings.inputField).textContent = val;
//         },

//         getDOMStrings: function () {
//             return DOMStrings;
//         }
//     }

// })();


// var controller = (function (calCtrl, UICtrl) {

//     // 1. Setup Event Handlers
//     var DOM = UICtrl.getDOMStrings();
//     var DOMInput = UICtrl.getInput();

//     function updateUI() {
//         var values = calCtrl.getValues();
//         UICtrl.getValues(values.string);
//     }

//     var numArr = DOMInput.input;
//     var opArr = DOMInput.operators;

//     function getNumValues() {

//         function calVal(arr, index, num) {

//             arr[index].addEventListener('click', function () {
//                 switch (index) {
//                     case 0:
//                         num = 1;
//                         break;
//                     case 1:
//                         num = 2;
//                         break;
//                     case 2:
//                         num = 3;
//                         break;
//                     case 3:
//                         num = 4;
//                         break;
//                     case 4:
//                         num = 5;
//                         break;
//                     case 5:
//                         num = 6;
//                         break;
//                     case 6:
//                         num = 7;
//                         break;
//                     case 7:
//                         num = 8;
//                         break;
//                     case 8:
//                         num = 9;
//                         break;
//                     case 9:
//                         num = 0;
//                         break;
//                     case 0:
//                         num = "+";
//                 }
//                 calCtrl.storeVal(num);
//                 updateUI();
//             });
//         }

//         function getOpval(arr, index, num) {
//             arr[index].addEventListener('click', function () {
//                 switch (index) {
//                     case 0:
//                         num = '+';
//                         break;
//                     case 1:
//                         num = '-';
//                         break;
//                 }
//                 calCtrl.storeVal(num);
//                 calCtrl.addValues(num);
//                 updateUI();
//             })
//         }

//         calVal(numArr, 0);
//         calVal(numArr, 1);
//         calVal(numArr, 2);
//         calVal(numArr, 3);
//         calVal(numArr, 4);
//         calVal(numArr, 5);
//         calVal(numArr, 6);
//         calVal(numArr, 7);
//         calVal(numArr, 8);
//         calVal(numArr, 9);
//         getOpval(opArr, 0);
//         getOpval(opArr, 1);
//     }

//     document.querySelector(DOM.clearBtn).addEventListener('click', function () {
//         var clearedData;
//         clearedData = calCtrl.clearData();
//         updateUI();
//     });

//     return {
//         init: function () {
//             document.getElementById(DOM.inputField).textContent = '0';
//             getNumValues();
//         }
//     }

// })(calulateController, UIController);

// controller.init();



// METHOD 2

const calculator = document.querySelector('.cal-box');
const keys = document.querySelector('.cal-keys');
const display = document.getElementById('numberValues');

keys.addEventListener('click', el => {

    if (el.target.matches('button')) {
        const key = el.target;
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('active'));
        const action = key.dataset.action;
        const keyContext = key.textContent;
        const displayedNum = display.textContent;
        const prevKeyType = calculator.dataset.prevKeyType;

        if (!action) {
            if (displayedNum === '0' || prevKeyType === 'operator') {
                display.textContent = keyContext;
            } else {
                display.textContent = displayedNum + keyContext;
            }
        }

        if (action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply') {
            key.classList.add('active');
            calculator.dataset.prevKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'decimal') {
            display.textContent = displayedNum + '.';
        }


        if (action === 'equal') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            const calculate = (n1, operator, n2) => {
                let result = '';
                const firstNum = parseFloat(n1);
                const secondNum = parseFloat(n2);
                
                if (operator === 'add') {
                    result = firstNum + secondNum;
                }

                if (operator === 'subtract') {
                    result = firstNum - secondNum;
                }

                if (operator === 'multiply') {
                    result = firstNum * secondNum;
                }

                if (operator === 'divide') {
                    result = firstNum / secondNum;
                }
                
                return result;
            }

            const calcResult = calculate(firstValue, operator, secondValue);
            display.textContent = calcResult;
            console.log(calcResult);
            return calcResult;
        }

        if (action === 'clear') {
            display.textContent = '0';
        }
    }


});

// Method 3 

// Using Vue 