const accounts = [];

export const getAccounts = () => {
  return accounts;
};

export const addAccount = (account) => {
  const newAccount = { ...account, id: accounts.length + 1 };
  accounts.push(newAccount);
  return newAccount;
};

$(document).ready(() => {
  $('button').on('click',() => {
    console.log('clicked jquery')
  })
})

export default { getAccounts, addAccount };
