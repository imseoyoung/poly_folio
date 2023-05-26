// // 객체를 선언
// const student={}; // 빈객체

// // 동적으로 프로퍼티 추가 가능
// // name, dream
// const poly=[
//     ['심민정','꿈의 개발자'],
//     ['임서영','최고연봉자'],
//     ['정수영','노벨개발자']
// ];

// let columns=['name','dream', 'hobby', 'score'];

// // poly에 있는 2차원 배열을, 객체로 변환하는 코드를 작성
// console.log(student);

// for (let item of poly){
//     let col={};
//     for (let i=0; i<columns.length; i++){
//         col[columns[i]] = item[i] || 'default';
//         // console.log(col);
//     }

//     let key=item[0];
//     student[key]=col;
// }

// console.log(student);

const test = {
    foo: function() {
        console.log("foo 메소드의 this");
        console.log(this);
    },

    bar: () => {
        console.log("bar 메소드의 this");
        console.log(this);
    }
}
test.foo();
test.bar();

const product=['우유','식빵'];
console.log(product);

const goods=product; // 얕은 복사
console.log(goods);

goods.push("고구마");
console.log(goods);

console.log(product);



const food=[...product];
console.log(food);

food.push('토마토')
console.log(food);

console.log(product);

class Book{
    constructor(title, pages, done){
        this.title=title;
        this.pages=pages;
        this.done=done;
    }
    finish(){
        let str="";
        this.done==false ? str="읽는 중" : str="완독";
        return str;
    }
}

let git=new Book("깃 교과서",500, false);
console.log(git);
console.log(git.finish());

// 클래스 선언
class Book{

    // 생성자 선언
    // 2개의 매개변수 입력받는다.
    constructor(title, price){
        // 생성자의 역할은 매개변수로 받은 값을 
        // 동적 프로퍼티로 설정한다.
        this.title=title;
        this.price=price;
    }

    // 메소드
    buy(){
        console.log(`${this.title}을 ${this.price}원에 구매`);
    }
}

// let book=new Book("자료구조",15000);
// console.log(book); // 프로퍼티만 출력
// book.buy(); // 메소드를 호출한다.

// Book 상속 받는 클래스
class Textbook extends Book{
    constructor(title,price,major){
        // 상위 클래스의 생성자를 호출
        super(title,price);

        // major 동적 프로퍼티 생성
        this.major=major;
    }

    buyTextBook(){
        console.log(`${this.major} 전공서적, ${this.title}을 ${this.price}원에 구매`);
    }
}

let bar=new Textbook("알고리즘",2000,"전공필수");
console.log(bar);