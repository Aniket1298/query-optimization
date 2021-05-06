import logo from './logo.svg';
import './App.css';
import Query from './build/contracts/Query.json'
import web3obj from './Query'
import React, { Component } from 'react'
import { get } from 'http';
var fs = require("fs");

const data=[
  {
    state:"uttarakhand",date:"01-11-2020",city:"dehradun",gender:1,age_group:1
  },
  {
  state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
  },
  {
  state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
  },
  {
  state:"uttarakhand",date:"06-11-2020",city:"delhradun",gender:0,age_group:2
  },
  {
    state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
  },
  {
    state:"Utttar Pradesh",date:"01-21-2020",city:"Noida",gender:0,age_group:2
  },
  {
  state:"utttar pradesh",date:"02-06-2020",city:"noida",gender:0,age_group:2
  },
  {
    state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
  },
  {
    state:"Tamil nadu",date:"01-02-2020",city:"Chennai",gender:1,age_group:1
  },
  {
    state:"utttar Pradesh",date:"11-11-2020",city:"noida",gender:0,age_group:2
  },
  {
    state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
  },
  {
    state:"Utttar Pradesh",date:"01-05-2020",city:"noida",gender:1,age_group:1
  },
  {
    state:"utttar pradesh",date:"01-01-2020",city:"noida",gender:0,age_group:2
  },
  {
    state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
  },
  {
    state:"delhi",date:"01-11-2020",city:"delhi",gender:0,age_group:2
  },
  {
    state:"Utttar Pradesh",date:"01-21-2020",city:"noida",gender:0,age_group:2
  },
    {
      state:"delhi",date:"12-11-2020",city:"delhi",gender:0,age_group:2
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },

    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },{
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
    },
    {
      state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
    },
    {
      state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
    },
    {
      state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },{
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },

    {
      state:"delhi",date:"12-11-2020",city:"delhi",gender:0,age_group:2
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"uttarakhand",date:"01-03-2020",city:"dehradun",gender:1,age_group:1
    },
    {
      state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
    },
    {
      state:"delhi",date:"01-21-2020",city:"delhi",gender:0,age_group:1
    },
]
export default  class App extends Component {
  constructor(props){
    super(props)
    this.state={account:null,data:[],records:"",optimized:"",unoptimized:""}
  }
  async componentDidMount() {
    const obj = new web3obj()
    await obj.loadWeb3()
    await obj.loadBlockchainData()
    this.setState({account:obj.account})  
    var received  =  await obj.contract.methods.getbystateandgender("delhi",0).call()
    console.log(received[0])
    this.setState({data:received})
    for (var i=0;i<data.length;i++){
        setTimeout(function () {
        }, 1000);
        this.setState({records:this.state.records+i+","})
        await obj.contract.methods.insert(data[i].date,data[i].state,data[i].gender,data[i].age_group).send({from:obj.account})
      //setInterval(async function(){ await obj.contract.methods.insert(data[i].date,data[i].state,data[i].gender,data[i].age_group).send({from:obj.account}); }, 3000);
      var v1 = performance.now();
      received  =  await obj.contract.methods.getbystateandgender("delhi",0).call()
      var t1 = Math.round(performance.now()-v1)
      this.setState({unoptimized:this.state.unoptimized+t1+","})
  
      v1 = await performance.now();
      received  =  await obj.contract.methods.optimized("delhi",0).call()
      var t2 = Math.round(performance.now()-v1)
      this.setState({optimized:this.state.optimized+t2+","})
      console.log("Optimized Time",performance.now()-v1)
      console.log("Records",this.state.records)
      console.log("Unoptimized",this.state.unoptimized)
      console.log("Optimized",this.state.optimized)
    }
    /*var v1 = performance.now();
    received  =  await obj.contract.methods.getbystateandgender("delhi",0).call()
    console.log("Unoptimized Time",performance.now()-v1)

     v1 = performance.now();
    received  =  await obj.contract.methods.optimized("delhi",0).call()
    console.log("Optimized Time",performance.now()-v1)
    
    this.setState({data:received})*/
    
  }

  render(){
    var count = this.state.records
    var optimized = this.state.optimized
    var unoptimized = this.state.unoptimized
    return (<div>
      <h1>{this.state.data.length}</h1>
      <p>
        {this.state.records}
      </p>
      <p>
        {this.state.optimized}
      </p>
      <p>
        {this.state.unoptimized}
      </p>      
    </div>)
  }
}

