import axios from 'axios';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { setList } from '../../reducer/listReducer';
import { setCard } from '../../reducer/cardReducer';
import { CardListProps } from './index';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import * as actions from '../../reducer/actions';
import Board from './Board';

const DragDropContextComponent = () => {
  const dispatch = useDispatch();
  const { boards, currentBoard, board = boards[currentBoard] } = useSelector((state: RootState) => state.app);
  const handleOnDragEnd = (result: DropResult) => result.destination && dispatch(actions.onDragEnd(result));

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Board id={board.id} title={null} columns={board.columns} />
      </DragDropContext>
      {/* <div style={{ display: 'flex' }}>
        {lists?.map((list) => (
          <div key={list.cards_list_no} style={{ width: 300, height: 500, border: '1px solid gray', margin: 10 }}>
            <h2>{list.title}</h2>
            {cards
              ?.filter((card) => card.card_list_no === list.cards_list_no)
              .map((card) => (
                <div key={card.card_no} style={{ width: 230, height: 100, border: '1px solid red', margin: 5 }}>
                  {card.contents}
                </div>
              ))}
          </div>
        ))}
      </div> */}
    </>
  );
};

export default DragDropContextComponent;
