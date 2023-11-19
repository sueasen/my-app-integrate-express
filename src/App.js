import { useState } from 'react';

function App() {
  const [sample1, setSample1] = useState('');
  const [sample2, setSample2] = useState('');

  const getApiSample1 = async () => {
    const json = await (await fetch('/api/sample1')).json();
    setSample1(json.sample);
  };

  const getApiSample2 = async () => {
    const json = await (await fetch('/api/sample2')).json();
    setSample2(json.sample);
  };

  return (
    <>
      <button onClick={getApiSample1}>get api sample1</button>
      <p>{sample1}</p>
      <button onClick={getApiSample2}>get api sample2</button>
      <p>{sample2}</p>
    </>
  );
}

export default App;
