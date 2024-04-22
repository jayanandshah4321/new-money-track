document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the values of email and password fields
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Here you can add your validation logic and further processing
      console.log('Email:', email);
      console.log('Password:', password);
  
      
    });
  });
  