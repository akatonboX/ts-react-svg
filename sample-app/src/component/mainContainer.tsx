import React from "react";
import styles from "./mainContainer.module.scss"

export const MainContainer = (
  props: {
    headerContents: React.ReactNode,
    footerContents?: React.ReactNode,
    leftContents?: React.ReactNode,
    rightContents?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  return (
    <div className={styles.root}>
      <div>{props.headerContents}</div>{/*ヘッダ*/}
      <div>{/*メイン*/}
        <div>{props.leftContents}</div>
        <div>{props.children}</div>
        <div>{props.rightContents}</div>
      </div>
      <div>{props.footerContents}</div>{/*フッタ*/}
    </div>
    
  );
}