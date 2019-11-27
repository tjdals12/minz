import React from 'react';
import classNames from 'classnames/bind';
import styles from './Tags.scss';
import { getScrollTop } from 'lib/common';
import { Tag } from 'components/common';

const cx = classNames.bind(styles);

class Tags extends React.Component {
    pos = 0;
    element = React.createRef();

    state = {
        fixed: false
    }

    componentDidMount() {
        this.pos = this.element.current.getBoundingClientRect().top + getScrollTop();
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        const scrollTop = getScrollTop();
        const fixed = scrollTop >= this.pos;
        if(this.state.fixed !== fixed) {
            this.setState({ fixed });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        const { fixed } = this.state;
        const { tags } = this.props;

        return (
            <div className={cx(`tags ${fixed ? 'fixed' : 'default'}`)} ref={this.element}>
                {tags.map((tag, index) => (<Tag key={index} to={`/search?keyword=${tag}`}>{tag}</Tag>))}
            </div>
        )
    }
}

export default Tags;