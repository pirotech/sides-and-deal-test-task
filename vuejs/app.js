define(['Vue'], function(Vue) {
  var app = new Vue({
    el: '#deal',
    data: {
      partners: [
        {
          name: 'John',
          phone: '+7 999 666 77 55'
        }
      ],
      apartments: [
        {
          name: 'apartment1',
          object: 'O1',
          number: 'N1',
          axes: 'A1',
          areas: {
            room1: 20,
            room2: 20,
            room3: 10,
            kitchen: 10,
            hall: 10,
            bathroom: 10,
            balcony: 10
          }
        },
        {
          name: 'apartment2',
          object: 'O2',
          number: 'N2',
          axes: 'A2',
          areas: {
            room1: 10,
            room2: 10,
            room3: 20,
            kitchen: 10,
            hall: 10,
            bathroom: 10,
            balcony: 10
          }
        }
      ],
      current_apartment_name: 'apartment1',
      current_apartment: {},
      show_description_area: true
    },
    methods: {
      double_partner: function(from) {
        this.partners.push({
          name: from.name,
          phone: from.phone
        });
      },
      change_apartment: function() {},
      toggle_description_area: function() {},
      send: function() {},
      load: function() {},
    },
    computed: {
      summary_current_apartment_area: function() {
        // var areas = this.current_apartment.areas;
        // var summary = areas.room1 + areas.room2 + areas.room3
        //   + areas.kitchen + areas.hall + areas.bathroom
        //   + areas.balcony;
        // return summary;
        return 100;
      }
    }
  });
});
