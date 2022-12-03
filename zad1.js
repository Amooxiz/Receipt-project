const combine = (operator, ...arr) =>
{
    const toReturn = [];
    console.log(arr);

    for(let i = 0; i < arr[0].length; i++)
    {
          toReturn.push(operator(arr[0][i],arr[1][i]));         
    }

    return toReturn;
}

const result = combine((a,b)=>{return {a, b}}, [4, 5, 6], [10, 20, 30]);
console.log(result);