import React from 'react';
import { observer } from 'mobx-react-lite';

import CommentModel from '@/models/CommentModel';
import Comment from '@/components/Comment';

interface ICommentListProps {
  comments: CommentModel[];
}
const CommentList = ({ comments }: ICommentListProps) => {

  return (
    <section className="history-list">
      {comments.map((comment) => {
        return <Comment key={`${comment.id}-${comment.createdAt}`} comment={comment} />;
      })}
    </section>
  );
};

export default observer<ICommentListProps>(CommentList);
