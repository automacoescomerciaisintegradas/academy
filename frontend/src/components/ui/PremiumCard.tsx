'use client';

import React from 'react';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface CardHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({ children, className = '', onClick }) => {
  return (
    <div className={`card${onClick ? ' cursor-pointer' : ''}${className ? ` ${className}` : ''}`} onClick={onClick}>
      {children}
    </div>
  );
};

PremiumCard.Header = ({ title, description, children, className = '' }: CardHeaderProps) => (
  <div className={`card-header${className ? ` ${className}` : ''}`}>
    {title && <h3 className="card-title">{title}</h3>}
    {description && <p className="card-description">{description}</p>}
    {children}
  </div>
);

PremiumCard.Body = ({ children, className = '' }: CardBodyProps) => (
  <div className={`card-body${className ? ` ${className}` : ''}`}>{children}</div>
);

PremiumCard.Footer = ({ children, className = '' }: CardFooterProps) => (
  <div className={`card-footer${className ? ` ${className}` : ''}`}>{children}</div>
);

export default PremiumCard;
