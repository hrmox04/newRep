const bcrypt = require('bcrypt')

// const pass = 'test1234'
// bcrypt.hash(pass,8,(error,hashedPassword)=>{
//     if(error)
//         console.log("error!!")
//     else{
//         console.log(hashedPassword)
//         pass2 = "test1234"
//         bcrypt.compare(pass2,hashedPassword,(error,response)=>{
//             console.log(response)
//         })
//     }
// })

async function doStuff(){
    const pass = 'test1234' 
    const hashedPassword = await bcrypt.hash(pass,8)
    const pass2 = "test1234"
    const isMatch = await bcrypt.compare(pass2,hashedPassword)
    console.log(isMatch)
}

doStuff()