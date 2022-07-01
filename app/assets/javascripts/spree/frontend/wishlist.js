alert(1)
  Spree.ready(function($) {
    $('#new_wished_product').on('submit', function() {
      var cart_quantity, selected_variant_id;
      selected_variant_id = $('#product-variants input[type=radio]:checked').val();
      if (selected_variant_id) {
        $('#wished_product_variant_id').val(selected_variant_id);
      }
      cart_quantity = $('#quantity').val();
      if (cart_quantity) {
        return $('#wished_product_quantity').val(cart_quantity);
      }
    });
    $('form#change_wishlist_accessibility').on('submit', function() {
      $.post($(this).prop('action'), $(this).serialize(), null, 'script');
      return false;
    });


    console.log( $('button.shopping-cart-item-quantity-increase-btn'))
    $('input.shopping-cart-item-quantity-input').on('change', function(e) {
      var formUpdateCart = $(this).parents('form')
      formUpdateCart.submit()
    })
    $('button.shopping-cart-item-quantity-decrease-btn').off('click').on('click', function() {
     
      var itemId = $(this).attr('data-id')
     
      var input = $("input[data-id='" + itemId + "']")
      var inputValue = parseInt($(input).val(), 10)
      var formUpdateCart = $(this).parents('form')
      if (inputValue > 1) {
        $(input).val(inputValue - 1)
        formUpdateCart.submit()
      }
    })
    $('button.shopping-cart-item-quantity-increase-btn').on('click', function() {
      var itemId = $(this).attr('data-id')
      console.log(itemId)
      var input = $("input[data-id='" + itemId + "']")
      var inputValue = parseInt($(input).val(), 10)
      var formUpdateCart = $(this).parents('form')
      $(input).val(inputValue + 1)
      formUpdateCart.submit()
    })




    return $('form#change_wishlist_accessibility input[type=radio]').on('click', function() {
      return $(this).parent().submit();
    });
  });

