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
        

        const newAccount = {username:inValue};
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



      $("[name=radioValue]").change(() => {
        console.log($("[name=radioValue]:checked".val())) ;
        if($("[name=radioValue]:checked").val() === "deposit" || $("[name=radioValue]:checked").val() === "withdraw"){
          $("#fromFild").css("display", "none");
          $("#toFild").css("display", "none");
          $("#account").css("display", "block");
        }else{
          $("#account").css("display", "none");
          $("#fromFild").css("display", "block");
          $("#toFild").css("display", "block");
        }
      })

    });  

