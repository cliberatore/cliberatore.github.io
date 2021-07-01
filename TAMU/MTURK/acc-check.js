//The magic that lets us find the unselected questions

$(document).ready(function() {
  $('#submitButton').click(check_buttons);
});

var check_buttons = function(){
  //Get all the radio buttons
  n_ckd = $('input[type=radio]:not(:checked)').toArray().reduce((acc,val) => acc.includes(val.name) ? acc : acc.concat(val.name),[]);

  //Get all the checked buttons
  ckd   = $('input[type=radio]:checked').toArray().reduce((acc,val) => acc.includes(val.name) ? acc : acc.concat(val.name),[]);

  //Filter out all the checked radio buttons from the not checked list
  //We should get NOTHING if we've filled in every option
  var unfilled = n_ckd.filter(function(x) { return !ckd.includes(x) });

  if(unfilled.length > 0){
    alert("You have not rated your confidence for one or more of the questions.\nThe first one missing an answer is: " + unfilled[0].substring(5,8));
    var any_unfilled = true;
  }
  else {
    var any_unfilled = false;
  }

  var unselected = $('select.overall').toArray().filter(function(x) { return x.value==0 })

  if(unselected.length > 0){
    alert("You have not rated 'Same or different?' for one or more of the questions.\nThe first one missing an answer is: " + unselected[0].name.substring(5,8))
  }

  return !any_unfilled && !(unselected.length)
}
