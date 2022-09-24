import './index.css';

const Card = ({ id, name, image, isSelected, setSelected }) => (
  <div className='pokeCard' id={id} onClick={() => setSelected(id)}>
    <div className='pokemonInfos'>
        <h2 className='pokemonName'>{name}</h2>
        <p>#{id}</p>
        {isSelected && <p>Selected</p>}
    </div>
    <img src={image} alt={name} />
  </div>
);

export default Card;