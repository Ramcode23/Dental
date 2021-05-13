import { Person } from './person.mode';
import { Service, Details } from './service.model';
export class Diagnostic {
    constructor(

        public id: string,
        public no: string,
        public date: Date,
        public doctor: string,
        public patien: string,
        public details: Details[],
        public user: string,

    ) {

    }
}


