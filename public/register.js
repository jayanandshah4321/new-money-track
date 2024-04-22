<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.1/axios.min.js"></script>


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
  
    form.addEventListener('submit',  async(event)=> {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the values of username, email, password, and confirmPassword fields
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      // Perform validation
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      try {
    await axios.post("http://localhost:5000/register",{email,username,password}).then((res)=>{
        if(res.data.message === 'success') console.alert("Success");
    })
      } catch (error) {
        
      }
      
    });
  });
  