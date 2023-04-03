$(document).ready(function() {
  // Smooth scroll
  $('.nav-link, .btn').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Navbar scroll background
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#navbar').addClass('bg-nav');
    } else {
      $('#navbar').removeClass('bg-nav');
    }
  });

  // Contact form validation
  $('#submit-form').submit(function(e) {
    e.preventDefault();
    $('.is-invalid').removeClass('is-invalid');
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();
    var formValid = true;

    // Validate name field
    if (name.length < 2) {
      $('#name').addClass('is-invalid');
      formValid = false;
    }

    // Validate email field
    if (!email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
      $('#email').addClass('is-invalid');
      formValid = false;
    }

    // Validate subject field
    if (subject.length < 2) {
      $('#subject').addClass('is-invalid');
      formValid = false;
    }

    // Validate message field
    if (message.length < 10) {
      $('#message').addClass('is-invalid');
      formValid = false;
    }

    // If form is valid, submit form
    if (formValid) {
      $.ajax({
        type: 'POST',
        url: 'form-process.php',
        data: $('#submit-form').serialize(),
        success: function() {
          $('#success-message').show();
          $('#submit-form').trigger('reset');
        }
      });
    }
  });
});
