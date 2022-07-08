class Account {
  constructor(username, id, transactions = []) {
    this.username = username;
    this.transactions = transactions;
    this.id = id  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}


