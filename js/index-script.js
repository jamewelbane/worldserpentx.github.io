$(document).ready(function() {
    $('#contactForm').on('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Show the loading spinner and blur the background
      $('.loading-spinner').show();
      $('body').addClass('loading');
      $('.contact').addClass('blurred'); // Apply blur to the entire body

      var formData = $(this).serialize();

      $.ajax({
        url: 'handler/contact_handler.php', // Point to the new PHP file
        method: 'POST',
        data: formData,
        dataType: 'json',
        success: function(response) {
          console.log('Success response:', response); // Log the success response
          $('.loading-spinner').hide();
          $('body').removeClass('loading');
          $('.contact').removeClass('blurred');

          if (response.status === 'success') {
            Swal.fire({
              icon: 'success',
              title: 'Email sent successfully',
              text: response.message
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Failed to send email',
              text: response.message
            });
          }
        },
        error: function(jqXHR) {
          console.log('Error response:', jqXHR); // Log the error response
          $('.loading-spinner').hide();
          $('body').removeClass('loading');
          $('.contact').removeClass('blurred');

          let errorMessage = 'There was an error sending your email. Please try again later.';
          if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
            errorMessage = jqXHR.responseJSON.message;
          }

          Swal.fire({
            icon: 'error',
            title: 'Failed to send email',
            text: errorMessage
          });
        }
      });





    });
  });





// preload

window.addEventListener('DOMContentLoaded', function() {
    var preloader = document.getElementById('preloader');

    // Immediately disable scrolling
    document.body.classList.add('loading');
    document.documentElement.classList.add('loading');

    // Show preloader
    preloader.style.opacity = '1';
  });

  window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');

    setTimeout(function() {
      preloader.style.opacity = '0';
      setTimeout(function() {
        preloader.style.display = 'none';

        // Re-enable scrolling
        document.body.classList.remove('loading');
        document.documentElement.classList.remove('loading');
      }, 500);
    }, 500);
  });