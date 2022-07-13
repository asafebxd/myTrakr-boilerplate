class Transaction {
  constructor(amount, accountId) {
    this.amount = amount;
    this.accountId = accountId;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Transfer extends Transaction{
  constructor (amount, accountId, accountIdFrom, accountIdTo){
    super(amount, accountId);
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
  }
  get value() {
    if(this.accountId === this.accountIdFrom){
      return -this.amount;
    }
    return this.amount;
  }
} 

const printDataTransfer = (transaction) => {
  transaction.forEach(transDetails => {
    console.log(transDetails.transType);

    let newTransaction;
    if(transaction.transType === 'deposit'){
      newTransaction = new Deposit(transaction.amountVal, transaction.accountId);
    }else if(transaction.transType === 'withdraw'){
      newTransaction = new Withdrawal(transaction.amountVal, transaction.accountId);
    }else {
      newTransaction = new Transfer(transaction.amountVal, transaction.accountId, transaction.accountIdFrom, transaction.accountIdTo);
    }


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
  })

}