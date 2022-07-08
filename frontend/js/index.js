// import transactions from "../../src/transactions";

users = []

$(() => {
  //Start coding here!
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
  }).done((data) => {
    console.log('data ajax get', data);
    data.forEach(accounts => {
      const newAccount = new Account (  
        accounts.username,
        accounts.id
      ) 
      $(".accountWrapper").append(`<option value = ${accounts.id}>${accounts.username}</option>`)
      users.push(newAccount)
        
    });
  });  
  
    $('#newAccount').on('submit', (e) => {
      e.preventDefault()
      console.log('clicked') 
        const inValue = $("#accountInput").val();
        if (inValue === "") {
          alert("insert value")
          return
        }
        // const inValue = $("[name=accountName]").val()
        let exist = false
        console.log(users);
        for (let i = 0; i < users.length; i++ ) {
          console.log(users[i].username);
          if (users[i].username === inValue) {
            exist = true
          }
        }
        if (exist) {
          alert("The user already exist")
          return
        }
        

        const newAccount = {
              username: inValue,
              transactions:[]
            };

        $.ajax({
          method: 'post',
          data: JSON.stringify({newAccount}),
          url: 'http://localhost:3000/accounts',
          dataType: 'json',
          contentType: 'application/json'
        }).done((data) => {
          console.log('data ajax post', data);
          $(".accountWrapper").append(`<option value = ${data.id}>${data.username}</option>`)
        });
      });
      

      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/transactions',
        dataType: 'json',
      }).done((data) => {
        console.log('data ajax get Trans', data);
        data.forEach(transaction => { 
          transaction.forEach(transDetails => {
            let username = ""
            for (let i = 0; i < users.length; i++) {
              if (users[i].id == transDetails.accountId) {
                username = users[i].username
              }
            }
            $(".tableData").append(`
          <tr>
            <td class="idWrap">${transDetails.id}</td>
            <td class="usernameWrap">${username}</td>
            <td class="transWrap"></td>
            <td class="catWrap">${transDetails.category}</td>
            <td class="descWrap">${transDetails.descripcion}</td>  
            <td class="amountWrap">${transDetails.amountVal}</td>
            <td class="fromWrap">${transDetails.accountIdFrom}</td>
            <td class="toWrap">${transDetails.accountIdTo}</td>
          </tr>
          `)
          })
        })
      });  
    })

      $('#newTransaction').on('submit', (e) => {
        e.preventDefault()
        console.log("#accChangeId") 
        // const descVal = $("#descVal").val();
        // const newDescription = {username:inValue};
        const newTransaction = {
            category: $("#chooseCategory").val(),
            // transType: $("").val(),
            descripcion: $("#descVal").val(),
            amountVal: $("#amountVal").val(),
            accountId: $("#accChangeId").val(),// account ID for Deposits or Withdraws
            accountIdFrom:$("#fromId").val(), // sender ID if type = 'Transfer', otherwise null
            accountIdTo:$("#toId").val() // receiver ID if type = 'Transfer', otherwise null
            // all info from form
          }
          console.log("new transaction",newTransaction)

          $.ajax({
            method: 'post',
            url: 'http://localhost:3000/transaction',
            data: JSON.stringify({newTransaction}),
            dataType: 'json',
            contentType: 'application/json'
          }).done((data) => {
            console.log('data transactions ajax post', data);
            data.forEach(transaction => {
              let username = ""
              for (let i = 0; i < users.length; i++) {
                if (users[i].id == transaction.accountId) {
                  username = users[i].username
                }
              }
              $(".tableData").append(`
              <tr>
                <td class="idWrap">${transaction.id}</td>
                <td class="usernameWrap">${username}</td>
                <td class="transWrap"></td></td>
                <td class="catWrap">${transaction.category}</td>
                <td class="descWrap">${transaction.descripcion}</td>  
                <td class="amountWrap">${transaction.amountVal}</td>
                <td class="fromWrap">${transaction.accountIdFrom}</td>
                <td class="toWrap">${transaction.accountIdTo}</td>
              </tr>
              `)
              for (let i = 0; i < users.length; i++) {
                if (users[i].id == transaction.accountId) {
                  users[i].transactions.push(transaction)
                } 
              }
            });
            console.log(users)
          });
        });
        

      
        $("#filterAcc").on("change", (e) => {
          e.preventDefault();
          const filterAcc =  $("#filterAcc  ").val()
          console.log(filterAcc)
        })
      


      $("[name=radioValue]").change(() => {
        if($("[name=radioValue]:checked").val() === "deposit" || $("[name=radioValue]:checked").val() === "withdraw"){
          $("#fromFild").css("display", "none");
          $("#toFild").css("display", "none");
          $("#account").css("display", "block");
        }else{
          $("#account").css("display", "none");
          $("#fromFild").css("display", "block");
          $("#toFild").css("display", "block");
        }
      });

      $("#newCategory").hide();

      $("#chooseCategory").change(() => {
        if($('#chooseCategory').val() === "addNew"){
          $("#newCategory").show();
        }else{
          $("#newCategory").hide();
        }
      });

      $("#newCatBtn").click(() =>{
        if($("#newCatInput").val() === ""){
          alert("Please insert a Name for a new Category")
      }//else{
      //   $("#newCategory").hide();
      // }

     const newCategory = $('#newCatInput').val()
      $.ajax({
        method: 'post',
        url: 'http://localhost:3000/categories',
        data: JSON.stringify({newCategory}),
        dataType: 'json',
        contentType: 'application/JSON',
      }).done((data) => {
        $("#chooseCategory").prepend(`<option value=${data.name}>${data.name}</option>`);
        $("#newCategory").hide();
        $(newCategory).val("")
      })

      });


      $('#newTransaction').on('submit', (e) => {
        e.preventDefault()
        console.log("clicked")

        if($('#amountVal').val() <= 0) {
          alert("Chosse a value")
          return false
        }
        if(!$("[name=radioValue]:checked")) {
          alert("Chosse a value")
          return false
        }
        if($("[name=radioValue]:checked").val() === "transfer" ){
          if($("#fromId").val() === "" || $("#toId").val() === "")
          if($("#fromId").val() === $("#toId").val())
          return false
        }

        // if($("[name=radioValue]:checked").val() === "transfer" || $("[name=radioValue]:checked").val() === "withdraw"){

        // }

      });


    

