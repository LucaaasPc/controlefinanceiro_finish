import React, { useEffect, useState } from "react";
import GlobalStyle from "../styles/global";
import Header from "../components/Header";
import Resume from "../components/Resume";
import Form from "../components/Form";

import {db}  from "../firebase";
import {collection, onSnapshot, query,  addDoc, } from 'firebase/firestore';


function Home(){
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);


  useEffect(()=>{
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

    setTransactionsList(formattedFinances);

    });
  },[])

  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income ?? 0) < Number(expense ?? 0) ? "-" : ""}R$ ${total ?? 0}`);
  }, [transactionsList]);

  const handleAdd = (transaction) => {

    const q = collection(db, "movimentacoes_financeiras");

    let newDoc = {
      descricao: transaction.desc,
      valor: transaction.amount,
      despesa: transaction.expense,
    }

    addDoc(q, newDoc).then((res) => {
      
      const returnDoc = {
        ...newDoc,
        id: res.id,
      }

      const newArrayTransactions = [...transactionsList, returnDoc];
    
    setTransactionsList(newArrayTransactions);
    })
  };

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form
        handleAdd={handleAdd}
        transactionsList={transactionsList}
        setTransactionsList={setTransactionsList}
      />
      <GlobalStyle />
    </>
  );
}

export default Home;
 
