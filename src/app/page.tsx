// app/cadastro-produto/page.tsx
'use client';

import { useState, ChangeEvent } from 'react';

export default function CadastroProduto() {
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: null as File | null,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagem: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValidation = () => {
    const { nome, descricao, preco, imagem } = formData;
    if (!nome || !descricao || !preco || !imagem) {
      alert('Por favor, preencha todos os campos e selecione uma imagem.');
      return false;
    }
    if (isNaN(Number(preco)) || Number(preco) <= 0) {
      alert('Por favor, insira um preço válido maior que zero.');
      return false;
    }

    handleSubmit;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;
    console.log(formData);
    // Aqui você pode enviar os dados para o backend
    alert('Produto cadastrado com sucesso! (Dados enviados para o console)');
    // Opcional: Limpar o formulário após o envio
    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      imagem: null,
    });
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          🚀 Cadastro de Produto
        </h1>
        <form onSubmit={handleValidation} className="space-y-6">

          {/* Imagem */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-all duration-300 ease-in-out cursor-pointer relative">
            <label htmlFor="imagem" className="cursor-pointer text-blue-600 font-semibold text-lg mb-3">
              {/* Oculta o texto da label se houver preview */}
              {!preview && 'Selecione uma Imagem do Produto'}
            </label>
            {preview ? (
              <img
                src={preview}
                alt="Pré-visualização do Produto"
                className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-200" // w-full h-64 para ocupar mais espaço
              />
            ) : (
              <div className="text-gray-400 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L40 32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-1 text-sm">Arraste e solte ou clique para fazer upload</p>
              </div>
            )}
            <input
              id="imagem"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
            {/* O botão de remover agora é posicionado absolutamente para ficar visível sobre a imagem */}
            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFormData((prev) => ({ ...prev, imagem: null }));
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-xs hover:bg-red-600 transition-colors duration-200 shadow-lg"
                title="Remover Imagem"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ex: Camiseta Básica"

            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição do Produto
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows={5}
              value={formData.descricao}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
              placeholder="Descreva seu produto em detalhes..."

            />
          </div>

          {/* Preço */}
          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
              Preço (R$)
            </label>
            <input
              id="preco"
              name="preco"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ex: 99.90"

            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
  );
}