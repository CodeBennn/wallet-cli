import { useImmer } from '@hooks/useImmer';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { countAtom } from '@states/index';
import MetaMaskCard from '@components/connectorCards/MetaMaskCard';
const mangaAtom = atomWithImmer({ 'Dragon Ball': 1984, 'One Piece': 1997, Naruto: 1999 });
// import { atomSignal } from 'jotai-signal';

const App = () => {
  const [YiDeng, setYiDeng] = useImmer({ statusCode: 1, result: [1] });
  const [count, setCount] = useAtom(mangaAtom);
  const [data, setData] = useAtom(countAtom);

  //计算了。。。。
  console.log('测试');

  useEffect(() => {
    // setYiDeng(draft => {
    //   draft.result[0] = 1;
    // });

    setCount(draft => {
      draft['Dragon Ball'] = 1984;
    });
    // setCount({ 'Dragon Ball': 1984, 'One Piece': 1997, Naruto: 1999 });
  }, [setCount, setYiDeng]);
  return (
    <>
      <MetaMaskCard />
      <input
        type="button"
        value="测试"
        onClick={() => {
          setData(Number((Math.random() * 10).toFixed(2)));
        }}
      />
      <h1>Hello Web3 React {YiDeng.statusCode}</h1>
      <h2>{count['Dragon Ball']}</h2>
      <h3>{Math.random()}</h3>
      {/* <h4>{atomSignal(countAtom)}</h4> */}
    </>
  );
};
App.whyDidYouRender = true;
export default App;
