import transactions from "../../src/transactions";

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
              username:"",
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
          $(".accountWrapper").append(`<option>${inValue}</option>`)
        });
      });
      
      
      $.ajax({
        method: 'get',
        url: 'http://localhost:3000/transactions',
        dataType: 'json',
      }).done((data) => {
        console.log('data ajax get', data);
      });  

      $('#newTransaction').on('submit', (e) => {
        e.preventDefault()
        console.log("clicked")
        const amountVal = $("#amountVal").val();
        // const descVal = $("#descVal").val();

        // const newDescription = {username:inValue};
        const newTransaction = {
            amountVal,
            accountId:"", // account ID for Deposits or Withdraws
            accountIdFrom:"", // sender ID if type = 'Transfer', otherwise null
            accountIdTo:"" // receiver ID if type = 'Transfer', otherwise null
            // all info from form
          }
        }),
        
        $.ajax({
          method: 'post',
          url: 'http://localhost:3000/transaction',
          data: JSON.stringify({newTransaction}),
          dataType: 'json',
          contentType: 'application/json'
        }).done((data) => {
          console.log('data ajax post', data);
          forEach(newTransaction => {
            newAccount[1].push(newTransaction)
          });
        });
      });

      


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
        $("#chooseCategory").prepend(`<option>${data.name}</option>`);
        $("#newCategory").hide();
        $(newCategory).val("")
      })

      });




    

