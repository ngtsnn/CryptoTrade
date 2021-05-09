# CryptoTrade
- Info
  + My name is Phạm Anh Tú and I'm stuying at UIT.
  + This project has inspiration from crypto trade market which is being developed in my country. However, when I learned about ERC20 token and how to trade it, I thought that I should make a gambling game.
  + Don't negatively think, just imagine this is the way to understand how d-apps work.
  + My code is not good. Hope all of you can help me for this problem.
  
- How to use:
  + You can see the reference video to see how I make this one but I still write a manual for convience.
  + Step 1: Install enviroment
    * Make sure you have NodeJS(https://nodejs.org/en/), MetaMask(Browser Extension) and git(https://git-scm.com/downloads).
    * Then install truffle framework via this link: https://www.npmjs.com/package/truffle
    * Finally, download and install ganache in this link: https://www.trufflesuite.com/ganache
  + Step 2: Install all dependency and testing
    * Clone this repo by using this command:
      
      $ git clone https://github.com/ngtsnn/CryptoTrade.git

    * Open Ganache and chosing whatever option you like.
    * Install dependencies for my cloned project by this command (there are many warning but still ok):
      
      $ npm install

    * Choose whichever account address in ganache you like and this is your bookie, replace in ./migrations/2_my_contract.js line 10 for default address I made.
    * Re-compile all smart contract:

      $ truffle migrate --reset

    * If you saw 5 last test is error => you do all right things.
  + Step 3: Setup for app:
    * I really advise you to see the reference video to know more.
    * Connect Metamask to your Ganache server also accounts (by using private key).
    * Open file ./src/App.js and find the default address account bookie and replace as you do before.
    * This is react project so you can use react script to open this project.
    * After connecting you can explore my gambling game. You may need to translate to your tounge language.
  + Step 4: 
    * Edit my code and make your own.
- Liscence: only non-commerce purpose
- References:
  + https://www.youtube.com/watch?v=99pYGpTWcXM
  + https://reactjs.org/
  + https://web3js.readthedocs.io/en/v1.3.4/
  + https://www.trufflesuite.com/docs
