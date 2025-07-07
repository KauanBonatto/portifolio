
// Portfolio JavaScript - JS + jQuery
$(document).ready(function() {
    
    // Mobile Navigation Toggle
    $('#nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('#nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').click(function() {
        $('#nav-toggle').removeClass('active');
        $('#nav-menu').removeClass('active');
    });

    // Smooth scrolling for navigation links
    $('.nav-link, .scroll-down a, .hero-buttons a').click(function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Active navigation link on scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function() {
            if ($(this).position().top - 100 <= scrollDistance) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    // Typewriter effect for hero title
    var typewriterText = "Kauan Bonatto";
    var typewriterSpeed = 100;
    var i = 0;
    
    function typeWriter() {
        if (i < typewriterText.length) {
            $('#typewriter').text($('#typewriter').text() + typewriterText.charAt(i));
            i++;
            setTimeout(typeWriter, typewriterSpeed);
        }
    }

    // Animated counters
    function animateCounters() {
      $('.stat-number').each(function() {
          var $this = $(this);
          var target = parseInt($this.data('target'));
          var current = 0;
          var increment = target / 50;
          
          var timer = setInterval(function() {
              current += increment;
              if (current >= target) {
                  current = target;
                  clearInterval(timer);
              }
              $this.text(Math.floor(current));
          }, 40);
      });
  }
    
    // Start typewriter and animated counters effect after a delay
    setTimeout(function() {
        $('#typewriter').text('');
        typeWriter();
        animateCounters();
    }, 500);

    // Animate skill bars when about section is visible
    function animateSkills() {
        $('.skill-progress').each(function() {
            var $this = $(this);
            var width = $this.data('width');
            $this.animate({
                width: width + '%'
            }, 1500);
        });
    }

    function checkSkills() {
        var aboutTop = $('#about').offset().top;
        var scrollTop = $(window).scrollTop() + $(window).height();
        
        if (scrollTop > aboutTop + 200) {
            animateSkills();
            $(window).off('scroll', checkSkills);
        }
    }
    
    $(window).scroll(checkSkills);

    // Project filtering
    $('.filter-btn').click(function() {
        var filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.project-item').fadeIn(300);
        } else {
            $('.project-item').hide();
            $('.project-item[data-category="' + filter + '"]').fadeIn(300);
        }
    });

    // Form validation and submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        var isValid = true;
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        
        // Reset previous errors
        $('.form-group').removeClass('error');
        $('.error-message').hide();
        
        // Validate name
        if (name === '') {
            showError('name', 'Nome é obrigatório');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        }
        
        // Validate email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Email é obrigatório');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Email inválido');
            isValid = false;
        }
        
        // Validate subject
        if (subject === '') {
            showError('subject', 'Assunto é obrigatório');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('message', 'Mensagem é obrigatória');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showToast('Sucesso!', 'Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            
            // Reset form
            this.reset();
            
            // Simulate form submission delay
            $('.btn-primary').text('Enviando...').prop('disabled', true);
            setTimeout(function() {
                $('.btn-primary').html('<span class="btn-text">Enviar Mensagem</span><i class="fas fa-paper-plane btn-icon"></i>').prop('disabled', false);
            }, 2000);
        }
    });
    
    function showError(field, message) {
        $('#' + field).closest('.form-group').addClass('error');
        $('#' + field + '-error').text(message).show();
    }

    // Toast notification system
    function showToast(title, message, type) {
        var toastId = 'toast-' + Date.now();
        var toast = $('<div class="toast ' + (type || '') + '" id="' + toastId + '">' +
            '<div class="toast-header">' +
                '<div class="toast-title">' + title + '</div>' +
                '<button class="toast-close" onclick="closeToast(\'' + toastId + '\')">&times;</button>' +
            '</div>' +
            '<div class="toast-body">' + message + '</div>' +
        '</div>');
        
        $('#toast-container').append(toast);
        
        setTimeout(function() {
            toast.addClass('show');
        }, 100);
        
        setTimeout(function() {
            closeToast(toastId);
        }, 5000);
    }
    
    // Make closeToast available globally
    window.closeToast = function(toastId) {
        var toast = $('#' + toastId);
        toast.removeClass('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    };

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').addClass('visible');
        } else {
            $('#back-to-top').removeClass('visible');
        }
    });
    
    $('#back-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Add fade-in animation to elements on scroll
    function addScrollAnimations() {
        var elements = $('.section-header, .about-text, .skills, .project-item, .contact-info, .contact-form-container');
        
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            elements.each(function() {
                var elementTop = $(this).offset().top;
                
                if (scrollTop + windowHeight > elementTop + 100) {
                    $(this).addClass('fade-in-up');
                }
            });
        });
    }
    
    addScrollAnimations();

    // Initialize animations on page load
    setTimeout(function() {
        $('.hero-content').addClass('fade-in-up');
    }, 200);

    // Real-time form validation
    $('#name').on('input', function() {
        var value = $(this).val().trim();
        var formGroup = $(this).closest('.form-group');
        
        if (value.length >= 2) {
            formGroup.removeClass('error');
            $('#name-error').hide();
        }
    });

    $('#email').on('input', function() {
        var value = $(this).val().trim();
        var formGroup = $(this).closest('.form-group');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(value)) {
            formGroup.removeClass('error');
            $('#email-error').hide();
        }
    });

    $('#subject').on('input', function() {
        var value = $(this).val().trim();
        var formGroup = $(this).closest('.form-group');
        
        if (value.length > 0) {
            formGroup.removeClass('error');
            $('#subject-error').hide();
        }
    });

    $('#message').on('input', function() {
        var value = $(this).val().trim();
        var formGroup = $(this).closest('.form-group');
        
        if (value.length >= 10) {
            formGroup.removeClass('error');
            $('#message-error').hide();
        }
    });
});
