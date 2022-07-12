import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Calendar from './components/Calendar';
import { useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { DateTime } from 'luxon';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [config, setConfig] = useState(() => {
    return {
      year: searchParams.get('year') || DateTime.now().year.toString(),
      caption: searchParams.get('caption') || 'Bubba Dadda',
      wallpaper: searchParams.get('wallpaper'),
      dimensions: searchParams.has('dimensions') ? JSON.parse(searchParams.get('dimensions')) : [210, 297],
      weekStartsOnSunday: searchParams.has('weekStartsOnSunday') ? JSON.parse(searchParams.get('weekStartsOnSunday')) : false,
    };
  });

  useEffect(() => {
    setSearchParams(config);
  }, [config]);

  return (
    <div className="App">
      <header className="App-header">
        <TopBar
          config={config}
          onChangeConfig={setConfig}
        />
      </header>
      <main className='App-printarea'>
        <Calendar config={config} />
      </main>
    </div>
  );
}

export default App;
