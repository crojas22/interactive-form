$(document).ready(function(){
  const optionOther = $('#other-title')
  optionOther.hide();
  // event listener will make text area toggle between showing and hidding
  $('#title').on('change', function(){
    if($(this).val() === 'other'){
      optionOther.show('slow');
    } else{
      if($(this).val() !== 'other'){
        optionOther.hide('slow');
      }
    }
  });

  // event listener will hide and show items depending on design
  $('#design').on('change',function(){
    // use of slice function to divide the two design section
    let jsPuns = $('#color option').slice(0,3);
    let jsHeart = $('#color option').slice(3,6);
    if($(this).val() === 'js puns'){
      jsHeart.each(function(){
        jsHeart.hide();
      });
      $('option[value=tomato]').removeAttr('selected');
      $('option[value=cornflowerblue]').attr('selected','selected')
      jsPuns.each(function(){
        jsPuns.show();
      })
    } else if($(this).val() === 'heart js'){
      jsHeart.each(function(){
        jsHeart.show();
      });
      $('option[value=cornflowerblue]').removeAttr('selected');
      $('option[value=tomato]').attr('selected','selected');
      jsPuns.each(function(){
        jsPuns.hide();
      });
    }
  })

  // event listener that will check and uncheck if activities are in same time
  const inputList = $('.activities label input')
  inputList.on('change', function(){
    for(let i = 0; i < inputList.length; i++){
      // if and else if statment will make sure without changing html code the right checkbox disables
      if(inputList.eq(i).is(':checked') && inputList.eq(i).attr('name') === 'js-frameworks'){
        $('input[name=express]').attr('disabled','disabled');
      } else if(inputList.eq(i).is(':checked') !== true && inputList.eq(i).attr('name') === 'js-frameworks'){
        $('input[name=express]').removeAttr('disabled');
      } else if(inputList.eq(i).is(':checked') && inputList.eq(i).attr('name') === 'express'){
        $('input[name=js-frameworks]').attr('disabled', 'disabled');
      } else if(inputList.eq(i).is(':checked') !== true && inputList.eq(i).attr('name') === 'express'){
        $('input[name=js-frameworks]').removeAttr('disabled');
      } else if(inputList.eq(i).is(':checked') && inputList.eq(i).attr('name') === 'js-libs'){
        $('input[name=node]').attr('disabled', 'disabled');
      } else if(inputList.eq(i).is(':checked') !== true && inputList.eq(i).attr('name') === 'js-libs'){
        $('input[name=node]').removeAttr('disabled');
      } else if(inputList.eq(i).is(':checked') && inputList.eq(i).attr('name') === 'node'){
        $('input[name=js-libs]').attr('disabled', 'disabled');
      } else if(inputList.eq(i).is(':checked') !== true && inputList.eq(i).attr('name') === 'node'){
        $('input[name=js-libs]').removeAttr('disabled');
      }
    }
  });

  // section will create html elements and show sum of activities
  const totalText = $("<span></span>").text('Total: $');
  const total = $("<span id='total-cost'></span>").text('');
  $(".activities").append(totalText, total);
  $("input[type=checkbox]").change(function(){
      recalculate();
    });
  function recalculate(){
    var sum = 0;
    $("input[type=checkbox]:checked").each(function(){
        // using substr function to get the last 3 digits that happen to be the price of activities
        // and the use of parseInt is to change it to num in order to add it to sum
        sum += parseInt($(this).parent().text().substr(-3));
    });
    $('#total-cost').text(sum)
  }

  // payment section that will hide form of payment, except credit car since its the default
  const paymentOptions = $('#payment option');
  $('#paypal').hide();
  $('#bitcoin').hide();
  $('#payment').on('change', function(){
    if($(this).val() === 'credit card'){
      $('#credit-card').show();
      $('#cc-num').attr('required', 'required')
      $("#zip").attr('required', 'required')
      $('#cvv').attr('required', 'required')
      $('#paypal').hide();
      $('#bitcoin').hide();
    } else if ($(this).val() === 'paypal') {
      $('#credit-card').hide();
      $('#cc-num').removeAttr('required');
      $("#zip").removeAttr('required');
      $('#cvv').removeAttr('required');
      $('#paypal').show();
      $('#bitcoin').hide();
    } else if ($(this).val() === 'bitcoin') {
      $('#credit-card').hide();
      $('#cc-num').removeAttr('required');
      $("#zip").removeAttr('required');
      $('#cvv').removeAttr('required');
      $('#paypal').hide();
      $('#bitcoin').show();
    }
  });

  /*
  section takes care of adding red border of form section that are required
  */
  // name input
  $('#name').on('change', function(){
    if ($(this).val().length >= 2){
      $(this).removeClass('required');
    } else {
      $(this).addClass('required');
    }
  });
  // email input
  $('#mail').on('change', function(){
    // test function will make sure it has correct email format
    if (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val())){
      $(this).removeClass('required');
    } else {
      $(this).addClass('required');
    };
  });

  // will check that at least one of checkboxes are checked
  inputList.on('change', function(){
    inputList.each(function(){
      if (inputList.is(':checked')){
        inputList.removeClass('required');
        inputList.removeAttr('required');
      } else {
        inputList.addClass('required');
        inputList.attr('required', 'required')
      }
    })
  })

  // event listener will check if cc number has 13 to 16 digits
  $('#cc-num').on('change', function(){
    if ($(this).val().length >= 13 && $(this).val().length <= 16 && $.isNumeric($(this).val())){
      $(this).removeClass('required');
    } else {
      $(this).addClass('required');
    }
  })

  // will check zip code has correct length and is numeric
  $("#zip").on('change', function(){
    if ($(this).val().length === 5 && $.isNumeric($(this).val())){
      $(this).removeClass('required');
    } else {
      $(this).addClass('required');
    }
  })

  // will check cvv has correct length and is numeric
  $('#cvv').on('change', function(){
    if ($(this).val().length === 3 && $.isNumeric($(this).val())){
      $(this).removeClass('required');
    } else {
      $(this).addClass('required');
    }
  })
})
