
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




    });  

