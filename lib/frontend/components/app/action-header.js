"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _actionButton = _interopRequireDefault(require("./action-button"));

var _styledButton = _interopRequireDefault(require("../ui/styled-button"));

var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers"));

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderWrapper = _styledComponents.default.section.attrs({
  className: 'level'
}).withConfig({
  displayName: "action-header__HeaderWrapper",
  componentId: "odgflh-0"
})(["&&&{margin-bottom:", ";}"], ({
  theme
}) => theme.sizes.padding);

const Tag = _styledComponents.default.span.attrs({
  className: 'tag'
}).withConfig({
  displayName: "action-header__Tag",
  componentId: "odgflh-1"
})(["&&&{background:", ";color:#fff;margin-left:", ";}"], ({
  theme
}) => theme.colors.primary, ({
  theme
}) => theme.sizes.padding);

const BackBtn = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "action-header__BackBtn",
  componentId: "odgflh-2"
})(["&&&{border-radius:50%;width:", ";height:", ";color:", ";font-size:", ";padding:", ";background-color:", ";text-align:center;margin-right:", ";&:hover{background-color:", ";color:#fff;}}"], ({
  theme
}) => theme.sizes.paddingLayout, ({
  theme
}) => theme.sizes.paddingLayout, ({
  theme
}) => theme.colors.lightText, ({
  theme
}) => theme.fonts.base, ({
  theme
}) => theme.sizes.paddingMin, ({
  theme
}) => theme.colors.superLightBack, ({
  theme
}) => theme.sizes.padding, ({
  theme
}) => theme.colors.lightText);

const HeaderTitle = _styledComponents.default.h1.attrs({
  className: 'level-left'
}).withConfig({
  displayName: "action-header__HeaderTitle",
  componentId: "odgflh-3"
})(["&&&{font-size:", ";font-weight:normal;}"], ({
  theme
}) => theme.fonts.header);

const HeaderButtons = _styledComponents.default.div.attrs({
  className: 'level-right'
}).withConfig({
  displayName: "action-header__HeaderButtons",
  componentId: "odgflh-4"
})(["&&& a{margin-left:", ";}"], ({
  theme
}) => theme.sizes.padding);
/**
 * Header of an action
 *
 * @private
 * @component
 * var recordAction = {
 *     actionType: 'record',
 *     icon: 'fas fa-edit',
 *     isVisible: true,
 *     label: 'Action',
 *     name: 'action'
 * };
 *
 */


const ActionHeader = props => {
  const h = new _viewHelpers.default();
  const {
    resource,
    toggleFilter,
    actionPerformed,
    recordId,
    action,
    tag
  } = props;
  const resourceId = resource.id;
  let actions = recordId ? resource.recordActions : resource.resourceActions; // list action is not accessible via the ActionHeader buttons

  actions = actions.filter(ra => ![action.name, 'list'].includes(ra.name));
  const title = action ? action.label : resource.name;
  const isList = action && action.name === 'list';
  return _react.default.createElement(HeaderWrapper, null, _react.default.createElement(HeaderTitle, null, !isList && _react.default.createElement(BackBtn, {
    to: h.resourceActionUrl({
      resourceId,
      actionName: 'list'
    })
  }, _react.default.createElement("i", {
    className: "icomoon-pagination-left"
  })), title, tag ? _react.default.createElement(Tag, null, tag) : ''), _react.default.createElement(HeaderButtons, null, actions.map(headerAction => _react.default.createElement(_actionButton.default, {
    action: headerAction,
    key: headerAction.name,
    actionPerformed: actionPerformed,
    className: "is-primary",
    resourceId: resource.id,
    recordId: recordId
  })), toggleFilter && _react.default.createElement(_styledButton.default, {
    onClick: toggleFilter,
    as: "a"
  }, _react.default.createElement("span", {
    className: "icon"
  }, _react.default.createElement("i", {
    className: "fas fa-sliders-h"
  })), _react.default.createElement("span", {
    className: "btn-text"
  }, "Filter"))));
};

ActionHeader.propTypes = {
  resource: _types.resourceType.isRequired,
  toggleFilter: _propTypes.default.func,
  actionPerformed: _propTypes.default.func,
  recordId: _propTypes.default.string,
  action: _types.actionType,
  tag: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
ActionHeader.defaultProps = {
  toggleFilter: null,
  actionPerformed: null,
  recordId: null,
  action: null,
  tag: null
};
var _default = ActionHeader;
exports.default = _default;