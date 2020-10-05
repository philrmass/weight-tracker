# Tasks
- Add import action, user select file, parse json & import, test with testData
  - <input type='file' ref={this.fileInput} onChange={this.handleFileChange}/>
  - this.fileInput.current.click();
- Add menu for import/export, open with ...
  - const file = this.fileInput.current.files[0];
  - this.loadImage(file.name, file);
- JSON parse and load file
- deploy to ghpages & start using

- add graph with touch input (use library)
- add x-scale changing and scrolling
- auto-adjust y scale?

- add react router
- add routes (/, /weekly, /monthly, /graph), trigger with click, x to close
- Create full-screen week averages display
- Create full-screen month averages display
- Create full-screen graph display

- Update time in display once per minute
- Keep skinny main layout on wide pages
