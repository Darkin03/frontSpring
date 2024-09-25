import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [result, setResult] = useState([]);
  const [formData, setFormData] = useState({ name: '', value: '' });

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/product', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setResult(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    console.log(result);
  }, [result]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResult([...result, data]);
        setFormData({ name: '', value: '' });
      })
      .catch(err => console.error('Fetch error:', err));
  };

  return (
    <section>
      <h2>Enter your product!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter value"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <section className="result">
        <h2>Results</h2>
        <ul>
          {result.map((item, index) => (
            <li key={index}>{item.name} - {item.value}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;