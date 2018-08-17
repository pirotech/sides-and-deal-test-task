define(['jquery'], function($) {
  $( document ).ready(function() {

    //data
    var data = {
      type1: {
        object: 'O1',
        number: 'N1',
        axes: 'A1',
        room1: 20,
        room2: 20,
        room3: 0,
        kitchen: 10,
        hall: 10,
        bathroom: 10,
        balcony: 5
      },
      type2: {
        object: 'O2',
        number: 'N2',
        axes: 'A2',
        room1: 30,
        room2: 20,
        room3: 15,
        kitchen: 15,
        hall: 10,
        bathroom: 10,
        balcony: 5
      },
      type3: {
        object: 'O3',
        number: 'N3',
        axes: 'A3',
        room1: 30,
        room2: 20,
        room3: 15,
        kitchen: 15,
        hall: 10,
        bathroom: 10,
        balcony: 5
      }
    };


    // adding partner
    var add_partner = $('.partner-line .add');
    var add_partner_func = function(e) {
      var line = $( this ).parent();
      var cloned = line.clone();
      cloned.find('.add').on('click', add_partner_func);
      line.after(cloned);
    };
    add_partner.on('click', add_partner_func);

    // changing property type
    var property_type = $('.property-type');
    var change_property_type = function(name) {
      global data;
      var property = data[name];
      $('#property-object').text(property.object);
      $('#property-number').text(property.number);
      $('#property-axes').text(property.axes);
      $('#room1').text(property.room1);
      $('#room2').text(property.room2);
      $('#room3').text(property.room3);
      $('#kitchen').text(property.kitchen);
      $('#hall').text(property.hall);
      $('#bathroom').text(property.bathroom);
      $('#balcony').text(property.balcony);
    };
    property_type.on('change', function(e) {
      change_property_type($( this ).val());
    });
    change_property_type(property_type.val());

    // hide-show description area
    var area = $('#property-area');
    area.parent().on('click', function(e) {
      $( this ).next().toggle();
    });

    // sending
    var send = $('#send');
    var name = $('.partner-line .name');
    var phone = $('.partner-line .phone');
    send.on('click', function(e) {
      // validation
      if (name.val() === '') {
        name.addClass('error');
      } else {
        name.removeClass('error');
      }
      var phone_regex = /(\+7)|8\d{7}/;
      if (phone.val() === '' || !phone_regex.test(phone.val())) {
        phone.addClass('error');
      } else {
        phone.removeClass('error');
      }

      // collecting data
      var a = {
        partners: [],
        property_type: property_type,
        property: data[property_type.val()]
      };
      $( '.partner-line' ).each(function(i, e) {
        a.partners.push({
          name: e.find('.name').val(),
          phone: e.find('.phone').val()
        });
      });
      console.log(a);

      // request
      $.post('random/post/request/', a)
      .done(function() {
        alert('done');
      })
      .fail(function() {
        alert('fail');
      });
    });

    // loading
    var load = $('#load');
    load.on('click', function(e) {
      console.log(e.currentTarget);
    });
  });
});
