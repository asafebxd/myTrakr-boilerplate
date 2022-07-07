class Account {
  constructor(username, id) {
    this.username = username;
    this.transactions = [];
    this.id = id  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}




