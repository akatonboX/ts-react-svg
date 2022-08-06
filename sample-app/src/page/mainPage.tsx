import lodash from "lodash";
import React from "react";
import { Drawing } from "../component/drawing";
import { MainContainer } from "../component/mainContainer";
import styles from "./mainPage.module.scss"

interface State{
  document?: Document;
}
export const MainPage = (
  props: {

  }
) => {
  const [state, setState] = React.useState<State>(
    {}
  );
  return  (
    <MainContainer headerContents={
      <div className={styles.header}>
        <div>
          <input type="file" onChange={e => {
            if(e.currentTarget.files == null)return;

            const file = e.currentTarget.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              if(e.target == null)return;
              
              const parser = new DOMParser();
              const dom = parser.parseFromString(e.target.result as string, 'text/xml');

              const newState = lodash.clone(state);
              newState.document = dom;
              setState(newState);
            }
            reader.readAsText(file);
          }} />
        </div>
      </div>
    }>
      <Drawing document={state.document} />
    </MainContainer>
  );
}