import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 300px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("")

  useEffect(() => {
    if(tarefas.length > 0) // não entra quando estiver vazio""
    {
      const listaTarefas = JSON.stringify(tarefas) //transforma em string
      localStorage.setItem("tarefas", listaTarefas) //cria ou substitui o item
    } 
  },[tarefas]);

  useEffect(() => {
    const tarefasJson = localStorage.getItem("tarefas");
    if(tarefasJson)
    {
      const tarefasArray = JSON.parse(tarefasJson)//transforma de string para array
      setTarefa(tarefasArray)
    }
  },[]);


  const onChangeInput = (event) => {
    setInputValue(event.target.value)
  }

  const criaTarefa = () => {
    let id = Date.now()
    let texto = inputValue
    let isComplete = false
    let tarefa = 
    {
      id: id,
      texto: texto,
      isComplete: isComplete
    }

    setTarefa([...tarefas, tarefa])
    setInputValue("")
    console.log(tarefas)
  }

  const selectTarefa = (id) => {
    let novaListaTarefas = tarefas.map(tarefa => {
      if(tarefa.id ===id)
      {
        const novaTarefa = {
          ...tarefa,
          isComplete: !tarefa.isComplete
        }
        return novaTarefa
      }
    else
    {
      return tarefa
    }
    })
    console.log(novaListaTarefas)
    setTarefa(novaListaTarefas)
  }

  const onChangeFilter = (event) => {
    setFiltro(event.target.value)
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return tarefa.isComplete === false
      case 'completas':
        return tarefa.isComplete === true
      default:
        return true
    }
  });


  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={onChangeInput} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              key = {tarefa.id} //importante para resolver warnings
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto} - {tarefa.isComplete? "completa":"pendente"}
            </Tarefa>
          )
        })}
      </TarefaList>
    </div>
  )
}


export default App
