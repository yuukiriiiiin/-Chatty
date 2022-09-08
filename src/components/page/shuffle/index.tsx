import React, { useState } from 'react'

export const ShufflePage = () => {
  const menuList = ['ナスの炒め物', 'カレー（トマト）', 'ハヤシライス', '豚の生姜焼き', 'もやし（海の精（塩）を添えて）と味噌汁']
  const maxLength = menuList.length - 1;
  const speed = 20;

  const [menu, setMenu] = useState<string[]>(['選ぶ', '選ぶ'])
  const [isStart, setIsStart] = useState<boolean[]>([false, false])
  const [randStart, setRandStart] = useState<number[]>([0, 0])

  const startShuffle = (index: number) => {
    console.log('スタート')
    setIsStart(isStart.map((s, i) => i === index ? true : s))

    let key = 0;

    const randShuffle = () => {
      if (key > maxLength) key = 0;
      setMenu(menu.map((m, i) => i === index ? menuList[key] : m));
      key++;
    }

    setRandStart(randStart.map((r, i) => i === index ? window.setInterval(randShuffle, speed) : r));
  }

  const stopShuffle = (index: number) => {
    console.log('ストップ')
    setIsStart(isStart.map((s, i) => i === index ? false : s))

    const random = Math.floor(Math.random() * (maxLength + 1));
    setMenu(menu.map((m, i) => i === index ? menuList[random] : m))

    window.clearInterval(randStart[index]);
  }

  return (
    <div>
      {menu.map((m, i) => (
        <div key={i}>
          <p>{m}</p>
          <button type="button" onClick={isStart[i] ? () => stopShuffle(i) : () => startShuffle(i)}>{isStart[i] ? 'ストップ' : 'スタート'}</button>
        </div>
      ))}
    </div>
  )
}