import {useState} from 'react'

export default function ColorChange() {
  const [click,setClick] = useState(false);
  let background = "bg-sky-400";
  
  function handleClick() {
    setClick(!click)
  }

  if(click){
    background += ' bg-gray-900'
  }
  return (
    <div className={background} onClick={handleClick}>
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
