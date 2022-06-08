
import { TbMinusVertical } from 'react-icons/tb';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import '../css/timeline.css'
const moment = require('moment')

export function Timeline({allPosts}) {
    return (
        <div id="timeline">
            <ul>
            <IoIosArrowUp />
            {allPosts.map((post) => (
                (post.date === null)
                ? <></>: <>
                <li key={post.date}>{moment(post.date).format('MMMM YYYY')}</li>
                </>
            ))}
            <IoIosArrowDown />
            </ul>
        </div>
    )
}