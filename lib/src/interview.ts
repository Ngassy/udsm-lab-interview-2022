export function getProcessedData(
  yearOneData: any,
  yearTwoData: any,
  yearThreeData: any
) {
  // TODO:
  // 1. Remove data items that has reporting rate less than 50
  // 2. Combine relevant data (data of the same code) from each year inorder to compute average
  // 3. Compute average for the combined data to arrive to single value (average value)
  // 4. Return the averaged data as final output
  /***
   * [
      {
        value: 43,
        name: 'Number of members registered',
        code: 'MEMBER_REGISTERED',
      },
      {
        value: 17,
        name: 'Number of active members',
        code: 'ACTIVE_MEMBERS',
      },
    ]
   */
   
   
    // Combining and Removing data items with reporting rate less than 50
   const finalData = yearTwoData.concat(yearOneData,yearThreeData)
   const filteredDataItems = finalData.filter((obj:any) => {
   	return obj["reportingRate"] >= 50;
   
   });
   
   //Grouping relevant data with the same code inorder to Compute average
   var groups = filteredDataItems.reduce(function(acc:any,obj:any){
	var data = obj.code;
		if(acc[data]){
			if(obj.value) {
				(acc[data].value += obj.value);
				++acc[data].Average;
			}
		}
		else{
			acc[data] = obj;
			acc[data].Average = 1;
		}
		return acc;
	}, {});
	
	
	//Computing the average for grouped and combined data to arrive for a single value
	var result = Object.keys(groups).map(function (data:any) {
    	groups[data].Average = Math.round(groups[data].value/groups[data].Average);
    	
    	const finalValue = {
    	"value": groups[data].Average,
    	"name": groups[data].name,
    	"code": groups[data].code
    	};
    	
    	return finalValue
    	
	}); 

  return result;
}
