import React from "react";
import "../css/timeline.css";
import { Storage, API } from "aws-amplify";
import { postByDate } from "../graphql/queries";
import { listUserPostsTimeline } from "../utils/listdata";
import { duplicates } from "../utils/duplicates";
import { useParams } from "react-router-dom";
import { TimeLineProps } from "../Shared/Types";

const moment = require("moment");

export const Timeline: React.FC<TimeLineProps> = ({
	user,
	allPosts,
	posts,
	setPosts,
	token,
	setToken,
}) => {
	const { id } = useParams();

	// if (!id) {
	// 	user = user.username;
	// } else {
	// 	user = id;
	// }

	const userId = id || user.username;

	// let tokenID;
	//passing this var in too many places !fix
	let limitNum = 5;

	const clickHandler = async (date: string) => {
		if (allPosts.length <= limitNum) return;
		const data = await listUserPostsTimeline(userId, token, date);

		setPosts(data.data.postByUser.items);
		const tokenID = data.data.postByUser.nextToken;
		setToken(tokenID);

		window.scrollTo(0, 0);
	};

	return (
		<div id="timeline">
			<ul>
				<h4>Timeline</h4>
				{allPosts.map((post) =>
					post.date === null ? (
						<></>
					) : (
						<div key={post.date}>
							<li onClick={() => clickHandler(post.date)} id={post.date}>
								{moment(post.date).format("MMMM YYYY")}
							</li>
						</div>
					)
				)}
			</ul>
		</div>
	);
};
