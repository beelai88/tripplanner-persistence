$(document).ready(function(){

    var daysArray = [];

    var hotelsArray = [];
    var restaurantsArray = [];
    var activitiesArray = [];
      
     var dayTemplate = `
      <section class="day">
        <div>
          <h4>My Hotel</h4>
          <ul class="list-group trip-day-hotels">
          </ul>
        </div>
        <div>
          <h4>My Restaurants</h4>
          <ul class="list-group trip-day-restaurants">
          </ul>
        </div>
        <div>
          <h4>My Activities</h4>
          <ul class="list-group trip-day-activities">
          </ul>
        </div>            
      </section>
    `  
    //load hotel options
    $.get('/api/hotels', function (hotels) {
      hotelsArray = hotels;
      hotels.forEach(function(hotel){
        $('#hotel-choices').append(`<option value="${hotel.name}">${hotel.name}</option>`)
      });
    })
    .fail( console.error.bind(console) );
    //load restaurant options
    $.get('/api/restaurants', function (restaurants) {
      restaurantsArray = restaurants;
      restaurants.forEach(function(restaurant){
        $('#restaurant-choices').append(`<option value="${restaurant.name}">${restaurant.name}</option>`)
      });
    })
    .fail( console.error.bind(console) );
    //load activity options
    $.get('/api/activities', function (activities) {
      activitiesArray = activities;
      activities.forEach(function(activity){
        $('#activity-choices').append(`<option value="${activity.name}">${activity.name}</option>`)
      });
    })
    .fail( console.error.bind(console) );

    //autocreate day 1 upon page refresh
    $.post('/api/days', { number: 1 }, function(){
    })
    // .fail( console.error.bind(console) );

    //autocreate all days that are in the database
    $.get('/api/days', function(days) {

      daysArray = days; 
      console.log(daysArray);
      days.forEach(function(day){
        var existingDay = $(dayTemplate);
        $('#itinerary').append(existingDay);
        var button = $(`<button class="btn btn-circle day-btn" data-day=${day.number}>${day.number}</button>`);
        $('#day-add').before(button); 
        $('button[data-day="1"]').addClass('current-day');
      })

    })

    //add a day using the add-day btn 
    $('#day-add').click(function(){
      var lastIndex = $('section.day').last().data('index')
      var ourIndex = lastIndex + 1
      $.post('/api/days', { number: ourIndex }, function(){
        console.log('day created')
      })
      .fail( console.error.bind(console) );

        var day = $(dayTemplate)

        // Set the index on the section we're adding
        day[0].dataset.index = ourIndex
        
        // 2. Append it to the #itinerary
        $('#itinerary').append(day)
        
        // 3. Unselect all days
        $('.day').removeClass('selected')

        // 3a. select the one we just appended.
        $('#itinerary > .day').last().addClass('selected')

        // Create a button with the right number
        var button = $(`<button class="btn btn-circle day-btn current-day" data-day=${ourIndex}>${ourIndex}</button>`)
        $(this).before(button)
        
        // 5. Deselect all day buttons
        $('.day-buttons > button').removeClass('current-day')
        
        // 6. Select the one we just added
        button.addClass('current-day')      
    })

    //switching days 
    $('.day-buttons').on('click', 'button[data-day]', function(event) {
      // Deselect all buttons
      $('.day-buttons > button').removeClass('current-day')

      // Select the button that was clicked
      $(this).addClass('current-day')
      var num = Number($(this).text());

      var dayId;
      for (var i = 0; i < daysArray.length; i++) {
        if (daysArray[i].number === num) {
          dayId = daysArray[i].id;
          break; 
        }
      }

      $.get(`/api/days/${dayId}`, function(day){
        console.log('day', day);
      })

    })

    //adding NEW ATTRACTIONS TO SPECIFIC DAY
    $(document.body).on('click', 'button[data-action="addSelectionToTrip"]', function() {
      var selectedHotel = $(this).closest('div').find('option:selected').val();
      var hotelId; 
      for (var i = 0; i < hotelsArray.length; i++) {
        if (hotelsArray[i].name === selectedHotel) {
          hotelId = hotelsArray[i].id;
          break;
        }
      }  

      var dayId = Number($('.current-day').text());
      console.log('HERE IS DAYID', dayId);

      $.post(`/api/days/${dayId}/hotel`, {hotelId}, function(){
        console.log('hello...');
      })    

    });    



})