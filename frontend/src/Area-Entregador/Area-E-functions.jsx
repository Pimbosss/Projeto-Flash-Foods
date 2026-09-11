import { useEffect, useState } from "react";

export default function useAreaEFunctions() {
    const [online, setOnline] = useState(() => {
        const statusSalvo = localStorage.getItem("flashfoods:online");

        return statusSalvo === null
            ? true
            : statusSalvo === "true";
    });

    const [entregaAtual, setEntregaAtual] = useState(null);
    const [gpsVisivel, setGpsVisivel] = useState(true);
    const [ganhosHoje, setGanhosHoje] = useState(0);
    const [entregasTotais, setEntregasTotais] = useState(0);
    const [ganhosOntem, setGanhosOntem] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(0);
    const [inicioOnline, setInicioOnline] = useState(Date.now());

    const diferencaOntem = ganhosHoje - ganhosOntem;

    const entregas = [
        {
            restaurante: "Pizza Express",
            cliente: "João Silva",
            endereco: "Rua das Flores, 123",
            enderecoRestaurante: "Av. Paulista, 900",
            distancia: "2.5 km",
            tempo: "18 min",
            itens: "2 itens",
            valor: "R$ 15,50"
        },
        {
            restaurante: "Burger King",
            cliente: "Maria Santos",
            endereco: "Av. Central, 456",
            enderecoRestaurante: "Av. Central, 100",
            distancia: "1.8 km",
            tempo: "14 min",
            itens: "1 item",
            valor: "R$ 13,00"
        },
        {
            restaurante: "Sushi House",
            cliente: "Pedro Costa",
            endereco: "Rua do Comércio, 789",
            enderecoRestaurante: "Rua do Comércio, 100",
            distancia: "3.2 km",
            tempo: "22 min",
            itens: "3 itens",
            valor: "R$ 18,00"
        },
        {
            restaurante: "Café Delícia",
            cliente: "Ana Paula",
            endereco: "Rua Verde, 321",
            enderecoRestaurante: "Rua Verde, 50",
            distancia: "1.2 km",
            tempo: "10 min",
            itens: "1 item",
            valor: "R$ 12,00"
        }
    ];

    useEffect(() => {
        if (!online) return;

        const intervalo = setInterval(() => {
            setTempoTotal(Date.now() - inicioOnline);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [online, inicioOnline]);

    function resetarTudo() {
        console.log("RESETOU");
        console.log("ONLINE ANTES:", online);

        setGanhosHoje(0);
        setEntregasTotais(0);
        setGanhosOntem(0);
        setTempoTotal(0);

        console.log("RESET TERMINOU");
    }

    function alterarStatus() {
        console.log("ALTEROU STATUS!");

        if (online) {
            setOnline(false);
            localStorage.setItem("flashfoods:online", "false");
            
        } else {
            setOnline(true);
            localStorage.setItem("flashfoods:online", "true");
            setInicioOnline(Date.now() - tempoTotal);
        }
    }

    function formatarTempo(tempo) {
        const segundosTotais = Math.floor(tempo / 1000);

        const horas = Math.floor(segundosTotais / 3600);

        const minutos = Math.floor(
            (segundosTotais % 3600) / 60
        );

        const segundos = segundosTotais % 60;

        return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    function aceitarEntrega(entrega) {
        if (!online || entregaAtual) {
            return;
        }

        setEntregaAtual(entrega);
        setGpsVisivel(true);
    }

    function finalizarEntrega() {
        if (!entregaAtual) return;

        const valorEntrega = Number(
            entregaAtual.valor
                .replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
                .trim()
        );

        setGanhosHoje(prev => prev + valorEntrega);
        setEntregasTotais(prev => prev + 1);
        setEntregaAtual(null);
        setGpsVisivel(false);
    }

    return {
        online,
        entregaAtual,
        gpsVisivel,
        ganhosHoje,
        entregasTotais,
        ganhosOntem,
        diferencaOntem,
        tempoTotal,
        inicioOnline,
        entregas,

        setOnline,
        setGpsVisivel,

        alterarStatus,
        formatarTempo,
        aceitarEntrega,
        resetarTudo,
        finalizarEntrega
    };
}