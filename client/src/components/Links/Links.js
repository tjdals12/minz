import React from 'react';
import classNames from 'classnames/bind';
import styles from './Links.scss';
import { Link } from 'react-router-dom';
import { FaEllipsisH } from 'react-icons/fa';
import { getScrollTop } from 'lib/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

class Links extends React.Component {
    top = 0;
    element = React.createRef();

    state = {
        fixed: false
    }

    componentDidMount() {
        this.top = this.element.current.getBoundingClientRect().top + getScrollTop();
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        const scrollTop = getScrollTop();
        const fixed = scrollTop >= this.top;

        if(this.state.fixed !== fixed) {
            this.setState({ fixed })
        }
    }

    render() { 
        const { fixed } = this.state;
        const { links } = this.props;

        return (
            <div className={cx(`links-wrapper ${fixed ? 'fixed' : 'default'}`)} ref={this.element}>
                <span className={cx('title')}>추천 링크</span>

                <Link to="/links">
                    <FaEllipsisH className={cx('more-links')} onClick={() => console.log('More')}/>
                </Link>
                
                <ul className="links">
                    {links.map(({ title, to }, index) => (
                        <li key={`link-${index}`} className="link" onClick={() => window.open(to)}>
                            - {title}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

Links.propTypes = {
    links: PropTypes.array
};

Links.defaultProps = {
    links: []
};

export default Links;