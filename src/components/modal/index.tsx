import React, { useEffect, useRef, useState } from "react";
import styles from './Modal.module.scss'
import cx from 'classnames'
import Link from "next/link";
import { ShufflePage } from "../page/shuffle";
import { GenrePage } from "../page/genre";

type Props = {
  showModal: boolean;
  closeModal: () => void;
  date: Date;
}

type Data = {
  key: string;
  genre: string;
  menu: string;
}

export const Modal:React.FC<Props> = ({showModal, closeModal, date}) => {
  const [full, setFull] = useState(false)
  const [data, setData] = useState<Data[]>([])
  const ref = useRef<HTMLDivElement>(null);

  let startY: number;
  let endY: number;

  const logSwipeStart = (event: any) => {
    startY = event.touches[0].pageY;
  }

  const logSwipe = (event: any) => {
    endY = event.touches[0].pageY;
  }

  const logSwipeEnd = (event: any) => {
    if( 0 < (endY - startY) ) {
      console.log("下向き");
    } else {
      console.log("上向き");
      setFull(true)
    }
  }

  // 日付加工
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}/${month}/${day}`

  const pushOrReplace = () => (additions: Data[]) =>
    additions.reduce((acc, v) => {
      const index = acc.findIndex((d) => d.key === v.key)
      if(index === -1) return ([...acc, v]);
      return ([...acc.slice(0, index), v, ...acc.slice(index + 1)]); 
    }, data)

  const addData = (genre: string, menu: string) => {
    const newData = {key: today, genre, menu}
    const update = pushOrReplace()
    setData(update([newData]))
  }

  const selectTodayData = data.find(d => d.key === today)
  

  // const pushOrReplace = (messages: Message[]) => (additions: Message[]) =>
  // additions.reduce((acc, v) => {
  //   const index = acc.findIndex(({ messageId }) => messageId === v.messageId);
  //   if (index === -1) return [...acc, v];
  //   return [...acc.slice(0, index), v, ...acc.slice(index + 1)];
  // }, messages);

  console.log(data)

  useEffect(() => {
    ref.current?.addEventListener("touchstart", logSwipeStart, { passive: false });
    ref.current?.addEventListener("touchmove", logSwipe, { passive: false });
    ref.current?.addEventListener("touchend", logSwipeEnd, { passive: false });
    return (() => {
      ref.current?.removeEventListener("touchstart", logSwipeEnd);
      ref.current?.removeEventListener("touchmove", logSwipe);
      ref.current?.removeEventListener("touchend", logSwipeEnd);
    });
  });

  return (
    <div className={cx(styles.overlay, showModal ? styles['is-active']: '')}>
      <div className={cx(styles.modal, showModal ? styles['is-active']: '', full ? styles['full'] : '')}>
        {selectTodayData && (
          <>
            <div>{selectTodayData.genre}</div>
            <span>今日のメニュー：</span><span>{selectTodayData.menu}</span>
          </>
        )}
        {/* <GenrePage /> */}
        <ShufflePage addData={addData} />
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};