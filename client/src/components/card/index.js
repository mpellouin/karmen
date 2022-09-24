import './index.css';

const Card = ({ id, name, image }) => (
  <div className='pokeCard' id={id}>
    <div className='pokemonInfos'>
        <h2 className='pokemonName'>{name}</h2>
        <p>#{id}</p>
    </div>
    <img src={image} alt={name} />
  </div>
);

export default Card;