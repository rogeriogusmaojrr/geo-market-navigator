
import React from 'react';

interface SimpleListProps {
  items: Array<{
    id: string | number;
    content: React.ReactNode;
  }>;
  title?: string;
  className?: string;
}

export const SimpleList = ({ items, title, className = "" }: SimpleListProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="p-4 text-center bg-gray-50 rounded-md">
        <p className="text-gray-500">Nenhum item disponível</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
        {items.map((item) => (
          <li key={item.id} className="p-4 bg-white hover:bg-gray-50 transition-colors">
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleList;
