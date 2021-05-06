
  
import Web3 from 'web3'
import Query from './build/contracts/Query.json'
export default class web3obj{
    constructor(){
        this.account=''
        this.contract=null
        this.user=null
      }
    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.account=accounts[0]
        const networkId = await web3.eth.net.getId()
        const networkData = Query.networks[networkId] 
        if(networkData) {
          const contract = new web3.eth.Contract(Query.abi, networkData.address)
          this.contract = contract
        } else {
          window.alert('Healthblock contract not deployed to detected network.')
        }
    }   
}