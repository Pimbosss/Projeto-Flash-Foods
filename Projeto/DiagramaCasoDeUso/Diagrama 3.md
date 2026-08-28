```mermaid
graph LR
    Restaurante((Restaurante))

    subgraph Painel_Restaurante [Gestão do Estabelecimento]
        R1((Receber Pedido))
        R2((Preparar Itens))
        R3((Chamar Entregador))
        R4((Confirmar Coleta))
    end

    Restaurante --- R1
    Restaurante --- R2
    Restaurante --- R3
    Restaurante --- R4
