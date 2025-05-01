
import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import SimpleList from '@/components/SimpleList';

const ExampleList = () => {
  // Dados de exemplo para a lista
  const exampleItems = [
    { id: 1, content: "Item 1 - Exemplo de conteúdo para a lista" },
    { id: 2, content: "Item 2 - Você pode personalizar cada item" },
    { id: 3, content: "Item 3 - Adicione qualquer conteúdo React aqui" },
    { id: 4, content: (
      <div className="flex justify-between items-center">
        <span>Item com layout personalizado</span>
        <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">
          Ação
        </button>
      </div>
    )},
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Exemplo de Lista</h1>
        
        <SimpleList 
          title="Lista Básica" 
          items={exampleItems} 
        />
      </div>
    </DashboardLayout>
  );
};

export default ExampleList;
