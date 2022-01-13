// https://eth-ropsten.alchemyapi.io/v2/Mus_kIqjt2de9XxsSTya4IMXTSCDYzju

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity : "0.8.0",
  networks : {
    ropsten : {
      url : 'https://eth-ropsten.alchemyapi.io/v2/Mus_kIqjt2de9XxsSTya4IMXTSCDYzju',
      accounts : ['77036bc9c1dbbfbe21b468a3b0dc2b7e8febc4870ba65ead74da0d552c7461b8'],
    }
  }
}
