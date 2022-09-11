import { useEffect, useState } from 'react';
import axios from 'axios';
import './cardStyle.css';

const Card = () => {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    // curl -X POST "https://libretranslate.de/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=hello&source=en&target=es&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      setOutput(res.data.translatedText)
    })
  };

  useEffect(() => {
    //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        setOptions(res.data);
      });
  }, []);

  return (
    <div className="App">
      <div className='textarea-container'>
        <div>
          <div>
            From ({from}) :
            <select onChange={(e) => setFrom(e.target.value)}>
              {options.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            cols="50"
            rows="8"
            onInput={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <div>
            To ({to}) :
            <select onChange={(e) => setTo(e.target.value)}>
              {options.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            cols="50"
            rows="8"
            value={output}
          />
        </div>
      </div>
      <div>
        <button
          className='button'
          onClick={e => translate()}
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default Card;
