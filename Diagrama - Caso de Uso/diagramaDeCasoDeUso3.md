```mermaid
graph LR
    Entregador((Entregador))

    subgraph App_Entregador [Interface do Colaborador]
        E1((Notificação do pedido))
        E2((Aceitar Pedido))
        E3((Recusar pedido))
        E4((Pegar o pedido))
        E5((Entregar o pedido))
    end

    Restaurante((Restaurante))

    Entregador --- E1
    Entregador --- E2
    Entregador --- E3
    Entregador --- E4
    Entregador --- E5

    E4 --- Restaurante

