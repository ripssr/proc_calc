'use strict';

(function procentCalculator() {
  let procent = document.getElementsByClassName('procents')[0];
  let amount = document.getElementsByName('amount')[0];
  let sumOpt = {
    amount: 0.0,
    term: 3,
    termCf: 2,
    currency: 1,
    curType: '₽',
    capital: false,
  };
  let terms = new Map();
    terms.set(3, 2).set(6, 5).set(12, 12).set(18, 13.5)
         .set(24, 14).set(36, 14.5).set(48, 15);
  let currencies = {
    'RUB': [1, '₽'], 'USD': [0.5, '$'], 'EUR': [0.4, '€'], 'UAG': [1.3, '₲'],
    'KZT': [1.1, '₸'], 'YEN': [0.3, '₩'], 'GBP': [0.3, '₤']
  };

  procent.addEventListener('change', correctProcent);
  amount.addEventListener('input', correctAmount);

  function correctProcent() {
    let elem = event.target;
      if (elem.name == 'term-select') {
        sumOpt.term = parseInt(elem.value);
        sumOpt.termCf = terms.get(parseInt(elem.value));
      } else if (elem.name == 'currency-select') {
        sumOpt.currency = currencies[elem.value][0];
        sumOpt.curType = currencies[elem.value][1];
      } else if (elem.name == 'capitalize') {
        sumOpt.capital = elem.checked;
      }

    getSum(sumOpt.termCf * sumOpt.currency);
  }

  function correctAmount() {
    if (!+event.target.value) {
      event.target.value = event.target.value.slice(0, -1);
    }
    sumOpt.amount = +event.target.value;
    getSum(sumOpt.termCf * sumOpt.currency);
  }

  function getSum(procent) {
    let sum;
    if (!sumOpt.capital) {
      sum = sumOpt.amount * (1 + procent /100 * sumOpt.term / 12)
    } else {
      sum = sumOpt.amount * ((1 + procent / 100 / 12) ** sumOpt.term )
    }

    document.getElementsByClassName('sum-value')[0].innerHTML =  Math.round(sum*100)/100 + '  ' +
          sumOpt.curType;
    document.querySelector('.sum b').innerHTML = Math.round(procent*1000)/1000;
  }
})();
