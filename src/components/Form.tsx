import React, { useState } from 'react'

export default function Form() {
    // 答えの文字列　フォームに入力した文字列とかを判断するよう
    const [answer,setAnswer] = useState('');

    //エラーかどうか？
    const [error, setError] = useState(null);

    //どう言う状態か？状態が３つあるので文字列へ
    const [status, setStatus] = useState('typing');

    if(status === 'success'){
        return <h1>正しい</h1>
    }
    
    //https://www.youtube.com/watch?v=kbKIENQKuxQ　わかりやすいかも
    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        setStatus('submitting')

        //例外処理やと思えばいいかな
        try{
            //submitFormが完了するまでは待つよ
            await submitForm(answer);
            setStatus('success')
        //rejectされたらcatchに行くんかな？
        } catch (error) {
            setStatus('typing')
            setError(error);
        }
    }
    function handleTextareaChange(e: { target: { value: React.SetStateAction<string>; }; }) {
        setAnswer(e.target.value);
    }

  return (
    <>
    <h2>市のクイズ</h2>
    <p>
        浅草寺があるのはどこ？
    </p>
    <form onSubmit={handleSubmit}>
        <textarea
            value={answer}
            onChange={handleTextareaChange}
            disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
            answer.length == 0 ||
            status === 'submitting'
        }
        >
            Submit
        </button>
        {error !== null && 
            <p className='Error'>
                {error.message}
            </p>
        }

    </form>
    </>
  )
}

function submitForm(answer: string) {
    return new Promise<void>((resolve,reject) => {
        setTimeout(() => {
            let shoudError = answer.toLowerCase() !== 'tokyo'
            if(shoudError) {
                reject(new Error('Good guess but a wrong'));
            }else {
                //完了したよ！って報告するasync に
                resolve();
            }

        }, 1500);
    })
}
