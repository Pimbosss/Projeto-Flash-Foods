'use client'; // ⚠️ OBRIGATÓRIO: Lida com localStorage, states e cliques de navegação!
import '@/components/Header.css'
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // 🟢 TRADUÇÃO 1: O novo navegador oficial do Next!
import { useCarrinho } from "@/context/CarrinhoContext";
import Link from "next/link"; // 🟢 TRADUÇÃO 2: Links nativos ultrarrápidos
import { FaRegUserCircle } from "react-icons/fa";
import { HiArrowRightEndOnRectangle, HiArrowLeftStartOnRectangle } from "react-icons/hi2"


export default function Header() {
  const router = useRouter(); // Instancia o navegador do Next
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null);
  const { quantidadeTotal } = useCarrinho();

  const carregarSessao = () => {
    const userData = localStorage.getItem("flashfoods:user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    carregarSessao();
    window.addEventListener("perfilAtualizado", carregarSessao);
    return () => {
      window.removeEventListener("perfilAtualizado", carregarSessao);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("flashfoods:user");
    setUser(null);
    window.dispatchEvent(new Event("perfilAtualizado"))
    router.push("/");
  };

  if (pathname === "/login" || pathname === "/cadastro" || pathname === "/cadastro-entregador") {
    return null;
  }

  const handleScroll = (event: React.MouseEvent, id: string) => {
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    event.preventDefault();
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    }
  };

  const voltarTopo = (event: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <header>
      <div id="cabeçalho">
        <div id="titulo">
          <h1 className="logo">
            <Link href="/" onClick={voltarTopo}>Flash Foods</Link>
          </h1>
        </div>

        <div id="links">
          {/* 🟢 O SEGREDO: Se a URL atual for exatamente a Home ("/") desenha os links. 
      Se for qualquer outra tela (/pedir-agora, /perfil), ele pula e deixa invisível! */}
          {pathname === "/" && (
            <>
              <a href="#comofunciona" onClick={(e) => {
                e.preventDefault();
                document.getElementById('comofunciona')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Como funciona
              </a>

              <a href="#para-entregadores" onClick={(e) => {
                e.preventDefault();
                document.getElementById('para-entregadores')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Para entregadores
              </a>

              <a href="#restaurantes1" onClick={(e) => {
                e.preventDefault();
                document.getElementById('restaurantes1')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Restaurantes
              </a>
            </>
          )}
        </div>

        <div id="buttons1">
          <button
            onClick={() => router.push("/carrinho")}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginRight: '15px', cursor: 'pointer' }}
          >
            🛒 Carrinho
            {quantidadeTotal > 0 && (
              <span style={{ background: "#ff6600", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontSize: "12px", fontWeight: "700" }}>
                {quantidadeTotal}
              </span>
            )}
          </button>
          <button className="btn-header-entregador" onClick={() => router.push("/area-entregador")}>Área do Entregador</button>
          <button className="btn-header-restaurante">Meu Restaurante</button>
          {user ? (
            <>
              <span className="user-greeting" style={{ color: "black", marginRight: "15px" }}>
                Olá, {
                  (user.name && user.name.trim() !== "") ? user.name.split(' ')[0] :
                    (user.nome && user.nome.trim() !== "") ? user.nome.split(' ')[0] :
                      user.email.split("@")[0]
                }
              </span>

              <FaRegUserCircle
                onClick={() => router.push("/perfil")} // 🟢 TRADUÇÃO 5: router.push() para o Perfil
                style={{ width: '35px', borderRadius: '50%', cursor: 'pointer', marginRight: '15px', verticalAlign: 'middle', height: "30px" }}
              />

              <button onClick={handleLogout} id="btn-logout" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <HiArrowLeftStartOnRectangle style={{ fontSize: "18px", verticalAlign: "middle" }} />
                Sair
              </button>
            </>
          ) : (
            <>
              {/* 🟢 TRADUÇÃO 6: Substituídos os caminhos antigos para baterem com as pastas do Next */}
              <Link href="/login">
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <HiArrowRightEndOnRectangle style={{ fontSize: "18px", verticalAlign: "middle" }} />
                  Entrar
                </button>
              </Link>
              <button className="btn-header-cadastro" onClick={() => router.push("/cadastro")}>
                Cadastro
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
