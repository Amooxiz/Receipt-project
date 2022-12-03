const students = [ { imię: "Piotr", nazwisko: "Nowak", punkty: 63 },
{ imię: "Tomasz", nazwisko: "Kowalski", punkty: 88 },
{ imię: "Julia", nazwisko: "Bagińska", punkty: 75 },
{ imię: "Jan", nazwisko: "Kot", punkty: 62 } ];


const printPoints = (arr) =>
{
    let count = 3;
    for(let i = 0; i < count; i++)
    {
        if (i > 0 && arr[i - 1].punkty == arr[i].punkty)
            count++;
        
        console.log(arr[i]);
    }
}

const returnGrade = (points) =>
{
    switch(true)
    {
    case (points < 50):
      return 2;
    case (points < 60):
      return 3;
    case (points < 70):
      return 3.5;
    case (points < 80):
        return 4;
    case(points < 90):
        return 4.5;
    case (points <= 100):
        return 5;
    }
}

const sum = students.reduce((sum, curr) => 
{
    return sum + curr.punkty
}, 0);

console.log(sum);

const avg = sum / students.length;
console.log(avg);

students.map(student =>
{
    if(student.punkty > avg)
    {
        console.log(student.imię + " " + student.nazwisko);
    }
});

students.sort((a, b) => 
{ 
    return b.punkty - a.punkty;
});

printPoints(students);

const studentsWithGrades = students.map(student =>
{
    const grade = returnGrade(student.punkty); 
    return {...student, ocena: grade};   
});

console.log(studentsWithGrades);

studentsWithGrades.sort((a, b)=>
{
    return (' ' + a.imię.localeCompare(b.imię));
});


console.log(studentsWithGrades);


const countGrades = studentsWithGrades.reduce((acc,it) =>
{
    acc[it.ocena] = acc[it.ocena] + 1 || 1;
    return acc;
}, {});

console.log(countGrades);
