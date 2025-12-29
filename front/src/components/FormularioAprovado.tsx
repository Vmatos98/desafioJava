import React, { useState, ChangeEvent, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { AprovadoFormData, FormErrors, Message, ApiResponse } from '../types/aprovado.types';
import './FormularioAprovado.css';

const FormularioAprovado: React.FC = () => {
  const [formData, setFormData] = useState<AprovadoFormData>({
    nome: '',
    email: '',
    telefone: '',
    concursosAprovados: ''
  });
  
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: '', text: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({
          type: 'error',
          text: 'Por favor, selecione apenas arquivos JPG, JPEG ou PNG.'
        });
        return;
      }
      
      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'A imagem deve ter no máximo 5MB.'
        });
        return;
      }
      
      setImagem(file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email deve ter formato válido';
    }
    
    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    
    if (!formData.concursosAprovados.trim()) {
      newErrors.concursosAprovados = 'Concursos aprovados é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({
        type: 'error',
        text: 'Por favor, corrija os erros no formulário.'
      });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('telefone', formData.telefone);
      formDataToSend.append('concursosAprovados', formData.concursosAprovados);
      
      if (imagem) {
        formDataToSend.append('imagem', imagem);
      }
      
      const response = await axios.post<ApiResponse>('/api/aprovados', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setMessage({
          type: 'success',
          text: 'Cadastro realizado com sucesso! 🎉'
        });
        
        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          concursosAprovados: ''
        });
        setImagem(null);
        setImagemPreview(null);
        setErrors({});
        
        // Limpar input de arquivo
        const fileInput = document.getElementById('imagem') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
      
    } catch (error: any) {
      console.error('Erro ao enviar dados:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erro ao cadastrar. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImagem(null);
    setImagemPreview(null);
    const fileInput = document.getElementById('imagem') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="formulario-container">
      <form className="formulario-aprovado" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>📋 Dados do Aprovado</h2>
          <p>Preencha todos os campos abaixo</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="nome">Nome Completo *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className={errors.nome ? 'error' : ''}
            placeholder="Digite seu nome completo"
          />
          {errors.nome && <span className="error-text">{errors.nome}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="seu.email@exemplo.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone *</label>
          <InputMask
            mask="(99) 99999-9999"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            className={errors.telefone ? 'error' : ''}
            placeholder="(11) 99999-9999"
          />
          {errors.telefone && <span className="error-text">{errors.telefone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="concursosAprovados">Concursos Aprovados *</label>
          <textarea
            id="concursosAprovados"
            name="concursosAprovados"
            value={formData.concursosAprovados}
            onChange={handleInputChange}
            className={errors.concursosAprovados ? 'error' : ''}
            placeholder="Liste os concursos em que foi aprovado (ex: Tribunal de Justiça - SP, Prefeitura Municipal, etc.)"
            rows={4}
          />
          {errors.concursosAprovados && <span className="error-text">{errors.concursosAprovados}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imagem">Foto (opcional)</label>
          <div className="file-input-container">
            <input
              type="file"
              id="imagem"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="imagem" className="file-input-label">
              📷 Escolher Foto
            </label>
          </div>
          <small className="file-help">Formatos aceitos: JPG, JPEG, PNG (máx. 5MB)</small>
          
          {imagemPreview && (
            <div className="image-preview">
              <img src={imagemPreview} alt="Preview" />
              <button
                type="button"
                className="remove-image"
                onClick={removeImage}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Cadastrando...
            </>
          ) : (
            <>
              ✅ Cadastrar Aprovado
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FormularioAprovado;