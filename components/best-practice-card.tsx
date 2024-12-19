import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import type { Impact } from '@/lib/types';
import { BestPractice } from '@/lib/best-practice.service';
import { cn } from '@/lib/utils';

const getImpactColor = (impact: Impact) => {
  switch (impact) {
    case "dom":
      return "bg-blue-500";
    case "requests":
      return "bg-purple-500";
    case "size":
      return "bg-orange-500";
    default:
      return "bg-gray-500";
  }
};

const getImpactLabel = (impact: Impact) => {
  switch (impact) {
    case "dom":
      return "DOM";
    case "requests":
      return "Requêtes";
    case "size":
      return "Taille";
    default:
      return impact;
  }
};

const getBackGroundColorCard = (isValid: boolean) => {
    if (isValid) {
        return "bg-green-50"
    }
    return "bg-red-50"
}

const BestPracticeCard: React.FC<{practice : BestPractice}> = ({ practice }) => {
  const isValid = practice.checkIfValid();
  const messages = practice.displayMessages();

  return (
    <Card className={cn('w-full', getBackGroundColorCard(isValid))}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              {isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              {practice.title}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Ref: {practice.refCode}
            </p>
          </div>
          <div className="flex gap-2">
            {practice.impact.map((imp) => (
              <Badge 
                key={imp} 
                variant="default"
                className={`${getImpactColor(imp)} text-white`}
              >
                {getImpactLabel(imp)}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-sm mt-2">{practice.getAcceptanceMessage()}</p>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li key={index} className="text-sm">
                • {message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">Rien à afficher</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BestPracticeCard;