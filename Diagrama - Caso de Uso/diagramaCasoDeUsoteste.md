```mermaid

graph LR
    %% Estilização para parecer Caso de Uso
    classDef ator fill:#f9f,stroke:#333,stroke-width:2px;
    classDef caso fill:#fff,stroke:#333,stroke-width:1px,rx:20,ry:20;

    %% Atores
    Cliente((Cliente)):::ator
    Restaurante((Restaurante)):::ator
    Entregador((Entregador)):::ator
    Pagamento[Sistema de Pagamento]:::ator

    subgraph "Aplicativo de Delivery"
        UC1(Fazer Pedido):::caso
        UC2(Realizar Pagamento):::caso
        UC3(Aplicar Cupom):::caso
        UC4(Gerenciar Cardápio):::caso
        UC5(Aceitar Pedido):::caso
        UC6(Acompanhar Entrega):::caso
        UC7(Confirmar Entrega):::caso
    end

    %% Conexões
    Cliente --- UC1
    Cliente --- UC6
    
    UC1 -.->|include| UC2
    UC3 -.->|extend| UC1
    UC2 --- Pagamento

    Restaurante --- UC4
    Restaurante --- UC5

    Entregador --- UC7
    UC6 --- Entregador
