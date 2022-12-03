const piggyBank = (name, balance = 0 ) =>
{ 
    const accountOwner = name;
    let accountBalance = balance;
    
    return (...args) =>
    {
        if(args.length === 0)
        {
          console.log(`${accountOwner} get ${accountBalance}`);
          return accountBalance;
        }
        else
        {
          accountBalance = accountBalance + args[0];
          console.log(`${accountOwner} set ${accountBalance}`)
        }
    }
}

let piggy = piggyBank("Jan",40);
let piggy2 = piggyBank("Tomek", 80)
let howMuch = piggy();
let howMuch2 = piggy2();

piggy(20);
piggy2(50);

howMuch = piggy();
howMuch2 = piggy2();