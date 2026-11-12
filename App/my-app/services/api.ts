const API_URL = 'http://10.147.0.184:3000';

export async function BuscarUsuario() {
  const resposta = await fetch(`${API_URL}/user`);
  const dados = await resposta.json();
  return dados;
}

export async function CadastrarUsuario(novoUsuario: any) {
  const resposta = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novoUsuario),
  });

  if (!resposta.ok) {
    throw new Error('Erro ao cadastrar usuário na API');
  }

  return await resposta.json();
}
