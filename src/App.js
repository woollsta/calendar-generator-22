import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Calendar from './components/Calendar';
import { useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { DateTime } from 'luxon';
import Console from './components/Console';

const consoleSteps = function* consoleSteps() {
  const prompts = [
    [0, 'BOOTING FROM DL0\n'],
    [1000, '@boot\n'],
    [2000, 'New boot, known devices are'],
    ...('hp tp rk rl rp tm vt lpt1').split(' ').map((char) => [100, ` ${char}`]),
    [0, '\n'],
    [1500, 'login: '],
    [300, 't'],
    [300, 'i'],
    [300, 'm\n'],
    [300, 'Password:'],
    [1000, '\n\n'],
    [1000, '# '],
    [1000, ''],
    ...('./calendargen').split('').map((char) => [75, char]),
    [0, '\n'],
    [1000, '> Enter a year:\n'],
    [0, async (promptInput, setConfig) => {
      setConfig((config) => ({ ...config, year: promptInput }));
      return `> ${promptInput}\n`;
    }],
    [1000, '> Enter a caption:\n'],
    [0, async (promptInput, setConfig) => {
      setConfig((config) => ({ ...config, caption: promptInput }));
      return `> ${promptInput}\n`;
    }],
    ...('> ............').split('').map((char) => [1000, char]),
    [0, '\n'],
    [1000, '> Done!\n'],
    [1000, '# '],
  ];
  for (let i of prompts) {
    yield i;
  }
}

function App() {
  const isFirstLoad = useRef(true);
  const [stepIter, setStepIter] = useState();
  const [consoleText, setConsoleText] = useState('');
  const [inputCallback, setInputCallback] = useState();
  const inputCallbackRef = useRef();
  const currentBoot = useRef(0);

  const [config, setConfig] = useState(() => {
    return {
      year: null,
      caption: null,
    };
  });

  const stepThrough = useCallback(async (iter) => {
    const thisBoot = currentBoot.current;
    let complete = false;
    while (!complete && !inputCallbackRef.current) {
      const { value, done } = iter.next();
      complete = done;
      if (!value) {
        // something is wrong
        continue;
      }
      const [delay, messageOrInputCallback] = value;
      await new Promise((resolve) => {
        setTimeout(async () => {
          if (thisBoot !== currentBoot.current) {
            return;
          }
          if (typeof messageOrInputCallback === 'function') {
            setInputCallback(() => messageOrInputCallback);
            inputCallbackRef.current = messageOrInputCallback;
          } else {
            setConsoleText((currText) => currText += messageOrInputCallback);
          }
          resolve();
        }, delay);
      });
      if (thisBoot !== currentBoot.current) {
        break;
      }
    }
    if (complete) {
      setInputCallback(null);
      inputCallbackRef.current = null;
    }
  }, []);

  const reboot = useCallback(() => {
    currentBoot.current += 1;
    const newStepIter = consoleSteps();
    setStepIter(() => newStepIter);
    setConsoleText('');
    setInputCallback(null);
    inputCallbackRef.current = null;
    stepThrough(newStepIter);
  }, [stepThrough]);

  const proceedAfterInput = useCallback(async (inputValue) => {
    if (inputCallbackRef.current) {
      const consoleMessage = await inputCallbackRef.current(inputValue, setConfig);
      setConsoleText((currText) => currText += consoleMessage);
      setInputCallback(null);
      inputCallbackRef.current = null;
    }
    // hand back control
    stepThrough(stepIter);
  }, [stepThrough, stepIter]);

  // useEffect(() => {
  //   // Only trigger initial console on first load
  //   if (isFirstLoad.current) {
  //     isFirstLoad.current = false;
  //     reboot();
  //   }
  // }, [reboot]);

  const isValidConfig = config.year && config.caption;

  return (
    <div className="App">
      <div className="App__console">
        <Console
          config={config}
          consoleText={consoleText}
          onSubmit={proceedAfterInput}
          waitingForInput={!!inputCallback}
          onReboot={reboot}
        />
      </div>
      {isValidConfig && (
        <div className='App__printout'>
          <Calendar config={config} />
        </div>
       )}
    </div>
  );
}

export default App;
