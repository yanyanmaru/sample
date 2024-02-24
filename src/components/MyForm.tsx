import React, { useState } from 'react'

export default function MyForm() {
  const [answer ,setAnswer] = useState('');

  const [error, setError] = useState(null);
  
  const [status, setStatus] = useState('typing');

  if(status === 'success') {
    return <h1>正しい</h1>
  }

  async function handleSubmit(e: { preventDefault: () => void; }){
    e.preventDefault();
    setStatus('submitting');

    try {
      await submitForm(answer);
      setStatus('success')
    } catch (err) {
      setStatus('typing')
      setError(err)
    }
  }
  
  function handleTextChange(e: { target: { value: React.SetStateAction<string>; }; }) {
    setAnswer(e.target.value);
  }


  return (
    <div>
        <h1>クイズ私</h1>
        <p>私の好きな食べ物はなんでしょう？</p>
        <form onSubmit={handleSubmit}>
          <textarea 
            className='bg-gray-400'
            value={answer}
            onChange={handleTextChange}
          />
          <br />
          <button disabled={
            answer.length == 0 ||
            status === 'submitting'
          }>
            提出する
          </button>
          {error !== null && 
          <p>{error.message}</p>
          }
        </form>
    </div>
  )
}

function submitForm(answer: string) {
  return new Promise<void>((resolve,reject) => {
    setTimeout(() => {
      let shoudError =  answer !== 'りんご'
      if(shoudError) {
        reject(new Error('間違いだねえ'));
      }  else {
        resolve();
      }
    },1500);
  })
}