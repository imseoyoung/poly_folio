function birthCheck() {
    const date = new Date();
    const currentYear = date.getFullYear();
    let birthYear;

    let birthStr;
    let birthNum;
    birthStr = prompt("태어난 년도");
    console.log(birthStr);

    if (birthStr.length == 4) {
        if (birthStr) {
            // 값 
            if (!isNaN(birthYear)) {
                console.log("태어난 해" + birthStr);
                birthYear = parseInt(prompt("태어난 연도"));
        
                let age = currentYear - birthYear + 1; // 변수 선언과 동시에 할당
                if (age < 20) {
                    alert("성인이 아닙니다 ")
                }
                //백틱 es6 문법 
                alert(`${currentYear} 년 현재, ${age}세 입니다`)    
            } else {
                alert("올바른 값을 입력해주세요");
            }
        } else {
            //null 
            console.log("태어난 해" + birthStr);
        }
    } else {
        alert("올바른 값을 입력해주세요");
    }


    

    // // birth = prompt("태어난 년도");
    // birthYear = parseInt(prompt("태어난 연도"));

    // age = currentYear - birthYear + 1;
    // if (age < 20) {
    //     alert("성인이 아닙니다 ")
    // }
    // //백틱 es6 문법 
    // alert(`${currentYear} 년 현재, ${age}세 입니다`)

}

// birthCheck();