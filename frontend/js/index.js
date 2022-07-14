users = [];

$(() => {
  //Start coding here!
  $.ajax({
    method: "get",
    url: "http://localhost:3000/accounts",
    dataType: "json",
  }).done((data) => {
    data.forEach((accounts) => {
      const newTransactions = convertTransactions(accounts.transactions);
      const newAccount = new Account(
        accounts.username,
        accounts.id,
        newTransactions
      );
      $(".accountWrapper").append(
        `<option value = ${accounts.id}>${accounts.username}</option>`
      );
      users.push(newAccount);
      $("#listSummary").append(`
          <li id="${newAccount.username}">Account Name: ${newAccount.username} | Current Balance: <span>${newAccount.balance}</span></li>`);
    });
  });

  $("#newAccount").on("submit", (e) => {
    e.preventDefault();
    const inValue = $("#accountInput").val();
    if (inValue === "") {
      alert("insert value");
      return;
    }
    let exist = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === inValue) {
        exist = true;
      }
    }
    if (exist) {
      alert("The user already exist");
      return;
    }

    const newAccount = {
      username: inValue,
      transactions: [],
    };

    $.ajax({
      method: "post",
      data: JSON.stringify({ newAccount }),
      url: "http://localhost:3000/accounts",
      dataType: "json",
      contentType: "application/json",
    }).done((data) => {
      const newAccount = new Account(data.username, data.id, data.transactions);
      users.push(newAccount);
      $(".accountWrapper").append(
        `<option value = ${data.id}>${data.username}</option>`
      );

      $("#listSummary").append(`
          <li id="${newAccount.username}">Account Name: ${newAccount.username} | Current Balance: <span>${newAccount.balance}</span></li>`);
    });
  });

  $.ajax({
    method: "get",
    url: "http://localhost:3000/transactions",
    dataType: "json",
  }).done((data) => {
    data.forEach((transaction) => {
      printDataTransfer(transaction);
    });
  });
});

$("#newTransaction").on("submit", (e) => {
  e.preventDefault();
  const newTransaction = {
    category: $("#chooseCategory").val(),
    transType: $("[name=radioValue]:checked").val(),
    descripcion: $("#descVal").val(),
    amountVal: Number($("#amountVal").val()),
    accountId: $("#accChangeId").val(), // account ID for Deposits or Withdraws
    accountIdFrom: $("#fromId").val(), // sender ID if type = 'Transfer', otherwise null
    accountIdTo: $("#toId").val(), // receiver ID if type = 'Transfer', otherwise null
    // all info from form
  };

  let currentBalance = "";

  if ($("[name=radioValue]:checked").val() === "transfer") {
    let username = "";
    users.forEach((user) => {
      if (user.id == $("#fromId").val()) {
        username = user.username;
      }
    });

    currentBalance = Number($(`#${username} span`).text());

    if (currentBalance < Number($("#amountVal").val()))
      alert("SOORY! You dont have enough balance");
  }
  if ($("[name=radioValue]:checked").val() === "withdraw") {
    let username = "";
    users.forEach((user) => {
      if (user.id == $("#accChangeId").val()) {
        username = user.username;
      }
    });
    currentBalance = Number($(`#${username} span`).text());

    if (currentBalance < Number($("#amountVal").val()))
      alert("SOORY! You dont have enough balance");
  }

  if ($("#amountVal").val() <= 0) {
    alert("The amout value should be greater than 0");
    return;
  }

  if (!$("[name=radioValue]:checked").val()) {
    alert("Chosse a type of transaction");
    return;
  }

  if ($("[name=radioValue]:checked").val() === "transfer") {
    if ($("#fromId").val() === "" || $("#toId").val() === "") {
      alert("Chosse one account before transfer");
      return;
    }
    if ($("#fromId").val() === $("#toId").val()) {
      alert("From can not be the same as to");
      return;
    }
  }

  $.ajax({
    method: "post",
    url: "http://localhost:3000/transaction",
    data: JSON.stringify({ newTransaction }),
    dataType: "json",
    contentType: "application/json",
  }).done((data) => {
    const newTransactions = convertTransactions(data);
    newTransactions.forEach((transaction) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id == transaction.accountId) {
          users[i].transactions.push(transaction);
          $(`#${users[i].username} span`).text(users[i].balance);
        }
      }
    });
  });
});

$("#filterAcc").on("change", (e) => {
  e.preventDefault();
  $(".accountInfos").remove();
  filterAcc = "";
  const selectedUserId = $("#filterAcc").val();

  if (selectedUserId === "filterAll") {
    users.forEach((user) => {
      printDataTransfer(user.transactions);
    });
  }
  users.forEach((user) => {
    let account = "";
    let to = "";
    let from = "";
    if (user.id == selectedUserId) {
      filterAcc = user.transactions;
      //clear table

      filterAcc.forEach((transaction) => {
        account = users.find((user) => {
          if (user.id == transaction.accountId) {
            return user;
          }
        });
        const fromUser = users.find((user) => {
          if (user.id == transaction.accountIdFrom) {
            return user;
          }
        });
        if (fromUser) {
          from = fromUser.username;
        }
        const toUser = users.find((user) => {
          if (user.id == transaction.accountIdTo) {
            return user;
          }
        });
        if (toUser) {
          to = toUser.username;
        }

        $(".tableData").append(`
              <tr class="accountInfos">
                <td class="idWrap">${transaction.id}</td>
                <td class="usernameWrap">${account && account.username}</td>
                <td class="transWrap">${transaction.transType}</td>
                <td class="catWrap">${transaction.category}</td>
                <td class="descWrap">${transaction.descripcion}</td>  
                <td class="amountWrap">${transaction.amountVal}</td>
                <td class="fromWrap">${from}</td>
                <td class="toWrap">${to}</td>
              </tr>
              `);
      });
    }
  });
});

$("[name=radioValue]").click(() => {
  if (
    $("[name=radioValue]:checked").val() === "deposit" ||
    $("[name=radioValue]:checked").val() === "withdraw"
  ) {
    $("#fromFild").css("display", "none");
    $("#toFild").css("display", "none");
    $("#account").css("display", "block");
    $(".selected").val("").change();
  } else {
    $("#account").css("display", "none");
    $("#fromFild").css("display", "block");
    $("#toFild").css("display", "block");
  }
});

$("#newCategory").hide();

$("#chooseCategory").change(() => {
  if ($("#chooseCategory").val() === "addNew") {
    $("#newCategory").show();
  } else {
    $("#newCategory").hide();
  }
});

$("#newCatBtn").click(() => {
  if ($("#newCatInput").val() === "") {
    alert("Please insert a Name for a new Category");
  }

  const newCategory = $("#newCatInput").val();
  $.ajax({
    method: "post",
    url: "http://localhost:3000/categories",
    data: JSON.stringify({ newCategory }),
    dataType: "json",
    contentType: "application/JSON",
  }).done((data) => {
    $("#chooseCategory").prepend(
      `<option value=${data.name}>${data.name}</option>`
    );
    $("#newCategory").hide();
    $(newCategory).val("");
  });
});
const categories = [];
$.ajax({
  method: "get",
  url: "http://localhost:3000/categories",
  dataType: "json",
  contentType: "application/JSON",
}).done((data) => {
  data.forEach((category) => {
    categories.push(category);
    $("#chooseCategory").prepend(
      `<option value=${category.name}>${category.name}</option>`
    );
  });
});
