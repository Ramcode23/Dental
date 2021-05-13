
// tslint:disable-next-line:class-name
interface _PersonUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Person {
    constructor(
    
        public id: string,
        public name: string,
        public email: string,
        public notes: string,
        public gender: string,
        public country: string,
        public user: string,
        public img: string,
    ) {

    }
}
