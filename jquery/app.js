define(['jquery'], function($) {
  $( document ).ready(function() {

    // partners
    // adding partner
    var add_partner = function(e) {
      var line = $( this ).parent();
      var cloned = line.clone();
      cloned.find('.add').on('click', add_partner);
      line.after(cloned);
    };
    $('.partner-line .add').on('click', add_partner);

    // apartments
    var Apartment = function(optionName, object, number, axes, areas) {
      this.optionName = optionName;
      this.object = object;
      this.number = number;
      this.axes = axes;
      this.areas = areas;
      this.choose = function() {
        $('#property-object').text(this.object);
        $('#property-number').text(this.number);
        $('#property-axes').text(this.axes);
        $('#room1').text(this.areas.room1);
        $('#room2').text(this.areas.room2);
        $('#room3').text(this.areas.room3);
        $('#kitchen').text(this.areas.kitchen);
        $('#hall').text(this.areas.hall);
        $('#bathroom').text(this.areas.bathroom);
        $('#balcony').text(this.areas.balcony);
      };
      this.createOption = function() {
        return $(
          '<option name="' + apartments[i].object + '">'
          + apartments[i].optionName
          + '</option>'
        );
      }
    }
    var apartments = [
      new Apartment('option1', 'O1', 'N1', 'A1', {
        room1: 20,
        room2: 20,
        room3: 0,
        kitchen: 10,
        hall: 10,
        bathroom: 10,
        balcony: 5
      })
    ];

    // init options
    for (var i = 0; i < apartments.length; ++i) {
      $( '.apartments' ).append(apartments[i].createOption());
    }
    apartments[0].choose();

    var apartments_node = $( '.apartments' );
    apartments_node.on('change', function(e) {
      apartments.find(function(e) {
        return e.object == $( this ).val();
      }).choose();
    });

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