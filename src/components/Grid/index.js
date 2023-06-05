import React from "react";
import GridItem from "../GridItem";
import * as C from "./styles";

import {db}  from "../../firebase";
import {collection, onSnapshot, query, doc, deleteDoc } from 'firebase/firestore';

const Grid = ({ itens, setItens, setEditItem }) => {
  const onDelete = (ID) => {

    var r= window.confirm("Deseja realmente excluir esse registro?");
      if (r==true)
        {
          const currDoc = doc(db, "movimentacoes_financeiras", ID)

          deleteDoc(currDoc).then((e) => {
            const q = query(collection(db, 'movimentacoes_financeiras'));
            onSnapshot(q,(querySnapshot) => {
              let finances = []
              finances = querySnapshot.docs.map((doc, id, index) => ({
                financeId: doc.id,
                finance: doc.data()
              }))
            
              let formattedFinances = [];
        
              finances.map(f => {
              formattedFinances.push(
                {
                  id: f.financeId,
                  desc: f.finance.descricao,
                  amount: f.finance.valor,
                  expense: f.finance.despesa,
                  } 
              )})
        
            setItens(formattedFinances);
            });
          })
      
        }
      else
        {
        
        }
  };

  const onUpdate = ( itemcurr ) =>{
    const newArray = itens.filter((transaction) => transaction.id !== itemcurr.id);
    setItens(newArray)
    setEditItem(itemcurr)
  }

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th width={40}>Descrição</C.Th>
          <C.Th width={40}>Valor</C.Th>
          <C.Th width={10} alignCenter>
            Tipo
          </C.Th>
          <C.Th width={10}></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens?.map((item, index) => (
          <GridItem key={index} item={item} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;
