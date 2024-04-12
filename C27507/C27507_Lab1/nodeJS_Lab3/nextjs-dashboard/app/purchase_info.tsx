import React from 'react';

interface PurchaseInfoProps {
    purchaseNumber: string;
  }

export const PurchaseInfo: React.FC<PurchaseInfoProps> = ({ purchaseNumber }) => {

    return(
        <div>
            <h2>Informacion de compra:</h2>

            <p>Tu compra fue exitosa</p>
            <p>Número de compra: {purchaseNumber}</p>
        </div>

    );
}
