import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

return (
  <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
    <h1>AVELLIN</h1>
    <p>Welcome to your marketplace</p>

    <section>
      <h2>Status</h2>
      <p>Backend connected successfully</p>
    </section>
  </div>
);
}

export default App;