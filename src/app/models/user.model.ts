import { environment } from '../../environments/environment';
const base_url = environment.base_url;
export class Usuario {
    constructor(
        public displayName: string|'',
        public email: string,
        public password?: string,
        public photoURL?: string,
        public uid?: string,
    ) { }


    get imagenUrl() {

        if (!this.photoURL) {
            return `${base_url}/upload/usuarios/no-image`;
        } else if (this.photoURL.includes('https')) {
            return this.photoURL;
        } else if (this.photoURL) {
            return `${base_url}/upload/usuarios/${this.photoURL}`;
        } else {
            return '../assets/img/no-img.jpg';
        }

    }
}