let data = '';
[
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
  [0, async (promptInput) => {
    const year = await promptInput;
    setYear(year);
    return `> ${year}\n`;
  }],
  [1000, '> Enter a caption:\n'],
  [0, async (promptInput) => {
    const caption = await promptInput;
    setCaption(caption);
    return `> ${caption}\n`;
  }],
  ...('............').split('').map((char) => [1000, char]),
  [0, '\n'],
  [1000, '> Done!'],
  [1000, '# '],
].reduce(async (promise, [delay, message]) => {
    await promise;
    return new Promise((resolve) => {
       setTimeout(async () => {
           data += typeof message === 'function' ? '> prompt for input\n' : message;
           document.body.innerHTML = `<pre>${data}</pre>`;
           resolve();
       }, delay);
    })
}, Promise.resolve());