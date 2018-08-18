define(['jquery'], function($) {
  $( document ).ready(function() {

    // partners
    var Partner = function(name, phone) {
      var phone_regexp = /^\+7[1-9]{10}$/;

      this.name = name;
      this.phone = phone.trim().replace(/\s/g, '');

      this.nameIsValid = function() {
        return this.name != '';
      };
      this.phoneIsValid = function() {
        return this.phone != '' && phone_regexp.test(this.phone);
      }
    };
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
        var areas_sum = 0;
        var areas = this.areas;
        for (var key in areas) {
          if (areas.hasOwnProperty(key)) {
            areas_sum += areas[key];
          }
        }
        $( '#apartment-object' ).text(this.object);
        $( '#apartment-number' ).text(this.number);
        $( '#apartment-axes' ).text(this.axes);
        $( '#apartment-area' ).text(areas_sum);
        $( '#room1' ).text(this.areas.room1);
        $( '#room2' ).text(this.areas.room2);
        $( '#room3' ).text(this.areas.room3);
        $( '#kitchen' ).text(this.areas.kitchen);
        $( '#hall' ).text(this.areas.hall);
        $( '#bathroom' ).text(this.areas.bathroom);
        $( '#balcony' ).text(this.areas.balcony);
      };
      this.createOption = function() {
        return $( '<option>' + this.optionName + '</option>' );
      };
    };
    var apartments = [
      new Apartment('option1', 'O1', 'N1', 'A1', {
        room1: 20,
        room2: 20,
        room3: 0,
        kitchen: 10,
        hall: 10,
        bathroom: 10,
        balcony: 5
      }),
      new Apartment('option2', 'O2', 'N2', 'A2', {
        room1: 10,
        room2: 10,
        room3: 10,
        kitchen: 15,
        hall: 10,
        bathroom: 10,
        balcony: 5
      })
    ];

    // init options
    for (var i = 0; i < apartments.length; ++i) {
      $( '#apartments' ).append(apartments[i].createOption());
    }
    apartments[0].choose();

    $( '#apartments' ).on('change', function(e) {
      apartments.find(function(e) {
        return e.optionName == $( '#apartments' ).val();
      }).choose();
    });

    // hide-show description area
    $( '#apartment-area' ).parent().on('click', function(e) {
      $( this ).next().toggle();
    });

    // sending
    var send_callback = function(e) {
      // validation
      var isValid = true;
      var partners_callback = function(i, e) {
        var name = $( this ).find( '.name' );
        var phone = $( this ).find( '.phone' );
        var partner = new Partner(name.val(), phone.val());

        if (!partner.nameIsValid()) {
          isValid = false;
          name.addClass('error');
        } else {
          name.removeClass('error');
        }
        if (!partner.phoneIsValid()) {
          isValid = false;
          phone.addClass('error');
        } else {
          phone.removeClass('error');
        }
      };
      $( '.partner-line' ).each(partners_callback);

      if (isValid) {
        // collecting data
        var data = {
          partners: [],
          apartment: apartments.find(function(e) {
            return e.optionName === $( '#apartments' ).val();
          })
        };
        $( '.partner-line' ).each(function(i, e) {
          data.partners.push(new Partner(
            $( this ).find( '.name' ).val(),
            $( this ).find( '.phone' ).val()
          ));
        });

        // request
        $.post('random/post/request/', JSON.parse(JSON.stringify(data)))
          .done(function(data) { alert(data); })
          .fail(function() { alert('fail'); });
      }
    };
    $( '#send' ).on('click', send_callback);

    // loading
    $( '#load' ).on('click', function(e) {
      console.log(e.currentTarget);
    });
  });
});
