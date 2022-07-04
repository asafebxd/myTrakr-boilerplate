users = []

$(() => {
  //Start coding here!
    $('#newAccount').on('submit', (e) => {
      e.preventDefault()
      console.log('clicked') 
        const inValue = $("#accountInput").val();
        // const inValue = $("[name=accountName]").val()
        let isExisting = false 
        for (let i = 0; i < user.lenght; i++ ) {
          if (i === inValue) {
            let isExisting = true
            alert("The user already exist")
          }
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
        });
      });
    });  

