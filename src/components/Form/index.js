import React, { useState, useEffect } from "react";
import Grid from "../Grid";
import * as C from "./styles";

import {db}  from "../../firebase";
import {collection, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';

const Form = ({ handleAdd, transactionsList, setTransactionsList }) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [awaitEditable, setAwaitEditable] = useState(false);
  const [itemEdit, setItemEdit] = useState({});

  const handleSave = () => {
     if (!desc || !amount) {
      alert("Informe a descrição e o valor!");
      return;
    } else if (amount < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }


    const transaction = {
      desc: desc,
      amount: amount,
      expense: isExpense,
    };

    handleAdd(transaction);

    setItemEdit({});
    setDesc("");
    setAmount("");
  };

  const awaitEdit = () => {
    const currDoc = doc(db, "movimentacoes_financeiras", itemEdit.id)
    updateDoc(currDoc, {
      descricao: desc.length <= 0 ? itemEdit.desc : desc,
      valor: amount.length <= 0 ? itemEdit.amount : amount,
      despesa: isExpense,
    }).then((e) => {
      setAwaitEditable(false)
      setItemEdit({})
      setDesc("");
      setAmount("");
    }).finally(()=>{
      setAwaitEditable(false)
      setItemEdit({})
      setDesc("");
      setAmount("");
    })
      
    setTransactionsList(transactionsList)
  }


  useEffect(() => {
  if(itemEdit?.id && !awaitEditable){
      setAwaitEditable(true);
      setItemEdit(itemEdit)
    }
  }, [itemEdit])

  return (
    <>
      <C.Container>
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input
          onChange={(e) => setDesc(e.target.value)} 
          defaultValue={itemEdit && desc.length <= 0  ? itemEdit.desc : ''}/>
        </C.InputContent>
        <C.InputContent>
          <C.Label>Valor</C.Label>
          <C.Input
            defaultValue={itemEdit && amount.length <= 0 ? itemEdit.amount : ''}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </C.InputContent>
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            defaultChecked
            name="group1"
            onChange={() => setExpense(!isExpense)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            name="group1"
            onChange={() => setExpense(!isExpense)}
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>
        <C.Button onClick={itemEdit && awaitEditable ? () => awaitEdit(itemEdit) : () => handleSave()}>{itemEdit && awaitEditable ? 'EDITAR' : 'ADICIONAR'}</C.Button>
      </C.Container>
      <Grid itens={transactionsList} setItens={setTransactionsList} setEditItem={setItemEdit} />
    </>
  );
};

export default Form;
