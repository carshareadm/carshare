# What we are using to build this app

#### developer required installs
- visual studio code [download](https://code.visualstudio.com/download) or [Sublime Text Editor](https://www.sublimetext.com/)
- node and npm [download](https://nodejs.org/en/download/)
- git [download](https://git-scm.com/downloads)
- a tool to resolve git merge conflicts - [kDiff3](http://kdiff3.sourceforge.net/) is free and more than adequate... 
  - [setup git defaults for mergetool for windows](https://stackoverflow.com/questions/33308482/git-how-configure-kdiff3-as-merge-tool-and-diff-tool#answer-40817348)
  - [setup git defaults for mergetool for mac](https://github.com/sharat/technicaltips/blob/master/how-to-setup-kdiff-with-git-os-x.md) -> use the Manual Setup
- mongodb for local dev [download](https://www.mongodb.com/download-center#community)

### **visual studio code required extensions**
#### you can install these from the extensions browser on the left of the vs code IDE
- React Food Truck - technically this not an extension itself, it just installs a bunch of useful extensions
- Node.js Extension Pack 0.1.9
- Jest 2.6.4

#### optional npm package installs 
- mern-cli [npm page](https://www.npmjs.com/package/mern-cli) - can generate a base MERN stack project, plus can also generate React components, node server routes etc

#### other interesting npm packages that you dont really need for this project, but may be helpful for others
- create-react-app [npm page](https://www.npmjs.com/package/create-react-app) - bootstrap just a React app
- travis-cli [npm page](https://www.npmjs.com/package/travis-cli) - only needed for generating encrypted heroku deployment key in .travis.yml - this step requires the heroku-cli as well
- heroku-cli [npm page](https://www.npmjs.com/package/heroku-cli) - only needed for initially setting up a heroku app