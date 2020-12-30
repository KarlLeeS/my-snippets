import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  // 함수의 재사용성. 그러니까 값을 캐싱하여서 이전과 같은 값이라면 계산이 많은 
  // 연산을 생략하고 이전 값을 리턴해줌 
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        // bindActionCreator는 action 과 dispatch를 바인딩 해줘서 함수의 형태로 리턴해준다.
        return actions.map(a => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [dispatch, ...deps] : deps
  );
}
