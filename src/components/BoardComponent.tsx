import { mdiChat, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import { useState } from 'react';
import { useQueries, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../reducer';
import * as Icons from '../styles/iconStyles';
import * as S from '../styles/styles';
import DragDropContextComponent from './dnd/DragDropContextComponent';
import LeftSide from './layout/LeftSide';
import RightSide from './layout/RightSide';

const BoardComponent = () => {
  const info = useSelector((state: RootState) => state.info.data);
  const { id } = useParams();
  console.log('info', info);

  const fetchCardsList = async () => {
    const { data } = await axios.get(`http://localhost:8080/apis/cardlist/${id}`);
    return data;
  };

  const fetchCard = async () => {
    const { data } = await axios.get(`http://localhost:8080/apis/card/${id}`);
    return data;
  };

  const queries = useQueries([
    { queryKey: 'cardsList', queryFn: fetchCardsList },
    { queryKey: 'cards', queryFn: fetchCard },
  ]);

  const [cardsList, cards] = queries.map((query) => query.data);

  const [leftSide, setLeftSide] = useState(false);
  const [rightSide, setRightSide] = useState(false);

  return (
    <>
      <S.MainDisplay>
        <S.MainDisplay style={{ backgroundColor: '#f1f2f6' }}>
          <S.BoardHeader>
            <div>
              <S.IconBtn onClick={() => setLeftSide((leftSide) => !leftSide)}>
                <Icon path={mdiMenu} size={1} />
              </S.IconBtn>
            </div>
            <div>
              <S.IconBtn onClick={() => setRightSide((rightSide) => !rightSide)}>
                <Icons.ChatIcon path={mdiChat} size={1} />
              </S.IconBtn>
            </div>
          </S.BoardHeader>
          <S.FlexBox>
            {leftSide && <LeftSide />}
            <S.DndBox>
              <DragDropContextComponent lists={cardsList} cards={cards} />
            </S.DndBox>
            {rightSide && <RightSide />}
          </S.FlexBox>
        </S.MainDisplay>
      </S.MainDisplay>
    </>
  );
};

export default BoardComponent;
