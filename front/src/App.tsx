import React, { useState } from 'react';
import FormularioAprovado from './components/FormularioAprovado';
import ListaAprovados from './components/ListaAprovados';
import './App.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🏆 Cadastro de Aprovados</h1>
          <p>Registre sua aprovação em concursos públicos</p>
          
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              📝 Cadastrar
            </button>
            <button 
              className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              👥 Ver Cadastrados
            </button>
          </div>
        </div>
      </header>
      
      <main className="App-main">
        {activeTab === 'form' ? <FormularioAprovado /> : <ListaAprovados />}
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2024 Sistema de Cadastro de Aprovados em Concursos</p>
      </footer>
    </div>
  );
};

export default App;