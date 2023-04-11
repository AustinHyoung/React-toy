import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CardProps } from '../../redux/types';
import EditCard from './EditCard';
import * as S from '../../styles/styles';

interface Props {
  cards: CardProps;
  onDelete: (cardNo: number) => void;
  onSave: (newCard: CardProps) => void;
}

const Card = ({ cards, onDelete, onSave }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const strCardNo = String(cards.card_no);

  const handleOnDelete = () => onDelete(cards.card_no);

  const handleOpenEdit = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);

  const handleCloseEdit = () => setAnchorEl(null);

  const handleOnSave = (newCard: CardProps) => {
    setAnchorEl(null);
    onSave(newCard);
  };
  return (
    <>
      <Draggable draggableId={strCardNo} index={cards.card_order}>
        {(provided, snapshot) => {
          return (
            <S.DraggableCard
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
              }}
            >
              <div style={{ boxSizing: 'border-box', display: 'flex', padding: 5 }}>
                <div style={{ flex: 1, wordBreak: 'break-all', whiteSpace: 'normal' }}>{cards.contents}</div>
                <div>
                  <div style={{ display: 'flex', gap: 3 }}>
                    <button onClick={handleOpenEdit}>수정</button>
                    <button onClick={handleOnDelete}>삭제</button>
                  </div>
                </div>
              </div>
            </S.DraggableCard>
          );
        }}
      </Draggable>
      {/* {anchorEl && <EditCard anchorEl={anchorEl} onClose={handleCloseEdit} card={card} onSave={handleOnSave} />} */}
    </>
  );
};

export default Card;
