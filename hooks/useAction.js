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
 
//////////////////////////////////////////////////////////////////////
// usage  
//////////////////////////////////////////////////////////////////////

import React from 'react';
import { useSelector } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import useActions from '../lib/useActions';

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }));

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);
