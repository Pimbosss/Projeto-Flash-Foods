### **Diagrama de sequencia**

-Diagrama de sequência que demonstra de uma forma simples o funcionamento da plataforma.
```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as App
    participant R as Restaurante
    participant P as Pagamento
    participant E as Entregador


    
    
    C->>A: Realiza Pedido e Efetua Pagamento
    A->>P: Processa Pagamento 
    P-->>A: Confirmação do Pagamento
    A->>R: Notifica um Novo Pedido
    R-->>A: Confirma a Preparação do Pedido
    R-->>A: Tempo de preparo
    A->>E: Informa o tempo de preparo do pedido para o entregador e distância total do trajeto
    E-->>A: Aceita Entrega do Pedido
    R->>E: Entregador recebe o Pedido
    E-->>A: App recebe status do Pedido
    A-->>C: App informa ao Cliente o tempo de entrega
    E->>C: Realiza a Entrega do pedido ao Cliente
    C-->>A: Confirma Recebimento do Pedido
    E->>A: Finaliza Entrega no App
```

##
### 1. Dispatch inteligente (sem espera no restaurante)

-Diagrama de sequência que demonstra de forma especifíca a parte do entregador na espera do pedido para continuar com a entrega.
```mermaid

    sequenceDiagram
    participant App as App/user
    participant Restaurante
    participant Entregador as App/entregador

    Restaurante->>App: Atualiza status (em preparo)
    App->>App: Calcula tempo de preparo (ETA)

    Restaurante->>App: Atualiza status (quase pronto)
    App->>App: Calcula tempo de deslocamento do entregador

    App->>Entregador: Envia corrida (timing otimizado)
    Entregador->>Restaurante: Chega próximo do horário ideal

    Restaurante->>App: Pedido pronto
    Restaurante-->>Entregador: Entrega imediata

    Entregador->>App: Confirma retirada


```

##
### 2. Cálculo correto de distância e ganho
-Diagrama de sequência que demonstra para o entregador a distância total e o ganho total com a entrega.
```mermaid

    sequenceDiagram
    participant App as App/entregador
    participant Entregador
    participant Sistema as Motor de Rotas

    Entregador->>App: Solicita corridas disponíveis

    App->>Sistema: Calcula rota completa
    Sistema-->>App: Distância total (entregador → restaurante → cliente)
    Sistema-->>App: Tempo estimado

    App->>App: Calcula valor + R$/km = 2,50 reais

    App-->>Entregador: Exibe corrida completa
    Note right of Entregador: Valor: R$16,50 <br/> Distância: 6,6 km <br/> Tempo: 18 min

    Entregador->>App: Aceita corrida (decisão informada)    


```

##
### 3. Notificações automáticas ao cliente
-Diagrama de sequência que demonstra o funcionamento das notificações de preparo, o funcionamento de rastreio da entrega e tempo para entrega para o cliente.
```mermaid

    sequenceDiagram
    participant App as App/entregador
    participant Entregador
    participant Cliente as App/user

    Entregador->>App: Confirma retirada do pedido

    App-->>Cliente: Notificação "Pedido saiu para entrega 🚴"
    App-->>Cliente: Mostra rastreamento em tempo real

    App->>App: Atualiza ETA dinamicamente

    App-->>Cliente: Notificação "Chegando em 2 minutos"

    Entregador->>Cliente: Entrega pedido
    Entregador->>App: Confirma entrega

    App-->>Cliente: Notificação "Pedido entregue"


```
