import React from 'react';
import '../css/timeline.css';
import { listUserPostsTimeline } from '../utils/listdata';
import { useParams } from 'react-router-dom';
import { CognitoUserType, TimeLineProps } from '../Shared/Types';

const moment = require('moment');

export const Timeline: React.FC<TimeLineProps> = ({
  user,
  allPosts,
  setPosts,
  token,
  setToken,
}) => {
  const { id } = useParams();

  const userId = id || (user as CognitoUserType).username;

  //passing this var in too many places !fix
  let limitNum = 1;

  const clickHandler = async (date: string) => {
    if (allPosts.length <= limitNum) return;
    const data = await listUserPostsTimeline(userId, token, date);

    data.data && setPosts(data.data.postByUser.items);
    const tokenID = data.data && data.data.postByUser.nextToken;
    setToken(tokenID);

    window.scrollTo(0, 0);
  };

  return (
    <div id="timeline">
      <ul>
        <h4>Timeline</h4>
        {allPosts.map(post => (
          <div key={post.date} data-testid="timeline-date">
            <li onClick={() => clickHandler(post.date)} id={post.date}>
              {moment(post.date).format('MMMM YYYY')}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
