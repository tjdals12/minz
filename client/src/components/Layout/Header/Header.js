import React from "react";
import classNames from "classnames";
import styles from "./Header.scss";
import { getScrollTop } from "lib/common";
import { Thumbnail } from "components/common";
import Brand from "./Brand";
import Search from "./Search";
import PropTypes from "prop-types";

// Temp
import backgroundImg from "assets/img/header_background.jpg";
import thumbnailImg from "assets/img/header_thumbnail.png";

const cx = classNames.bind(styles);

const HeaderTitle = ({ title }) => (
  <div className={cx("header-title")}>
    <div>{title}</div>
  </div>
);

class Header extends React.Component {
  pos = 520;
  element = React.createRef();

  state = {
    fixed: false
  };

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    const scrollTop = getScrollTop();
    console.log(scrollTop, this.pos);

    const fixed = scrollTop >= this.pos;
    if (this.state.fixed !== fixed) {
      this.setState({ fixed });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    const { fixed } = this.state;
    const { background, thumbnail, title, onSearch } = this.props;

    return (
      <header
        className={cx(fixed ? "short-header" : "header")}
        style={{
          backgroundImage: `url(${background ? background : backgroundImg})`
        }}
        ref={this.element}
      >
        <div className={cx("header-content")}>
          <Thumbnail url={thumbnail} type="user" />
          <Brand />
          <HeaderTitle title={title} />
          <Search
            className={cx(fixed ? "dark" : "light")}
            onSearch={onSearch}
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  background: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string
};

Header.defaultProps = {
  background: backgroundImg,
  thumbnail: thumbnailImg,
  title: "Minz log."
};

export default Header;
