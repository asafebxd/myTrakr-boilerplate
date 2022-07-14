class Transaction {
  constructor(transaction) {
    this.amountVal = transaction.amountVal;
    this.accountId = transaction.accountId;
    this.accountIdFrom = transaction.accountIdFrom;
    this.accountIdTo = transaction.accountIdTo;
    this.category = transaction.category;
    this.id = transaction.id;
    this.transType = transaction.transType;
    this.descripcion = transaction.descripcion;

  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amountVal;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amountVal;
  }
}

class Transfer extends Transaction{
  get value() {
    if(this.accountId === this.accountIdFrom){
      return -this.amountVal;
    }
    return this.amountVal;
  }
} 

const convertTransactions = function(transactions){
  return transactions.map(transaction => {
    if(transaction.transType === 'deposit'){
      return new Deposit(transaction);
    }else if(transaction.transType === 'withdraw'){
      return new Withdrawal(transaction);
    }else {
      return new Transfer(transaction);
    }

  })
}

const printDataTransfer = (transactions) => {
  return transactions.forEach(transDetails => {
    console.log(transDetails.transType);

    // let newTransaction;
    // if(transDetails.transType === 'deposit'){
    //   newTransaction = new Deposit(transDetails.amountVal, transDetails.accountId);
    // }else if(transDetails.transType === 'withdraw'){
    //   newTransaction = new Withdrawal(transDetails.amountVal, transDetails.accountId);
    // }else {
    //   newTransaction = new Transfer(transDetails.amountVal, transDetails.accountId, transDetails.accountIdFrom, transDetails.accountIdTo);
    // }
    // console.log('newTransaction',newTransaction)


    let to = ""
    let from = ""
    let username = ""
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == transDetails.accountId) {
        username = users[i].username
      }
      if (users[i].id == transDetails.accountIdFrom) {
        from = users[i].username
      }
      if (users[i].id == transDetails.accountIdTo) {
        to = users[i].username
      }
    }
    $(".tableData").append(`
  <tr class="accountInfos">
    <td class="idWrap">${transDetails.id}</td>
    <td class="usernameWrap">${username}</td>
    <td class="transWrap">${transDetails.transType}</td>
    <td class="catWrap">${transDetails.category}</td>
    <td class="descWrap">${transDetails.descripcion}</td>  
    <td class="amountWrap">${transDetails.amountVal}</td>
    <td class="fromWrap">${from}</td>
    <td class="toWrap">${to}</td>
  </tr>
  `)
  // return newTransaction
  })

}