export default interface Usuario {
    id?: string;
    email: string;
    cpf: string;
    name: string;
    phone: string;
    password?: string;
    confirmPassword?: string;
    restauranteId?: string;
    tipo?: "cliente" | "entregador" | "restaurante"; 
    cnh?: string;
    placaVeiculo?: string;
}
