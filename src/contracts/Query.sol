pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Query {
   
    struct row {
        string date;
        string state;
        uint  gender;
        uint age_group;
    }
    uint index;
    mapping (uint => uint[]) genders;
    mapping (string => uint[]) states; 
    mapping (uint => uint[]) ages; 
    mapping (uint => row) dataset; 
    function get(uint ind) public view returns(row memory) {
        return dataset[ind];
        
    }
    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function insert( string memory date, string memory state,uint gender,uint age_group) public {
        row memory data;
        data.date=date;
        data.state=state;
        data.gender=gender;
        data.age_group=age_group;
        dataset[index]=data;
        
        states[state].push(index);
        genders[gender].push(index);
        ages[age_group].push(index);
        index+=1;
    }
    function getbystate(string memory state) public view returns(row[] memory){
        uint n = states[state].length;
        row[]  memory arr = new row[](n);
        for (uint i=0;i<n;i++){
            arr[i]=dataset[states[state][i]];
        }
        return arr;
        
    }
    function getbystateandgender(string memory state,uint gender) public view returns(row[] memory){
        row[]  memory arr = new row[](index);
        uint j=0;
        for (uint i=0;i<index;i++){
            if(dataset[i].gender==gender && compareStrings(dataset[i].state,state)){
                arr[j++]=dataset[i];
            }
        }
        return arr;      
    }
    function optimized(string memory state,uint gender) public view returns(row[] memory){
        uint n = states[state].length;
        uint m = genders[gender].length;
        if(n<m){
            row[]  memory arr = new row[](n);
            uint ind;
            uint j;
            for (uint i=0;i<n;i++){
                ind = states[state][i];
                if (dataset[ind].gender==gender){
                    arr[j++]=dataset[ind];
                }
                
            }
            return arr;
        }
        else{
            row[]  memory arr = new row[](m);
            uint ind;
            uint j;
            for (uint i=0;i<m;i++){
                ind = genders[gender][i];
                if (compareStrings( dataset[ind].state,state)){
                    arr[j++]=dataset[ind];
                }
            }
            return arr;
        }
    }
    
}