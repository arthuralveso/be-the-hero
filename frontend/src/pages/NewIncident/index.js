import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


// import { Container } from './styles';

export default function NewIncident() {
  const[title, setTile] = useState('');
  const[description, setDescription] = useState('');
  const[value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    }
    try {
      await api.post('incidents', data, {
        headers: {
          authorization : ongId,
        }
      })

      history.push('/profile');
    } catch(err) {
      alert('erro ao cadastrar o caso, tente novamente')
    }

  }

  return (
    <div className="new-incident">
    <div className="content">
      <section>
        <img src={logoImg} alt="Be the Hero"/>
        <h1>Cadastrar novo caso</h1>
        <p>Descreva o caso detalhadamento para encontrar um herói para resolver isso</p>
        <Link to="/profile " className="back-link">
        <FiArrowLeft size={16} color="#e02041" />
        Voltar para home
      </Link>

      </section>
      <form onSubmit={handleNewIncident}>
        <input 
          value={title}
          onChange={e => setTile(e.target.value)}
          placeholder="Titulo do caso" />
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descrição" />
        <input 
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Valor em reais" type="number" />
        <button className="button">Cadastrar</button>

      </form>
    </div>
  </div>
  );
}
