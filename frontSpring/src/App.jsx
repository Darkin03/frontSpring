import './App.css'

function App() {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/crud/v1/producto/delete/2`, {
      method: 'DELETE',
      headers: {
      'Authorization': 'Basic ' + btoa('user:password') // Replace 'username' and 'password' with your actual credentials
      }
    })
    .then(response => console.log(response))
    
  
  }

  return (
  <section>
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder="Enter your name" />
    <button type="submit">Submit</button>
    </form>
  </section>
  )
}

export default App
