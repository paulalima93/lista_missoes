import { useState } from 'react';
import { Shield, Plus, CheckCircle, Circle, Trash2 } from 'lucide-react';
import './App.css';

export default function App() {
  // PARTE 1: Crie seus Estados (useState) aqui embaixo!
  // Você vai precisar de:
  // - missoes (array vazio para começar)
  const [missoes, setMissoes] = useState([]);
  // - novaMissao (texto)
  const [novaMissao, setNovaMissao] = useState("");
  // - novoRank (texto padrão "D")
  const [novoRank, setNovoRank] = useState("D");
  // - filtro (texto padrão "todas")
  const [filtro, setNovoFiltro] = useState("todas");


  // PARTE 2: Crie as Funções do seu "Banco de Dados" aqui!
  // - adicionarMissao(e) { ... }
  // - alternarStatus(id) { ... }
  // - deletarMissao(id) { ... }

  const adicionarMissao = (e) => {
    e.preventDefault();
    if (novaMissao.trim() === "") return;

    const missaoCriada = {
      id: Date.now(),
      texto: novaMissao,
      rank: novoRank,
      concluida: false
    };

    setMissoes(prev => [...prev, missaoCriada])

    setNovaMissao("");
    setNovoRank("D");
  }

  const alternarStatus = (id) => {
    console.log("aaaaa")
    setMissoes(prev => prev.map((missao) => {
      if (missao.id === id) {
        return { ...missao, concluida: !missao.concluida }
      }
      return missao
    }))
  }

  const deletarMissao = (id) => {
    setMissoes(prev => prev.filter(missao => missao.id !== id));
  }

  const missoesFiltradas = missoes.filter((missao) => {
    if (filtro === "pendentes") return !missao.concluida;
    if (filtro === "concluidas") return missao.concluida;
    return true;
  });

  return (
    <div className="guilda-container">
      <div className="quadro-missoes">

        <div className="cabecalho-quadro">
          <h1 className="titulo-guilda">
            <Shield size={36} /> Quadro de Missões
          </h1>
          <p style={{ color: '#94a3b8', margin: '5px 0 0 0' }}>Associação de Caçadores</p>
        </div>

        {/* ---------------- FORMULÁRIO ---------------- */}
        {/* DICA: Coloque o onSubmit={} aqui na tag <form> */}
        <form className="form-adicionar" onSubmit={adicionarMissao}>

          {/* DICA: Coloque o value={} e o onChange={} aqui */}
          <input
            type="text"
            placeholder="Descreva a nova missão..."
            className="input-missao"
            value={novaMissao}
            onChange={(e) => setNovaMissao(e.target.value)}
          />

          {/* DICA: Coloque o value={} e o onChange={} aqui também */}
          <select
            className="select-rank"
            title="Rank da Missão"
            value={novoRank}
            onChange={(e) => setNovoRank(e.target.value)}
          >
            <option value="S">Rank S</option>
            <option value="A">Rank A</option>
            <option value="B">Rank B</option>
            <option value="C">Rank C</option>
            <option value="D">Rank D</option>
          </select>

          <button type="submit" className="btn-adicionar">
            <Plus size={24} />
          </button>
        </form>

        {/* ---------------- FILTROS ---------------- */}
        <div className="filtros">
          {/* DICA: Precisamos de um onClick em cada botão para mudar o state de 'filtro'. 
              DICA 2: A classe "ativo" deve ser dinâmica dependendo do filtro atual! */}
          <button
            className={`btn-filtro ${filtro === 'todas' ? 'ativo' : ''}`}
            onClick={() => setNovoFiltro("todas")}
          >
            Todas
          </button>
          <button
            className={`btn-filtro ${filtro === 'pendentes' ? 'ativo' : ''}`}
            onClick={() => setNovoFiltro("pendentes")}
          >
            Pendentes
          </button>
          <button
            className={`btn-filtro ${filtro === 'concluidas' ? 'ativo' : ''}`}
            onClick={() => setNovoFiltro("concluidas")}
          >
            Concluídas
          </button>
        </div>

        {/* ---------------- LISTA DE MISSÕES ---------------- */}
        <div className="lista-missoes">

          {/* PARTE 3: O .map() vai entrar AQUI e abraçar a div "missao-item"! */}
          {missoesFiltradas.map((missao) => (
            <div key={missao.id} className={`missao-item ${missao.concluida ? 'status-concluida' : ''}`}>
              <div className="missao-esquerda">

                {/* DICA: onClick para alternarStatus(id) entra no botão abaixo */}
                <button className="btn-check" onClick={() => alternarStatus(missao.id)}>
                  {/* DICA: Faça um if (operador ternário) aqui para mostrar CheckCircle ou Circle */}
                  <Circle size={28} />
                </button>

                {/* DICA: Coloque o texto da missão entre as tags span e adicione a classe 'texto-riscado' se concluída */}
                <span className={`texto-missao ${missao.concluida ? 'texto-riscado' : ''}`}>
                  {missao.texto}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                {/* DICA: A classe da cor (ex: rank-s) e a letra (ex: S) entram aqui */}
                <span className={`tag-rank rank-${missao.rank.toLowerCase()}`}>
                  {missao.rank}
                </span>

                {/* DICA: onClick para deletarMissao(id) entra no botão abaixo */}
                <button className="btn-deletar" title="Abandonar Missão" onClick={() => deletarMissao(missao.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {/* FIM DO .map() */}

        </div>
      </div>
    </div>
  );
}