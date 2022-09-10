let a = ''; //first number
let b = ''; //second number
let res = ''; //result
let sign = ''; //operation
let expr = ''; //expression
let temp;
let finish = false;

const hist = [];
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '^', '÷', '%', '√'];

const out = document.querySelector('.calc-screen p');
const histwrit = document.querySelector('.history p');

function clear() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

document.querySelector('.C').onclick = clear;

document.querySelector('.buttons').onclick = (event) => {
    
    if (!event.target.classList.contains('btn') || event.target.classList.contains('C'))
        return;
    out.textContent = '';
    const key = event.target.textContent;
    if (digit.includes(key)){
        if (b === '' && sign === '') {
            a += key;
            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish){
            a = res;
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.log(a, b, sign);
        return;
    }
    if (action.includes(key)){
        sign = key;
        console.log(a, b, sign);
        out.textContent = sign;
        return;
    }
    if (key === '=') {
        if (b === '')
            b = a;
        switch (sign) {
            case "+":
                res = (+a) + (+b);
                break;
            case "-":
                res = a - b;
                break;
            case "*":
                res = a * b;
                break;
            case "÷":
                if (b === '0'){
                    out.textContent = 'Mistake';
                    a = '';
                    b = '';
                    sign = '';
                    res = '';
                    return;
                }
                res = a / b;
                break;
            case "%":
                res = (a * b) / 100;
                break;
            case "^":
                res = Math.pow(a, b);
                break;
            case "√":
                if (b === '') {
                    out.textContent = 'Mistake';
                    a = '';
                    b = '';
                    sign = '';
                    res = '';
                    return;
                }
                if (a === '' && b !== '') {
                    res = Math.sqrt(b);
                }
                else if (a !== '' && b !== '')
                    res = a * Math.sqrt(b);
                
                break;
        }
        finish = true;
        if (Number.isInteger(res)) {
            out.textContent = res;
            expr = a + ' ' + sign + ' ' + b + ' = ' + res;
        }
        else {
            out.textContent = res.toFixed(2);
            expr = a + ' ' + sign + ' ' + b + ' = ' + res.toFixed(2);
        }
        hist.unshift(expr);
        if (hist.lenght > 99)
            hist.pop();
        localStorage.clear();
        temp = hist.length;
        for (let i = 0; i < temp; i++){
            localStorage.setItem(i, hist[i]);
        }
        histwrit.innerText = hist.join('\n\r');
    }
}
