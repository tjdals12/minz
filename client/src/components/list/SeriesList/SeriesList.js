import React from 'react';
import styles from './SeriesList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Thumbnail from 'components/common/Thumbnail';
import Content from 'components/common/Content';
import Tag from 'components/common/Tag';

const cx = classNames.bind(styles);

const SeriesItem = ({ seq, thumbnail, name, description, writer, keyword, post, finishGb }) => {

    const keywordList = keyword.map(
        keyword => (<Tag key={keyword} to={`/series/${seq}`}>{keyword}</Tag>)
    )

    return(
        <div className={cx('series-item')}>
            <div className={cx('series-thumb')}>
                <Thumbnail url={thumbnail} type="series" />
            </div>
            <div className={cx('series-desc')}>
                <Link to={`/series/${seq}`}>
                    <Content
                        title={name}
                        description={description}
                        type="series" />
                </Link>

                <div className={cx('tags')}>
                    {keywordList}
                </div>

                <div className={cx('author-count')}>
                    <p className={cx('author-name')}>writer. {writer}</p>
                    <p className={cx('series-count')}>
                        <span>글 {post}</span>
                        <span>{finishGb === "01" ? "연재 중" : finishGb === "02" ? "완결" : "개정"}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

const SeriesList = ({seriesList}) => {
    const series = seriesList.map(
        series => {
            const { _id, seq, thumbnail, name, description, keyword, writer, post, finishGb } = series.toJS();

            return(
                <SeriesItem
                    key={_id}
                    id={_id}
                    seq={seq}
                    thumbnail={thumbnail}
                    name={name}
                    description={description}
                    writer={writer}
                    keyword={keyword}
                    post={post.length}
                    finishGb={finishGb} />
            )
        }
    )

    return(
        <div className={cx('series-list')}>
            {series}
        </div>
    )
}

export default SeriesList;