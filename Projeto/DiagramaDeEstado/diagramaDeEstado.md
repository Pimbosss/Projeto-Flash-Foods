### Diagrama de Estado
-Diagrama de Estado que explica o ciclo de vida da entrega, mostrando as etapas pela qual ele passa até ser entregue.




```mermaid

stateDiagram-v2
    [*] --> Pendente : Cliente finaliza pedido
    
    Pendente --> EmPreparo : Restaurante aceita
    Pendente --> Cancelado : Restaurante recusa / Cliente desiste
    
    EmPreparo --> AguardandoEntregador : Pedido embalado
    EmPreparo --> Cancelado : Falta de ingrediente
    
    AguardandoEntregador --> EmRota : Entregador coleta o pedido
    
    EmRota --> Entregue : Entregador confirma entrega
    EmRota --> Cancelado : Problema logístico (extravio)
    
    Entregue --> [*]
    Cancelado --> [*]

    state Pendente {
        [*] --> AguardandoConfirmacao
    }
    
    state EmPreparo {
        [*] --> NaCozinha
    }
