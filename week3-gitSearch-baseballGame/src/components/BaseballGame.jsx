/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';

export const BaseballGame = () => {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const digits = [];
    // 중복없는 랜덤 숫자 생성
    while (digits.length < 3) {
      const num = Math.floor(Math.random() * 10).toString();
      if (!digits.includes(num)) {
        digits.push(num);
      }
    }
    setAnswer(digits.join(''));
    //console.log(digits);
    setHistory([]);
    setInput('');
  };

  const validateInput = (value) => {
    if (!/^[0-9]{3}$/.test(value)) return false;
    const digits = new Set(value);
    return digits.size === 3;
  };

  const handleSubmit = () => {
    if (!validateInput(input)) {
      setMessage('⚠️ 서로 다른 3자리를 입력해주세요.');
      return;
    }

    if (input === answer) {
      setMessage(`🎉 정답입니다! 3초 뒤 게임이 리셋됩니다.`);
      setHistory(prev => [...prev, `${input} - 🎯 정답!`]);

      setTimeout(() => {
        resetGame();
        setMessage('');
      }, 3000);
      return;
      
    }

    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 3; i++) {
      if (input[i] === answer[i]) strike++;
      else if (answer.includes(input[i])) ball++;
    }
    const result = `${strike}스트라이크 ${ball}볼`;
    setHistory(prev => [...prev, `${input} - ${strike}S ${ball}B`]);
    setMessage(result);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', margin: 'auto' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
            <input
            type="text"
            value={input}
            maxLength={3}
            onChange={(e) => setInput(e.target.value)}
            placeholder="숫자 3자리 입력"
            css={inputStyle}
            />
            <button css={buttonStyle} onClick={handleSubmit}>확인</button>
        </div>
      <p css={messageStyle}>{message}</p>
      <div css={listStyle}>
        {history.slice().reverse().map((entry, index) => (
          <div css={listElementStyle} key={index}>{entry}</div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = css`
    width: 250px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const messageStyle = css`
    width: 300px;
    text-align: center;
    font-weight: 500;
    color: #b30b0b;
`
const buttonStyle = css`
    white-space: nowrap;
    padding: 10px;
`

const listStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const listElementStyle = css`
    list-style: none;    
    padding: 0;               
    display: flex;
    flex-direction: column;
    gap: 8px;  
    background-color: #f6fdd7;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width:  300px;
    font-weight: 600;
`