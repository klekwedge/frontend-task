function App() {
  const fetchCatFact = async () => {
    const response = await fetch('https://catfact.ninja/fact');
    const data = await response.json();
    return data.fact;
  };

  const fetchAge = async (name: string) => {
    const response = await fetch(`https://api.agify.io/?name=${name}`);
    const data = await response.json();
    return data.age;
  };

  return <div>Hello</div>;
}

export default App;
