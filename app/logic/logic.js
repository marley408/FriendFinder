
$(document).ready(function(){
// Chosen CSS
var config = {
  ".chosen-select": {},
  ".chosen-select-deselect": {
    allow_single_deselect: true
  },
  ".chosen-select-no-single": {
    disable_search_threshold: 10
  },
  ".chosen-select-no-results": {
    no_results_text: "Oops, nothing found!"
  },
  ".chosen-select-width": {
    width: "95%"
  }
};

for (var selector in config) {
  $(selector).chosen(config[selector]);
}


//handle form submit 
$('#submit').on('click', function(){
  event.preventDefault()

  //validate form
  function validate(){
    var isValid = true

    $('.form-control').each(function(){
      if ($(this).val() === ""){
        isValid = false
      }
    })

    $('.form-select').each(function(){
      if ($(this).val() === ""){
        isValid = false
      }
    })
    return isValid
  }

  // if all required fields are filled, collect form data
  if (validate()){
    
    //grab new user data
    var newFriend = {
      name: $('#name').val().trim(),
      photo: $('#photo').val().trim(),
      scores: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    }

    $.post("/api/friends", newFriend, function(data){ // $.post is alias for $.ajax method and post
  
      $('#match-name').text(data.matchName)
      $('#match-img').attr("src", data.matchImg)
  
      $("#results-modal").modal("toggle");
  
  
    })
  } else {
    alert("Please fill out all fields before submitting!");
  }


})




});

