define(['Vue', 'axios'], function(Vue, axios) {
  var app = new Vue({
    el: '#main',
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
      show_description_area: true
    },
    methods: {
      partnerNameIsValid: function(name) {
        return name != '';
      },
      partnerPhoneIsValid: function(phone) {
        phone = phone.trim().replace(/\s/g, '');
        var regexp = /^((\+7)|8)[1-9]{10}$/;
        return phone != '' && regexp.test(phone);
      },
      double_partner: function(from) {
        this.partners.push({
          name: from.name,
          phone: from.phone
        });
      },
      toggle_description_area: function() {
        this.show_description_area = !this.show_description_area;
      },
      send: function() {
        // validation
        var isValid = true;

        var partners_count = this.partners.length;
        for (var i = 0; i < partners_count; i++) {
          isValid = isValid && this.partnerNameIsValid(this.partners[i].name)
            && this.partnerPhoneIsValid(this.partners[i].phone);
        }

        if (isValid) {
          // collecting data
          var data = {
            partners: this.partners,
            apartments: this.apartments
          };

          // request
          axios.post('/random/post/request', data).then(function(response) {
            alert(response.data);
          }).catch(function(error) {
            alert(error);
          });
        }
      },
      load: function() {
        var partners_count = Math.round(1 + Math.random() * 4);
        var partners = [];
        for (var i = 0; i < partners_count; i++) {
          partners.push({
            name: 'Alice',
            phone: '+7 999 444 33 22'
          });
        }
        this.partners = partners;
      },
    },
    computed: {
      current_apartment: function() {
        for (var i = 0; i < this.apartments.length; i++) {
          if (this.apartments[i].name == this.current_apartment_name) {
            return this.apartments[i];
          }
        }
        return {};
      },
      summary_current_apartment_area: function() {
        var areas = this.current_apartment.areas;
        var summary = areas.room1 + areas.room2 + areas.room3
          + areas.kitchen + areas.hall + areas.bathroom
          + areas.balcony;
        return summary;
      },
    }
  });
});
