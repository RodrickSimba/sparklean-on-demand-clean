
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate(-1)} 
      variant="ghost" 
      className={`text-teal-600 hover:text-teal-700 p-2 ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
};

export default BackButton;
