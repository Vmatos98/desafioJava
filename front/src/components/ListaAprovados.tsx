import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Aprovado, Message } from '../types/aprovado.types';
import './ListaAprovados.css';

const ListaAprovados: React.FC = () => {
  const [aprovados, setAprovados] = useState<Aprovado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>({ type: '', text: '' });
  const [selectedAprovado, setSelectedAprovado] = useState<Aprovado | null>(null);

  useEffect(() => {
    carregarAprovados();
  }, []);

  const carregarAprovados = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Aprovado[]>('/api/aprovados');
      setAprovados(response.data);
      
      if (response.data.length === 0) {
        setMessage({
          type: 'error',
          text: 'Nenhum aprovado cadastrado ainda.'
        });
      } else {
        setMessage({ type: '', text: '' });
      }
    } catch (error: any) {
      console.error('Erro ao carregar aprovados:', error);
      setMessage({
        type: 'error',
        text: 'Erro ao carregar dados. Verifique se o backend está rodando.'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatarTelefone = (telefone: string): string => {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  };

  const formatarData = (dataString: string): string => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const abrirDetalhes = (aprovado: Aprovado) => {
    setSelectedAprovado(aprovado);
  };

  const fecharDetalhes = () => {
    setSelectedAprovado(null);
  };

  if (loading) {
    return (
      <div className="lista-container">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Carregando aprovados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <div className="lista-header">
        <h2>👥 Aprovados Cadastrados</h2>
        <p>Total de {aprovados.length} aprovado{aprovados.length !== 1 ? 's' : ''} cadastrado{aprovados.length !== 1 ? 's' : ''}</p>
        
        {/* Aviso para fins didáticos */}
        <div className="aviso-didatico">
          <div className="aviso-icon">⚠️</div>
          <div className="aviso-content">
            <strong>Aviso Importante:</strong>
            <p>Esta funcionalidade de visualização existe apenas para <strong>fins didáticos</strong> e facilitar a <strong>avaliação técnica</strong>.</p>
            <p>Em um ambiente de produção real, esta tela seria protegida por <strong>autenticação</strong> e <strong>controle de permissões</strong>, acessível apenas a administradores autorizados.</p>
          </div>
        </div>
        
        <button className="refresh-button" onClick={carregarAprovados}>
          🔄 Atualizar
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {aprovados.length > 0 && (
        <div className="aprovados-grid">
          {aprovados.map((aprovado) => (
            <div key={aprovado.id} className="aprovado-card">
              <div className="card-header">
                <h3>{aprovado.nome}</h3>
                <span className="card-id">#{aprovado.id}</span>
              </div>
              
              <div className="card-info">
                <p><strong>📧 Email:</strong> {aprovado.email}</p>
                <p><strong>📱 Telefone:</strong> {formatarTelefone(aprovado.telefone)}</p>
                <p><strong>📅 Cadastrado:</strong> {aprovado.dataCadastro ? formatarData(aprovado.dataCadastro) : 'N/A'}</p>
              </div>
              
              <div className="card-concursos">
                <strong>🏆 Concursos:</strong>
                <p className="concursos-preview">
                  {aprovado.concursosAprovados.length > 100 
                    ? `${aprovado.concursosAprovados.substring(0, 100)}...` 
                    : aprovado.concursosAprovados
                  }
                </p>
              </div>
              
              <div className="card-actions">
                <button 
                  className="details-button"
                  onClick={() => abrirDetalhes(aprovado)}
                >
                  👁️ Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedAprovado && (
        <div className="modal-overlay" onClick={fecharDetalhes}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📋 Detalhes do Aprovado</h2>
              <button className="close-button" onClick={fecharDetalhes}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-group">
                <label>Nome Completo:</label>
                <p>{selectedAprovado.nome}</p>
              </div>
              
              <div className="detail-group">
                <label>Email:</label>
                <p>{selectedAprovado.email}</p>
              </div>
              
              <div className="detail-group">
                <label>Telefone:</label>
                <p>{formatarTelefone(selectedAprovado.telefone)}</p>
              </div>
              
              <div className="detail-group">
                <label>Data de Cadastro:</label>
                <p>{selectedAprovado.dataCadastro ? formatarData(selectedAprovado.dataCadastro) : 'N/A'}</p>
              </div>
              
              <div className="detail-group">
                <label>Concursos Aprovados:</label>
                <div className="concursos-full">
                  {selectedAprovado.concursosAprovados.split('\n').map((linha, index) => (
                    <p key={index}>{linha}</p>
                  ))}
                </div>
              </div>
              
              {selectedAprovado.nomeImagem && (
                <div className="detail-group">
                  <label>Imagem:</label>
                  <p className="image-info">
                    📷 {selectedAprovado.nomeImagem}
                    <small>(Arquivo salvo no servidor)</small>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaAprovados;