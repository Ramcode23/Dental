
export class Service {
    constructor(

        public id: string,
        public desc: string,
        public user: string,

    ) {

    }


}

export class Details {
    constructor(

        public id: string,
        public idservice: string,
        public desc: string,
        public quality: number,
    ) {
    }

}
