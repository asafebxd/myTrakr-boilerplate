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
